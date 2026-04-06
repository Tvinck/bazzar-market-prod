'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import styles from './stars.module.css';

/* ═══════════════════════════════════════════
   BAZZAR — Telegram Stars Delivery v2
   Ultra-premium dark UI
   ═══════════════════════════════════════════ */

/* ─── SVG Icons ─── */
const SvgPending = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SvgUserCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/>
    <polyline points="17 11 19 13 23 9"/>
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

const SvgTelegram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.504-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
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
  { key: 'username_submitted', Icon: SvgUserCheck, label: 'Юзернейм' },
  { key: 'processing', Icon: SvgProcessing, label: 'Отправка' },
  { key: 'delivered', Icon: SvgDelivered, label: 'Готово' },
];

const STATUS_ORDER = ['pending', 'username_submitted', 'processing', 'delivered'];

/* ─── FAQ ─── */
const FAQ_ITEMS = [
  {
    q: 'Сколько времени занимает доставка?',
    a: 'Обычно Stars приходят в течение 5–30 минут. В редких случаях — до 2 часов.',
  },
  {
    q: 'Где найти свой юзернейм?',
    a: 'Telegram → Настройки → ваш юзернейм после символа @. Если его нет — создайте в настройках.',
  },
  {
    q: 'Stars не приходят, что делать?',
    a: 'Проверьте @username. Если Stars не пришли за 2 часа — напишите в поддержку.',
  },
  {
    q: 'Можно ли отменить заказ?',
    a: 'После отправки юзернейма отменить нельзя. Свяжитесь с поддержкой для возврата.',
  },
];

/* ─── Validate ─── */
function validateUsername(u) {
  if (!u || !u.trim()) return 'Введите Telegram юзернейм';
  let c = u.trim().replace(/^@/, '');
  if (c.length < 3) return 'Минимум 3 символа';
  if (c.length > 32) return 'Слишком длинный';
  if (!/^[a-zA-Z0-9_]+$/.test(c)) return 'Только латиница, цифры и _';
  return null;
}

const normalize = (u) => u.trim().replace(/^@/, '');

/* ─── Demo ─── */
function getDemoOrder() {
  return {
    id: 'demo-uuid-001', delivery_code: 'demo', order_id: 'YM-12345678',
    stars_amount: 1000, amount: 1490, currency: 'RUB',
    telegram_username: null, status: 'pending',
    created_at: new Date(Date.now() - 120000).toISOString(),
  };
}

/* ─── Confetti ─── */
function Confetti({ show }) {
  if (!show) return null;
  const colors = ['#FACC15', '#6366f1', '#38bdf8', '#22c55e', '#f472b6', '#fb923c', '#FDE68A', '#a78bfa'];
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

/* ─── Timer ─── */
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

/* ─── Floating stars ─── */
const FLOAT_STARS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
  size: 8 + Math.random() * 12,
  dur: 8 + Math.random() * 8,
  delay: Math.random() * 6,
}));

/* ─── Helpers ─── */
const formatStars = (n) => n ? n.toLocaleString('ru-RU') : '0';

const getStarsWord = (n) => {
  if (!n) return 'звёзд';
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return 'звёзд';
  if (last === 1) return 'звезда';
  if (last >= 2 && last <= 4) return 'звезды';
  return 'звёзд';
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function TelegramStarsDeliveryPage() {
  const params = useParams();
  const code = params.code;

  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState(null);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState('');
  const [inputError, setInputError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [codeCopied, setCodeCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevStatusRef = useRef(null);

  const elapsed = useElapsedTime(delivery?.created_at);

  /* ─── Fetch ─── */
  useEffect(() => {
    async function fetchDelivery() {
      try {
        setLoading(true);
        if (code === 'demo' || code === 'test') {
          setDelivery(getDemoOrder());
          setLoading(false);
          return;
        }
        const { data, error: e } = await supabase
          .from('telegram_stars_deliveries')
          .select('*')
          .eq('delivery_code', code)
          .single();
        if (e || !data) setError('Заказ не найден. Проверьте ссылку.');
        else {
          setDelivery(data);
          if (data.telegram_username) { setUsername(data.telegram_username); setSubmitted(true); }
        }
      } catch { setError('Ошибка загрузки.'); }
      finally { setLoading(false); }
    }
    if (code) fetchDelivery();
  }, [code]);

  /* ─── Realtime ─── */
  useEffect(() => {
    if (!delivery || ['delivered','error'].includes(delivery.status) || code === 'demo') return;
    const ch = supabase.channel(`stars-${code}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'telegram_stars_deliveries', filter: `delivery_code=eq.${code}` },
        (p) => setDelivery(prev => ({ ...prev, ...p.new }))
      ).subscribe();
    return () => supabase.removeChannel(ch);
  }, [delivery, code]);

  /* ─── Poll ─── */
  useEffect(() => {
    if (!delivery || ['delivered','error'].includes(delivery.status) || code === 'demo') return;
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('telegram_stars_deliveries')
        .select('status, delivered_at, telegram_username, status_message')
        .eq('delivery_code', code).single();
      if (data && data.status !== delivery.status) setDelivery(prev => ({ ...prev, ...data }));
    }, 30000);
    return () => clearInterval(poll);
  }, [delivery, code]);

  /* ─── Confetti ─── */
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
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  }, [code]);

  const handleSubmit = async () => {
    const err = validateUsername(username);
    if (err) { setInputError(err); return; }
    setInputError(null); setSubmitting(true);
    try {
      const clean = normalize(username);
      if (code === 'demo') {
        await new Promise(r => setTimeout(r, 1500));
        setDelivery(p => ({ ...p, telegram_username: clean, status: 'username_submitted' }));
        setSubmitted(true); setSubmitting(false);
        return;
      }
      // Call Edge Function
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mzsyvbwfaszpgtixcolt.supabase.co'}/functions/v1/stars-delivery`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delivery_code: code, telegram_username: clean }),
        }
      );
      
      // Handle HTTP error codes
      if (res.status === 429) {
        setInputError('Слишком много запросов. Подождите 10 минут и попробуйте снова.');
        setSubmitting(false);
        return;
      }
      if (res.status === 503) {
        setInputError('Сервис временно недоступен. Попробуйте через несколько минут.');
        setSubmitting(false);
        return;
      }
      if (res.status >= 500) {
        setInputError('Ошибка сервера. Попробуйте через пару минут.');
        setSubmitting(false);
        return;
      }

      const result = await res.json();
      
      // Blocked by anti-fraud
      if (result.blocked) {
        setDelivery(p => ({ ...p, status: result.status, telegram_username: p.telegram_username || clean }));
        setSubmitted(true); setSubmitting(false);
        return;
      }
      
      // Server-side error message
      if (result.error && !result.status) {
        // User-friendly error messages
        const errorMap = {
          'Invalid Telegram username': 'Некорректный username. Используйте 5-32 символа: латиница, цифры, _',
          'Delivery not found': 'Заказ не найден. Проверьте ссылку.',
          'Failed to save username': 'Не удалось сохранить. Попробуйте ещё раз.',
        };
        const friendlyMsg = Object.entries(errorMap).find(([key]) => result.error.includes(key))?.[1] || result.error;
        setInputError(friendlyMsg);
        setSubmitting(false);
        return;
      }
      
      // Success
      setDelivery(p => ({ ...p, telegram_username: clean, status: result.status || 'username_submitted' }));
      setSubmitted(true);
    } catch (e) {
      // Network / connectivity errors
      if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError')) {
        setInputError('Нет подключения к интернету. Проверьте соединение.');
      } else {
        setInputError(e?.message || 'Произошла ошибка. Попробуйте ещё раз.');
      }
    }
    setSubmitting(false);
  };

  const currentStatusIndex = delivery ? STATUS_ORDER.indexOf(delivery.status) : 0;
  const progressWidth = delivery?.status === 'delivered' ? 100
    : (currentStatusIndex / (STATUS_STEPS.length - 1)) * 100;

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

  return (
    <>
      <Confetti show={showConfetti} />
      <div className={styles.bgLayer}>
        <div className={styles.bgGradient}/>
        <div className={styles.bgPattern}/>
        <div className={styles.bgStars}>
          {FLOAT_STARS.map((s) => (
            <div key={s.id} className={styles.floatingStar}
              style={{
                left: s.left, top: s.top,
                fontSize: `${s.size}px`,
                '--dur': `${s.dur}s`, '--delay': `${s.delay}s`,
              }}>⭐</div>
          ))}
        </div>
      </div>

      <main className={styles.main}>
        <Header />

        <div className={styles.content}>
          {/* ─── Hero ─── */}
          <motion.div className={styles.heroCard}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

            <div className={styles.heroGradient}>
              <div className={styles.starIconWrap}>
                <span className={styles.starIcon}>⭐</span>
                <div className={styles.starRing} />
              </div>
              <div className={styles.heroLabel}>Telegram Stars</div>
              <div className={styles.starsAmount}>{formatStars(delivery.stars_amount)}</div>
              <div className={styles.starsLabel}>{getStarsWord(delivery.stars_amount)}</div>
            </div>

            <div className={styles.heroInfo}>
              <div className={styles.detailsRow}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Код заказа</span>
                  <button className={styles.detailValue} onClick={handleCopyCode} title="Скопировать">
                    <span className={styles.codeText}>{code.length > 10 ? code.slice(0, 10) + '…' : code}</span>
                    <span className={styles.copyIcon}>{codeCopied ? <SvgCheck/> : <SvgCopy/>}</span>
                  </button>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Заказ №</span>
                  <div className={styles.detailValue}>
                    <span>{delivery.order_id || '—'}</span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Сумма</span>
                  <div className={`${styles.detailValue} ${styles.amountValue}`}>
                    <span>{delivery.amount?.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>

              {delivery.status !== 'delivered' && (
                <div className={styles.timerRow}>
                  <span>⏱</span>
                  <span>{elapsed || '0:00'}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── Progress ─── */}
          <motion.div className={styles.progressSection}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
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

          {/* ─── Username Input ─── */}
          {delivery.status === 'pending' && !submitted && (
            <motion.div className={styles.inputSection}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className={styles.inputCard}>
                <div className={styles.inputHeader}>
                  <div className={styles.inputIconCircle}><SvgTelegram /></div>
                  <div className={styles.inputTitleWrap}>
                    <h3 className={styles.inputTitle}>Укажите ваш Telegram</h3>
                    <p className={styles.inputSubtitle}>
                      Введите юзернейм для отправки {formatStars(delivery.stars_amount)} {getStarsWord(delivery.stars_amount)}
                    </p>
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.inputPrefix}>@</div>
                  <input
                    type="text"
                    className={`${styles.inputField} ${inputError ? styles.error : ''}`}
                    placeholder="username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setInputError(null); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    disabled={submitting}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>

                {inputError && <p className={styles.inputError}>⚠ {inputError}</p>}

                <div className={styles.inputHint}>
                  <SvgShield />
                  <span>Данные защищены и используются только для доставки</span>
                </div>

                <button className={styles.submitBtn} onClick={handleSubmit} disabled={submitting || !username.trim()}>
                  {submitting ? (
                    <><div className={styles.loadingSpinner} style={{ width: 16, height: 16, borderWidth: 2 }} /> Отправка...</>
                  ) : (
                    <><SvgSend /> Отправить</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Submitted ─── */}
          {(delivery.status === 'username_submitted' || delivery.status === 'processing') && (
            <motion.div className={styles.submittedBanner}
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className={styles.submittedIcon}>
                {delivery.status === 'processing' ? '🚀' : '✅'}
              </div>
              <h3 className={styles.submittedTitle}>
                {delivery.status === 'processing' ? 'Отправляем Stars' : 'Юзернейм получен'}
              </h3>
              <p className={styles.submittedText}>
                {delivery.status === 'processing'
                  ? `Отправляем ${formatStars(delivery.stars_amount)} ${getStarsWord(delivery.stars_amount)} на ваш аккаунт. Ожидайте уведомления.`
                  : `Оператор отправит ${formatStars(delivery.stars_amount)} ${getStarsWord(delivery.stars_amount)} на ваш аккаунт в ближайшее время.`
                }
              </p>
              <div className={styles.usernameTag}>
                <SvgTelegram /> @{delivery.telegram_username}
              </div>
            </motion.div>
          )}

          {/* ─── Delivered ─── */}
          {delivery.status === 'delivered' && (
            <motion.div className={styles.deliveredBanner}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}>
              <div className={styles.deliveredIcon}>🎉</div>
              <h3 className={styles.deliveredTitle}>Stars доставлены!</h3>
              <p className={styles.deliveredText}>
                {formatStars(delivery.stars_amount)} {getStarsWord(delivery.stars_amount)} отправлены на @{delivery.telegram_username}
              </p>
            </motion.div>
          )}

          {/* ─── Error ─── */}
          {delivery.status === 'error' && (
            <motion.div className={styles.errorBanner} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
              <h3 className={styles.errorTitle}>Ошибка при доставке</h3>
              <p className={styles.errorText}>
                {delivery.status_message || 'Произошла ошибка при отправке Stars.'}
              </p>
              <p className={styles.errorText} style={{ opacity: 0.7, fontSize: 12, marginTop: 8 }}>
                Код заказа: {code}
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://t.me/bazzar_support" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.supportLink}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 8,
                    background: 'rgba(0,136,204,0.15)', color: '#0088CC',
                    border: '1px solid rgba(0,136,204,0.3)',
                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <SvgTelegram /> Написать в поддержку
                </a>
              </div>
            </motion.div>
          )}

          {/* ─── Trust ─── */}
          <div className={styles.trustRow}>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgShield/></span>Безопасно</div>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgZap/></span>Быстро</div>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgClock/></span>5–30 мин</div>
          </div>

          {/* ─── How it works ─── */}
          {delivery.status === 'pending' && (
            <motion.div className={styles.infoSection}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>💡 Как это работает</h3>
                <div className={styles.howItWorks}>
                  {[
                    'Введите @username Telegram в поле выше',
                    'Оператор отправит Stars на ваш аккаунт',
                    'Вы получите уведомление в Telegram',
                    'Используйте Stars для подписок и покупок',
                  ].map((text, i) => (
                    <div key={i} className={styles.howStep}>
                      <div className={styles.howNumber}>{i + 1}</div>
                      <span className={styles.howText}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── FAQ ─── */}
          <motion.div className={styles.faqSection}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}>
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
            <div className={styles.footerDivider} />
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

/* ─── Header ─── */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="https://bazzar-market.ru" className={styles.logo}>
          <div className={styles.logoMark}>B</div>
          <span className={styles.logoText}>BAZZAR</span>
        </a>
        <a href="https://t.me/bazzar_support" target="_blank" rel="noreferrer" className={styles.headerHelp}>
          <SvgTelegram /> Поддержка
        </a>
      </div>
    </header>
  );
}
