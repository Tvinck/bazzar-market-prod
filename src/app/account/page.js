'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import styles from './account.module.css';

/* ═══════════════════════════════════════════════
   Account Page — User Dashboard
   ═══════════════════════════════════════════════ */
export default function AccountPage() {
  const router = useRouter();
  const { user, profile, loading, signOut, updateProfile } = useAuth();

  const [tab, setTab] = useState('profile'); // profile | orders | support
  const [orders, setOrders] = useState([]);
  const [supportChats, setSupportChats] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [saving, setSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  // Load orders from delivery tables
  const loadOrders = useCallback(async () => {
    if (!user?.email) return;
    setOrdersLoading(true);
    try {
      const tables = [
        { table: 'telegram_stars_deliveries', type: '⭐ Telegram Stars' },
        { table: 'telegram_premium_deliveries', type: '💎 Telegram Premium' },
        { table: 'steam_gift_deliveries', type: '🎮 Steam Gift' },
        { table: 'voucher_deliveries', type: '🎁 Подарочная карта' },
        { table: 'mobile_game_deliveries', type: '📱 Мобильная игра' },
      ];

      const allOrders = [];
      for (const { table, type } of tables) {
        const { data } = await supabase.from(table).select('*').order('created_at', { ascending: false }).limit(20);
        if (data) {
          allOrders.push(...data.map(o => ({ ...o, _type: type, _table: table })));
        }
      }
      allOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(allOrders);
    } catch (e) {
      console.warn('[Account] Orders load failed:', e);
    } finally {
      setOrdersLoading(false);
    }
  }, [user]);

  // Load support chats
  const loadSupportChats = useCallback(async () => {
    if (!user) return;
    try {
      const visitorId = typeof window !== 'undefined' ? localStorage.getItem('bazzar_visitor_id') : null;
      if (!visitorId) return;
      const { data } = await supabase
        .from('support_chats')
        .select('*')
        .eq('visitor_id', visitorId)
        .order('updated_at', { ascending: false });
      setSupportChats(data || []);
    } catch (e) {
      console.warn('[Account] Chats load failed:', e);
    }
  }, [user]);

  useEffect(() => {
    if (tab === 'orders') loadOrders();
    if (tab === 'support') loadSupportChats();
  }, [tab, loadOrders, loadSupportChats]);

  // Edit profile handlers
  const startEditing = () => {
    setEditName(profile?.name || '');
    setEditPhone(profile?.phone || '');
    setEditing(true);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({ name: editName, phone: editPhone });
      setEditing(false);
    } catch (e) {
      console.error('[Account] Save failed:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Format helpers
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';
  const fmtStatus = (s) => {
    const map = {
      pending: { label: 'Ожидание', color: '#FFA726' },
      delivered: { label: 'Доставлен', color: '#00E676' },
      processing: { label: 'Обработка', color: '#42A5F5' },
      failed: { label: 'Ошибка', color: '#FF5252' },
      completed: { label: 'Завершён', color: '#00E676' },
    };
    return map[s] || { label: s || '—', color: '#999' };
  };

  if (loading || !user) {
    return (
      <main className={styles.page}>
        <div className="app-bg" />
        <div className={styles.loaderWrap}><div className={styles.spinner} /></div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className="app-bg" />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>B</span>
            <span className={styles.logoName}>BAZZAR</span>
          </Link>
          <button onClick={handleSignOut} className={styles.logoutBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Выйти
          </button>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.bgGlow} />

        {/* Profile Card */}
        <motion.div className={styles.profileCard}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.profileAvatar}>
            <span>{(profile?.name || user.email)?.[0]?.toUpperCase() || '?'}</span>
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>{profile?.name || 'Пользователь'}</h2>
            <span className={styles.profileEmail}>{user.email}</span>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{profile?.bonus_balance || 0}</span>
              <span className={styles.statLabel}>💰 КупиКоины</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{profile?.orders_count || 0}</span>
              <span className={styles.statLabel}>📦 Заказов</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{profile?.total_spent ? `${Number(profile.total_spent).toLocaleString('ru-RU')} ₽` : '0 ₽'}</span>
              <span className={styles.statLabel}>💳 Потрачено</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {[
            { key: 'profile', icon: '👤', label: 'Профиль' },
            { key: 'orders', icon: '📋', label: 'Заказы' },
            { key: 'support', icon: '💬', label: 'Поддержка' },
          ].map(t => (
            <button key={t.key}
              className={`${styles.tabBtn} ${tab === t.key ? styles.tabBtnActive : ''}`}
              onClick={() => setTab(t.key)}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div className={styles.tabContent}
          key={tab}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* PROFILE TAB */}
          {tab === 'profile' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Личные данные</h3>
              {editing ? (
                <div className={styles.editForm}>
                  <div className={styles.editField}>
                    <label>Имя</label>
                    <input value={editName} onChange={e => setEditName(e.target.value)} placeholder="Ваше имя" />
                  </div>
                  <div className={styles.editField}>
                    <label>Телефон</label>
                    <input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div className={styles.editActions}>
                    <button className={styles.btnSave} onClick={saveProfile} disabled={saving}>
                      {saving ? '...' : '✓ Сохранить'}
                    </button>
                    <button className={styles.btnCancel} onClick={() => setEditing(false)}>Отмена</button>
                  </div>
                </div>
              ) : (
                <div className={styles.profileDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>📧 Email</span>
                    <span className={styles.detailValue}>{user.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>👤 Имя</span>
                    <span className={styles.detailValue}>{profile?.name || '—'}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>📱 Телефон</span>
                    <span className={styles.detailValue}>{profile?.phone || '—'}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>📅 Регистрация</span>
                    <span className={styles.detailValue}>{fmtDate(profile?.created_at)}</span>
                  </div>
                  <button className={styles.editBtn} onClick={startEditing}>
                    ✏️ Редактировать
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {tab === 'orders' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>История заказов</h3>
              {ordersLoading ? (
                <div className={styles.loaderSmall}><div className={styles.spinner} /></div>
              ) : orders.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>📦</span>
                  <p>Заказов пока нет</p>
                  <Link href="/" className={styles.btnShop}>Перейти в каталог</Link>
                </div>
              ) : (
                <div className={styles.ordersList}>
                  {orders.map((order, i) => {
                    const status = fmtStatus(order.status);
                    return (
                      <div key={order.id || i} className={styles.orderCard}>
                        <div className={styles.orderTop}>
                          <span className={styles.orderType}>{order._type}</span>
                          <span className={styles.orderDate}>{fmtDate(order.created_at)}</span>
                        </div>
                        <div className={styles.orderMiddle}>
                          <span className={styles.orderCode}>{order.delivery_code || order.code || order.id?.slice(0,8)}</span>
                          <span className={styles.orderStatus} style={{ color: status.color, borderColor: status.color + '30' }}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SUPPORT TAB */}
          {tab === 'support' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Обращения в поддержку</h3>
              {supportChats.length === 0 ? (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>💬</span>
                  <p>Обращений нет</p>
                  <p className={styles.emptyHint}>Нажмите на зелёную кнопку справа внизу, чтобы начать чат</p>
                </div>
              ) : (
                <div className={styles.chatsList}>
                  {supportChats.map(chat => (
                    <div key={chat.id} className={styles.chatCard}>
                      <div className={styles.chatTop}>
                        <span className={styles.chatSubject}>{chat.subject || 'Общий вопрос'}</span>
                        <span className={styles.chatStatus} data-status={chat.status}>
                          {chat.status === 'open' ? '🟢 Открыт' : '⚪ Закрыт'}
                        </span>
                      </div>
                      <p className={styles.chatLastMsg}>{chat.last_message || 'Нет сообщений'}</p>
                      <span className={styles.chatDate}>{fmtDate(chat.updated_at)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
