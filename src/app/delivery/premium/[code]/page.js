'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import styles from './premium.module.css';

/* ═══════════════════════════════════════════
   BAZZAR — Telegram Premium Delivery v1
   Ultra-premium dark UI – Purple theme
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
  { key: 'processing', Icon: SvgProcessing, label: 'Активация' },
  { key: 'delivered', Icon: SvgDelivered, label: 'Готово' },
];

const STATUS_ORDER = ['pending', 'username_submitted', 'processing', 'delivered'];

/* ─── FAQ ─── */
const FAQ_ITEMS = [
  {
    q: 'Сколько времени занимает активация?',
    a: 'Обычно Premium активируется в течение 5–30 минут. В редких случаях — до 2 часов.',
  },
  {
    q: 'Где найти свой юзернейм?',
    a: 'Telegram → Настройки → ваш юзернейм после символа @. Если его нет — создайте в настройках.',
  },
  {
    q: 'Что входит в Telegram Premium?',
    a: 'Без рекламы, загрузка до 4 ГБ, анимированные стикеры, расшифровка голосовых, эмодзи-статусы и многое другое.',
  },
  {
    q: 'Premium не активировался, что делать?',
    a: 'Проверьте @username. Если Premium не появился за 2 часа — напишите в поддержку.',
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
    id: 'demo-uuid-prem', delivery_code: 'demo', order_id: 'YM-99887766',
    months: 6, amount: 1590, currency: 'RUB',
    telegram_username: null, status: 'pending',
    created_at: new Date(Date.now() - 120000).toISOString(),
  };
}

/* ─── Confetti ─── */
function Confetti({ show }) {
  if (!show) return null;
  const colors = ['#9333ea', '#c084fc', '#6366f1', '#22c55e', '#f472b6', '#a78bfa', '#818cf8', '#e879f9'];
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

/* ─── Floating diamonds ─── */
const FLOAT_ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
  size: 8 + Math.random() * 12,
  dur: 8 + Math.random() * 8,
  delay: Math.random() * 6,
}));

/* ─── Helpers ─── */
const getMonthsWord = (n) => {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return 'месяцев';
  if (last === 1) return 'месяц';
  if (last >= 2 && last <= 4) return 'месяца';
  return 'месяцев';
};

/* ─── Header ─── */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="https://bazzar-market.ru" className={styles.logo}>
          <div className={styles.logoMark}>B</div>
          <span className={styles.logoText}>BAZZAR</span>
        </a>
        <a href="https://t.me/bazzar_support" className={styles.headerHelp} target="_blank" rel="noopener">
          <SvgTelegram /> Поддержка
        </a>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function TelegramPremiumDeliveryPage() {
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
          .from('telegram_premium_deliveries')
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
    const ch = supabase.channel(`premium-${code}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'telegram_premium_deliveries', filter: `delivery_code=eq.${code}` },
        (p) => setDelivery(prev => ({ ...prev, ...p.new }))
      ).subscribe();
    return () => supabase.removeChannel(ch);
  }, [delivery, code]);

  /* ─── Poll ─── */
  useEffect(() => {
    if (!delivery || ['delivered','error'].includes(delivery.status) || code === 'demo') return;
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('telegram_premium_deliveries')
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mzsyvbwfaszpgtixcolt.supabase.co'}/functions/v1/premium-delivery`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delivery_code: code, telegram_username: clean }),
        }
      );
      
      if (res.status === 429) { setInputError('Слишком много запросов. Подождите 10 минут.'); setSubmitting(false); return; }
      if (res.status === 503) { setInputError('Сервис временно недоступен. Попробуйте позже.'); setSubmitting(false); return; }
      if (res.status >= 500) { setInputError('Ошибка сервера. Попробуйте через пару минут.'); setSubmitting(false); return; }

      const result = await res.json();
      
      if (result.blocked) {
        setDelivery(p => ({ ...p, status: result.status, telegram_username: p.telegram_username || clean }));
        setSubmitted(true); setSubmitting(false); return;
      }
      
      if (result.error && !result.status) {
        const errorMap = {
          'Invalid Telegram username': 'Некорректный username. 5-32 символа: латиница, цифры, _',
          'Delivery not found': 'Заказ не найден. Проверьте ссылку.',
          'Failed to save username': 'Не удалось сохранить. Попробуйте ещё раз.',
        };
        const friendlyMsg = Object.entries(errorMap).find(([key]) => result.error.includes(key))?.[1] || result.error;
        setInputError(friendlyMsg); setSubmitting(false); return;
      }
      
      setDelivery(p => ({ ...p, telegram_username: clean, status: result.status || 'username_submitted' }));
      setSubmitted(true);
    } catch (e) {
      if (e?.message?.includes('Failed to fetch') || e?.message?.includes('NetworkError')) {
        setInputError('Нет подключения к интернету.');
      } else {
        setInputError(e?.message || 'Произошла ошибка.');
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
              <a href="https://t.me/bazzar_support" style={{ marginTop: 16, color: '#c084fc', fontSize: 13, fontWeight: 600 }}
                target="_blank" rel="noopener">Написать в поддержку →</a>
            </div>
          </div>
        </main>
      </>
    );
  }

  const d = delivery;
  const months = d.months || 3;

  return (
    <>
      <Confetti show={showConfetti} />
      <div className={styles.bgLayer}>
        <div className={styles.bgGradient}/>
        <div className={styles.bgPattern}/>
        <div className={styles.bgStars}>
          {FLOAT_ITEMS.map(f => (
            <div key={f.id} className={styles.floatingStar}
              style={{ left: f.left, top: f.top, fontSize: f.size, '--dur': `${f.dur}s`, '--delay': `${f.delay}s` }}>
              💎
            </div>
          ))}
        </div>
      </div>

      <main className={styles.main}>
        <Header />

        <div className={styles.content}>
          {/* ─── Hero ─── */}
          <motion.div className={styles.heroCard}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className={styles.heroGradient}>
              <div className={styles.starIconWrap}>
                <span className={styles.starIcon}>💎</span>
                <div className={styles.starRing}/>
              </div>
              <div className={styles.heroLabel}>Telegram Premium</div>
              <div className={styles.starsAmount}>{months} {getMonthsWord(months)}</div>
              <div className={styles.starsLabel}>Подписка Premium</div>
            </div>

            <div className={styles.heroInfo}>
              <div className={styles.detailsRow}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Код</span>
                  <button className={styles.detailValue} onClick={handleCopyCode}>
                    <span className={styles.codeText}>{code === 'demo' ? 'DEMO' : code.slice(0, 8).toUpperCase()}</span>
                    <span className={styles.copyIcon}>
                      {codeCopied ? <SvgCheck /> : <SvgCopy />}
                    </span>
                  </button>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Сумма</span>
                  <div className={`${styles.detailValue} ${styles.amountValue}`}>
                    {d.amount ? `${d.amount.toLocaleString('ru-RU')} ₽` : '—'}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Срок</span>
                  <div className={styles.detailValue}>
                    {months} мес
                  </div>
                </div>
              </div>
              <div className={styles.timerRow}>
                <SvgClock /> {elapsed}
              </div>
            </div>
          </motion.div>

          {/* ─── Progress ─── */}
          <motion.div className={styles.progressSection}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>Статус</div>
              <div className={styles.progressTrackWrap}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${progressWidth}%` }}/>
                </div>
                <div className={styles.steps}>
                  {STATUS_STEPS.map((st, i) => {
                    const ci = currentStatusIndex;
                    const isDone = ci > i;
                    const isActive = ci === i;
                    return (
                      <div key={st.key} className={styles.step}>
                        <div className={`${styles.stepDot} ${isDone ? styles.done : isActive ? styles.active : styles.waiting}`}>
                          <st.Icon />
                        </div>
                        <span className={`${styles.stepLabel} ${isDone ? styles.done : isActive ? styles.active : ''}`}>
                          {st.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Username Input ─── */}
          {d.status === 'pending' && !submitted && (
            <motion.div className={styles.inputSection}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
              <div className={styles.inputCard}>
                <div className={styles.inputHeader}>
                  <div className={styles.inputIconCircle}><SvgTelegram /></div>
                  <div className={styles.inputTitleWrap}>
                    <div className={styles.inputTitle}>Введите @username</div>
                    <div className={styles.inputSubtitle}>На этот аккаунт будет активирован Premium</div>
                  </div>
                </div>

                <div className={styles.inputWrapper}>
                  <div className={styles.inputPrefix}>@</div>
                  <input type="text" className={`${styles.inputField} ${inputError ? styles.error : ''}`}
                    placeholder="username" value={username}
                    onChange={(e) => { setUsername(e.target.value); setInputError(null); }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    autoComplete="off" autoCapitalize="off" spellCheck="false"
                  />
                </div>

                {inputError && (
                  <div className={styles.inputError}>⚠ {inputError}</div>
                )}

                <div className={styles.inputHint}>
                  <SvgShield /> Telegram → Настройки → найдите @username
                </div>

                <button className={styles.submitBtn} onClick={handleSubmit} disabled={submitting || !username.trim()}>
                  {submitting ? (
                    <><div className={styles.loadingSpinner} style={{ width: 18, height: 18, borderWidth: 2 }}/> Отправка...</>
                  ) : (
                    <><SvgSend /> Получить Premium</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── Submitted ─── */}
          {submitted && d.status !== 'delivered' && d.status !== 'error' && (
            <motion.div className={styles.submittedBanner}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <div className={styles.submittedIcon}>🚀</div>
              <div className={styles.submittedTitle}>Юзернейм получен</div>
              <div className={styles.submittedText}>
                Premium будет активирован на ваш аккаунт.<br/>
                Обычно это занимает 5–30 минут.
              </div>
              <div className={styles.usernameTag}>
                <SvgTelegram /> @{d.telegram_username || normalize(username)}
              </div>
            </motion.div>
          )}

          {/* ─── Delivered ─── */}
          {d.status === 'delivered' && (
            <motion.div className={styles.deliveredBanner}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }}>
              <div className={styles.deliveredIcon}>🎉</div>
              <div className={styles.deliveredTitle}>Premium активирован!</div>
              <div className={styles.deliveredText}>
                Telegram Premium {months} {getMonthsWord(months)} успешно подключён
                {d.telegram_username && <> для @{d.telegram_username}</>}.
                <br/>Наслаждайтесь!
              </div>
            </motion.div>
          )}

          {/* ─── Error ─── */}
          {d.status === 'error' && (
            <motion.div className={styles.errorBanner}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className={styles.errorTitle}>❌ Ошибка активации</div>
              <div className={styles.errorText}>
                {d.status_message || 'Произошла ошибка. Свяжитесь с поддержкой.'}
              </div>
              <a href="https://t.me/bazzar_support" target="_blank" rel="noopener"
                style={{ display: 'inline-block', marginTop: 12, padding: '8px 16px', background: 'rgba(147,51,234,0.1)', border: '1px solid rgba(147,51,234,0.2)', borderRadius: 10, color: '#c084fc', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                Написать в поддержку →
              </a>
            </motion.div>
          )}

          {/* ─── Trust ─── */}
          <div className={styles.trustRow}>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgShield /></span> Безопасно</div>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgClock /></span> 5-30 мин</div>
            <div className={styles.trustBadge}><span className={styles.trustIcon}><SvgZap /></span> Мгновенно</div>
          </div>

          {/* ─── How it works ─── */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <div className={styles.infoTitle}>💎 Как это работает</div>
              <div className={styles.howItWorks}>
                {[
                  'Введите ваш Telegram @username',
                  'Мы активируем Premium на ваш аккаунт',
                  'Готово! Premium появится автоматически',
                ].map((text, i) => (
                  <div key={i} className={styles.howStep}>
                    <div className={styles.howNumber}>{i + 1}</div>
                    <div className={styles.howText}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── FAQ ─── */}
          <div className={styles.faqSection}>
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}>
                  {faq.q}
                  <SvgChevron open={openFaqIndex === i} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className={styles.faqAnswer}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ─── Footer ─── */}
          <footer className={styles.footer}>
            <div className={styles.footerDivider}/>
            <p className={styles.footerText}>
              © {new Date().getFullYear()}{' '}
              <a href="https://bazzar-market.ru" className={styles.footerLink}>BAZZAR</a>
              {' '}— Цифровые товары мгновенно
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
