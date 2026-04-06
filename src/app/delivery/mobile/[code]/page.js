'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import styles from './mobile.module.css';

/* ═══════════════════════════════════════════
   BAZZAR — Mobile Game Top-Up Delivery v2
   Ultra-premium gaming-themed dark UI
   ═══════════════════════════════════════════ */

/* ─── SVG Icons ─── */
const SvgPending = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const SvgIdCard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);
const SvgProcessing = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);
const SvgDelivered = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const SvgCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const SvgCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SvgGamepad = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/>
    <rect x="2" y="6" width="20" height="12" rx="2"/>
  </svg>
);
const SvgShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const SvgClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const SvgZap = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const SvgChevron = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const SvgSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

/* ─── Status steps ─── */
const STATUS_STEPS = [
  { key: 'pending', Icon: SvgPending, label: 'Ожидание' },
  { key: 'fields_submitted', Icon: SvgIdCard, label: 'Данные' },
  { key: 'processing', Icon: SvgProcessing, label: 'Отправка' },
  { key: 'delivered', Icon: SvgDelivered, label: 'Готово' },
];
const STATUS_ORDER = ['pending', 'fields_submitted', 'processing', 'delivered'];

/* ─── FAQ ─── */
const FAQ_ITEMS = [
  { q: 'Сколько времени занимает пополнение?', a: 'Обычно валюта приходит в течение 5–30 минут. В редких случаях — до 2 часов.' },
  { q: 'Как узнать свой Player ID?', a: 'Откройте игру → Настройки (или профиль) → скопируйте ваш Player ID / User ID.' },
  { q: 'Валюта не пришла, что делать?', a: 'Проверьте правильность ID. Если пополнение не пришло за 2 часа — напишите в поддержку.' },
  { q: 'Можно ли отменить заказ?', a: 'После отправки данных отменить нельзя. Свяжитесь с поддержкой для решения вопроса.' },
];

/* ─── Timer hook ─── */
function useElapsedTime(startDate) {
  const [elapsed, setElapsed] = useState('');
  useEffect(() => {
    if (!startDate) return;
    const update = () => {
      const diff = Date.now() - new Date(startDate).getTime();
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setElapsed(m > 60 ? `${Math.floor(m/60)}ч ${m%60}мин` : `${m}:${s < 10 ? '0' : ''}${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startDate]);
  return elapsed;
}

/* ─── Confetti ─── */
function Confetti({ show }) {
  if (!show) return null;
  const colors = ['#00E5FF', '#69F0AE', '#FFD740', '#FF6E40', '#E040FB', '#40C4FF', '#B2FF59', '#7C4DFF'];
  return (
    <div className={styles.confettiContainer}>
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} className={styles.confettiPiece} style={{
          left: `${Math.random() * 100}%`,
          background: colors[i % colors.length],
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2.5 + Math.random() * 2}s`,
          width: `${5 + Math.random() * 6}px`,
          height: `${5 + Math.random() * 6}px`,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        }} />
      ))}
    </div>
  );
}

/* ─── Floating game items ─── */
const FLOAT_ITEMS = ['🎮', '🕹️', '⚡', '💎', '🏆', '🎯', '⭐', '🔥', '💰', '🎲', '🗡️', '🛡️'];
const FLOATS = Array.from({ length: 12 }).map((_, i) => ({
  id: i, emoji: FLOAT_ITEMS[i],
  left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`,
  size: 12 + Math.random() * 16, dur: 10 + Math.random() * 10, delay: Math.random() * 6,
}));

/* ─── Demo order data ─── */
function getDemoOrder() {
  return {
    id: 'demo-uuid-001', delivery_code: 'demo', order_id: 'YM-12345678',
    game_name: 'PUBG Mobile', position_name: '1800 Unknown Cash',
    amount: 2690, currency: 'RUB', player_id: null, server: null,
    required_fields: { 'Input1': 'User ID' }, status: 'pending',
    created_at: new Date(Date.now() - 120000).toISOString(),
  };
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function MobileGameDeliveryPage() {
  const params = useParams();
  const code = params.code;

  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState(null);
  const [error, setError] = useState(null);

  const [fields, setFields] = useState({});
  const [inputError, setInputError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [codeCopied, setCodeCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevStatusRef = useRef(null);

  const elapsed = useElapsedTime(delivery?.created_at);

  /* ─── Fetch delivery ─── */
  useEffect(() => {
    let isMounted = true;
    async function fetchDelivery() {
      try {
        setLoading(true);
        setError(null);
        if (code === 'demo' || code === 'test') {
          setDelivery(getDemoOrder()); setLoading(false); return;
        }
        let data = null;
        let fetchErr = null;
        try {
          const result = await supabase
            .from('mobile_game_deliveries')
            .select('*')
            .eq('delivery_code', code)
            .single();
          data = result.data;
          fetchErr = result.error;
        } catch (supabaseErr) {
          fetchErr = supabaseErr;
        }
        if (!isMounted) return;
        if (fetchErr || !data) {
          setError('Заказ не найден. Проверьте ссылку.');
        } else {
          setDelivery(data);
          if (data.player_id) { setFields({ 'Input1': data.player_id }); setSubmitted(true); }
        }
      } catch {
        if (isMounted) setError('Ошибка загрузки. Попробуйте обновить страницу.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    if (code) fetchDelivery();
    // Safety timeout — if loading takes more than 15s, show error
    const safetyTimeout = setTimeout(() => {
      if (isMounted) {
        setLoading(prev => {
          if (prev) {
            setError('Время ожидания истекло. Попробуйте обновить страницу.');
            return false;
          }
          return prev;
        });
      }
    }, 15000);
    return () => { isMounted = false; clearTimeout(safetyTimeout); };
  }, [code]);

  /* ─── Realtime ─── */
  useEffect(() => {
    if (!delivery || ['delivered','error'].includes(delivery.status) || code === 'demo') return;
    const ch = supabase.channel(`mobile-${code}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'mobile_game_deliveries', filter: `delivery_code=eq.${code}` },
        (p) => setDelivery(prev => ({ ...prev, ...p.new }))
      ).subscribe();
    return () => supabase.removeChannel(ch);
  }, [delivery, code]);

  /* ─── Poll fallback ─── */
  useEffect(() => {
    if (!delivery || ['delivered','error'].includes(delivery.status) || code === 'demo') return;
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('mobile_game_deliveries')
        .select('status, delivered_at, player_id, status_message')
        .eq('delivery_code', code).single();
      if (data && data.status !== delivery.status) setDelivery(prev => ({ ...prev, ...data }));
    }, 30000);
    return () => clearInterval(poll);
  }, [delivery, code]);

  /* ─── Confetti trigger ─── */
  useEffect(() => {
    if (delivery?.status === 'delivered' && prevStatusRef.current !== 'delivered') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
    prevStatusRef.current = delivery?.status;
  }, [delivery?.status]);

  const handleCopyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); } catch {
      const el = document.createElement('textarea');
      el.value = code; document.body.appendChild(el);
      el.select(); document.execCommand('copy'); document.body.removeChild(el);
    }
    setCodeCopied(true); setTimeout(() => setCodeCopied(false), 2500);
  }, [code]);

  const handleSubmit = async () => {
    const reqFields = delivery?.required_fields || {};
    const fieldKeys = Object.keys(reqFields);
    if (fieldKeys.length === 0) fieldKeys.push('Input1');

    for (const key of fieldKeys) {
      if (!fields[key]?.trim()) {
        setInputError(`Заполните поле: ${reqFields[key] || key}`);
        return;
      }
    }
    setInputError(null); setSubmitting(true);

    try {
      if (code === 'demo') {
        await new Promise(r => setTimeout(r, 1500));
        setDelivery(p => ({ ...p, player_id: fields['Input1'] || fields[fieldKeys[0]], status: 'fields_submitted' }));
        setSubmitted(true); setSubmitting(false); return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mzsyvbwfaszpgtixcolt.supabase.co'}/functions/v1/mobile-delivery`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delivery_code: code, fields }) }
      );

      if (res.status === 429) { setInputError('Слишком много запросов. Подождите.'); setSubmitting(false); return; }
      if (res.status >= 500) { setInputError('Ошибка сервера. Попробуйте позже.'); setSubmitting(false); return; }

      const result = await res.json();
      if (result.error && !result.status) { setInputError(result.error); setSubmitting(false); return; }

      setDelivery(p => ({ ...p, player_id: fields['Input1'] || fields[fieldKeys[0]], status: result.status || 'fields_submitted' }));
      setSubmitted(true);
    } catch (e) {
      setInputError(e?.message?.includes('Failed to fetch') ? 'Нет подключения к интернету.' : 'Ошибка. Попробуйте ещё раз.');
    }
    setSubmitting(false);
  };

  const currentStatusIndex = delivery ? STATUS_ORDER.indexOf(delivery.status) : 0;
  const progressWidth = delivery?.status === 'delivered' ? 100 : (currentStatusIndex / (STATUS_STEPS.length - 1)) * 100;
  const fieldLabels = delivery?.required_fields || { 'Input1': 'Player ID' };

  /* ═══════ RENDER ═══════ */

  if (loading) {
    return (
      <>
        <div className={styles.bgLayer}><div className={styles.bgGradient}/><div className={styles.bgPattern}/></div>
        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}/>
              <p className={styles.loadingText}>Загрузка...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className={styles.bgLayer}><div className={styles.bgGradient}/><div className={styles.bgPattern}/></div>
        <main className={styles.main}>
          <Header />
          <div className={styles.content}>
            <div className={styles.errorContainer}>
              <div className={styles.errorEmoji}>😕</div>
              <h2 className={styles.errorContainerTitle}>Заказ не найден</h2>
              <p className={styles.errorContainerText}>{error}</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!delivery) {
    return (
      <>
        <div className={styles.bgLayer}><div className={styles.bgGradient}/><div className={styles.bgPattern}/></div>
        <main className={styles.main}>
          <Header />
          <div className={styles.content}>
            <div className={styles.errorContainer}>
              <div className={styles.errorEmoji}>😕</div>
              <h2 className={styles.errorContainerTitle}>Заказ не найден</h2>
              <p className={styles.errorContainerText}>Не удалось загрузить данные заказа. Попробуйте обновить страницу.</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Confetti show={showConfetti} />
      <div className={styles.bgLayer}>
        <div className={styles.bgGradient}/>
        <div className={styles.bgPattern}/>
        <div className={styles.bgOrbs}>
          {FLOATS.map(s => (
            <div key={s.id} className={styles.floatingEmoji}
              style={{ left: s.left, top: s.top, fontSize: `${s.size}px`,
                '--dur': `${s.dur}s`, '--delay': `${s.delay}s` }}>
              {s.emoji}
            </div>
          ))}
        </div>
      </div>

      <main className={styles.main}>
        <Header />

        <div className={styles.content}>
          {/* ─── Hero Card ─── */}
          <motion.div className={styles.heroCard}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

            <div className={styles.heroGradient}>
              <div className={styles.gameIcon}>🎮</div>
              <div className={styles.heroLabel}>Пополнение</div>
              <div className={styles.gameName}>{delivery.game_name}</div>
              <div className={styles.positionName}>{delivery.position_name}</div>
            </div>

            <div className={styles.heroInfo}>
              <div className={styles.detailsRow}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Код заказа</span>
                  <button className={styles.detailValueBtn} onClick={handleCopyCode} title="Скопировать">
                    <span>{code.length > 10 ? code.slice(0, 10) + '…' : code}</span>
                    <span>{codeCopied ? <SvgCheck/> : <SvgCopy/>}</span>
                  </button>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Заказ №</span>
                  <div className={styles.detailValue}>{delivery.order_id || '—'}</div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Сумма</span>
                  <div className={`${styles.detailValue} ${styles.amountValue}`}>
                    {delivery.amount?.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
              {delivery.status !== 'delivered' && (
                <div className={styles.timerRow}>
                  <span>⏱</span><span>{elapsed || '0:00'}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── Progress ─── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}>
            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>Статус доставки</div>
              <div className={styles.progressTrackWrap}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${progressWidth}%` }} />
                </div>
                <div className={styles.steps}>
                  {STATUS_STEPS.map((step, i) => {
                    const isDone = i < currentStatusIndex || delivery.status === 'delivered';
                    const isActive = i === currentStatusIndex && delivery.status !== 'delivered';
                    return (
                      <div key={step.key} className={styles.step}>
                        <div className={`${styles.stepDot} ${isDone ? styles.done : isActive ? styles.active : styles.waiting}`}>
                          <step.Icon />
                        </div>
                        <span className={`${styles.stepLabel} ${isDone ? styles.done : isActive ? styles.active : ''}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Input Fields ─── */}
          {delivery.status === 'pending' && !submitted && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}>
              <div className={styles.inputCard}>
                <div className={styles.inputHeader}>
                  <div className={styles.inputIconCircle}><SvgGamepad /></div>
                  <div>
                    <h3 className={styles.inputTitle}>Введите данные аккаунта</h3>
                    <p className={styles.inputSubtitle}>Для пополнения {delivery.game_name}</p>
                  </div>
                </div>

                {Object.entries(fieldLabels).map(([key, label]) => (
                  <div key={key} className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>{label}</label>
                    <input
                      type="text"
                      className={`${styles.inputField} ${inputError ? styles.error : ''}`}
                      placeholder={`Введите ${label}`}
                      value={fields[key] || ''}
                      onChange={e => { setFields(p => ({ ...p, [key]: e.target.value })); setInputError(null); }}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      disabled={submitting}
                      autoComplete="off" spellCheck="false"
                    />
                  </div>
                ))}

                {inputError && <p className={styles.inputError}>⚠ {inputError}</p>}

                <div className={styles.inputHint}>
                  <SvgShield /> <span>Данные защищены и используются только для пополнения</span>
                </div>

                <button className={styles.submitBtn} onClick={handleSubmit}
                  disabled={submitting || Object.values(fields).every(v => !v?.trim())}>
                  {submitting ? (
                    <><div className={styles.loadingSpinner} style={{ width: 16, height: 16, borderWidth: 2 }}/> Отправка...</>
                  ) : (
                    <><SvgSend /> Отправить</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Submitted / Processing ─── */}
          {(delivery.status === 'fields_submitted' || delivery.status === 'processing') && (
            <motion.div className={styles.submittedBanner}
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className={styles.submittedIcon}>
                {delivery.status === 'processing' ? '🚀' : '✅'}
              </div>
              <h3 className={styles.submittedTitle}>
                {delivery.status === 'processing' ? 'Пополняем аккаунт' : 'Данные получены'}
              </h3>
              <p className={styles.submittedText}>
                {delivery.status === 'processing'
                  ? `Пополняем ${delivery.position_name} в ${delivery.game_name}. Ожидайте.`
                  : `Оператор пополнит ваш аккаунт в ближайшее время.`}
              </p>
              <div className={styles.playerTag}>
                <SvgGamepad /> ID: {delivery.player_id}
              </div>
            </motion.div>
          )}

          {/* ─── Delivered ─── */}
          {delivery.status === 'delivered' && (
            <motion.div className={styles.deliveredBanner}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}>
              <div className={styles.deliveredIcon}>🎉</div>
              <h3 className={styles.deliveredTitle}>Аккаунт пополнен!</h3>
              <p className={styles.deliveredText}>
                {delivery.position_name} — {delivery.game_name}
              </p>
            </motion.div>
          )}

          {/* ─── Error ─── */}
          {delivery.status === 'error' && (
            <motion.div className={styles.errorBanner} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ fontSize: 40 }}>⚠️</div>
              <h3 className={styles.errorTitle}>Ошибка при пополнении</h3>
              <p className={styles.errorText}>{delivery.status_message || 'Пополнение не удалось.'}</p>
              <a href="https://t.me/bazzar_support" target="_blank" rel="noopener noreferrer" className={styles.supportBtn}>
                Написать в поддержку
              </a>
            </motion.div>
          )}

          {/* ─── Trust badges ─── */}
          <div className={styles.trustRow}>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgShield/></span>Безопасно</div>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgZap/></span>Быстро</div>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgClock/></span>5–30 мин</div>
          </div>

          {/* ─── How it works ─── */}
          {delivery.status === 'pending' && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>💡 Как это работает</h3>
                {['Введите данные аккаунта в поле выше', 'Система автоматически пополнит ваш аккаунт', 'Валюта придёт в течение 5–30 минут', 'Играйте и наслаждайтесь!'].map((text, i) => (
                  <div key={i} className={styles.howStep}>
                    <div className={styles.howNumber}>{i + 1}</div>
                    <span className={styles.howText}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── FAQ ─── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>❓ Вопросы</h3>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className={styles.faqItem}>
                  <button className={styles.faqQuestion} onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}>
                    <span>{item.q}</span>
                    <SvgChevron open={openFaqIndex === i} />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <p className={styles.faqAnswer}>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ─── Footer ─── */}
          <footer className={styles.footer}>
            <div className={styles.footerDivider}/>
            <p className={styles.footerText}>
              © {new Date().getFullYear()}{' '}
              <a href="https://bazzar-market.ru" className={styles.footerLink}>BAZZAR</a>
              {' '}· Цифровые товары
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

/* ─── Header Component ─── */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="https://bazzar-market.ru" className={styles.logo}>
          <div className={styles.logoMark}>B</div>
          <span className={styles.logoText}>BAZZAR</span>
        </a>
        <a href="https://t.me/bazzar_support" target="_blank" rel="noreferrer" className={styles.headerHelp}>
          Поддержка
        </a>
      </div>
    </header>
  );
}
