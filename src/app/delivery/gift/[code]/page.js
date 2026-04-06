'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../lib/supabase';
import styles from './gift.module.css';

/* ═══════════════════════════════════════════
   BAZZAR — Steam Gift Delivery Page v2
   Premium branded page with enhanced UX
   ═══════════════════════════════════════════ */

/* ─── Custom SVG Icons ─── */
const SvgPending = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const SvgLinkSent = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const SvgProcessing = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
);

const SvgDelivered = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const SvgCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SvgCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const SvgSteam = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.979 0C5.678 0 .511 4.86.022 10.903l6.401 2.643a3.36 3.36 0 0 1 1.908-.588c.063 0 .125.002.187.006l2.854-4.13v-.058c0-2.494 2.03-4.524 4.524-4.524 2.494 0 4.524 2.03 4.524 4.524s-2.03 4.525-4.524 4.525h-.105l-4.063 2.9c0 .047.003.094.003.141 0 1.87-1.52 3.39-3.39 3.39a3.406 3.406 0 0 1-3.362-2.898L.611 15.972A12 12 0 0 0 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM7.54 18.21l-1.473-.61a2.54 2.54 0 0 0 4.867-.893 2.54 2.54 0 0 0-2.54-2.54c-.178 0-.352.019-.522.054l1.523.63a1.87 1.87 0 0 1-1.423 3.458l-.432-.099zm8.356-5.434a3.016 3.016 0 0 1-3.012-3.012 3.016 3.016 0 0 1 3.012-3.012 3.016 3.016 0 0 1 3.012 3.012 3.016 3.016 0 0 1-3.012 3.012z"/>
  </svg>
);

const SvgTelegram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.504-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const SvgChevron = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const SvgGift = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const SvgShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const SvgPercent = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19"/>
    <circle cx="6.5" cy="6.5" r="2.5"/>
    <circle cx="17.5" cy="17.5" r="2.5"/>
  </svg>
);

const SvgStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ─── Status steps with SVG icons ─── */
const STATUS_STEPS = [
  { key: 'pending', Icon: SvgPending, label: 'Ожидание ссылки' },
  { key: 'friend_link_submitted', Icon: SvgLinkSent, label: 'Ссылка получена' },
  { key: 'processing', Icon: SvgProcessing, label: 'Обработка' },
  { key: 'delivered', Icon: SvgDelivered, label: 'Доставлено' },
];

const STATUS_ORDER = ['pending', 'friend_link_submitted', 'processing', 'delivered'];

/* ─── Tab instructions ─── */
const INSTRUCTIONS = {
  pc: [
    'Откройте клиент Steam на вашем компьютере',
    'Нажмите на своё имя в правом верхнем углу',
    'Выберите «Друзья» → «Добавить друга»',
    'Скопируйте вашу ссылку-приглашение',
    'Вставьте её в поле выше и нажмите «Отправить»',
  ],
  mobile: [
    'Откройте приложение Steam на телефоне',
    'Перейдите в «Друзья и чат» (значок 💬)',
    'Нажмите «Добавить друга»',
    'Скопируйте ссылку-приглашение',
    'Вставьте её в поле выше',
  ],
  browser: [
    'Откройте steamcommunity.com',
    'Войдите в свой аккаунт Steam',
    'Перейдите в «Друзья» → «Добавить друга»',
    'Найдите ссылку вида: https://s.team/p/...',
    'Скопируйте и вставьте в поле на этой странице',
  ],
};

/* ─── FAQ Data ─── */
const FAQ_ITEMS = [
  {
    q: 'Сколько времени занимает доставка?',
    a: 'Обычно подарок приходит в течение 5–15 минут после отправки ссылки. В редких случаях — до 1 часа.',
  },
  {
    q: 'Где взять ссылку для добавления в друзья?',
    a: 'В клиенте Steam: нажмите на своё имя → Друзья → Добавить друга → скопируйте ссылку вида https://s.team/p/...',
  },
  {
    q: 'Можно ли отменить заказ?',
    a: 'После отправки ссылки отменить заказ нельзя. Если подарок не пришёл — свяжитесь с поддержкой.',
  },
  {
    q: 'Подарок не приходит, что делать?',
    a: 'Проверьте входящие приглашения в Steam. Если ничего нет — убедитесь, что ссылка актуальна и напишите в поддержку.',
  },
  {
    q: 'Как получить кешбэк 5%?',
    a: 'Кешбэк начисляется автоматически при покупке через bazzar-market.ru. Зарегистрируйтесь и совершите покупку — бонус зачислится на ваш баланс.',
  },
];

/* ─── Validate friend link ─── */
function validateFriendLink(link) {
  if (!link || link.trim().length === 0) return 'Введите ссылку для добавления в друзья';
  const trimmed = link.trim();
  const validPatterns = [
    /^https?:\/\/s\.team\/p\//i,
    /^https?:\/\/(www\.)?steamcommunity\.com\/(id|profiles)\//i,
  ];
  if (!validPatterns.some(p => p.test(trimmed))) {
    return 'Ссылка должна начинаться с https://s.team/p/ или https://steamcommunity.com/';
  }
  return null;
}

/* ─── Demo order ─── */
function getDemoOrder() {
  return {
    id: 'demo-uuid-001',
    delivery_code: 'demo',
    game_name: 'Cyberpunk 2077: Ultimate Edition',
    app_id: '1091500',
    package_id: '942417',
    header_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    screenshots: JSON.stringify([]),
    region: 'RU',
    region_flag: '🇷🇺',
    edition_name: 'Ultimate Edition',
    amount: 2499,
    currency: 'RUB',
    status: 'pending',
    friend_link: null,
    created_at: new Date(Date.now() - 120000).toISOString(), // 2 min ago
  };
}

/* ─── Confetti Particle Component ─── */
function Confetti({ show }) {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      size: 4 + Math.random() * 8,
      color: ['#22c55e', '#4da6ff', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
      type: Math.random() > 0.5 ? 'rect' : 'circle',
    }))
  , []);

  if (!show) return null;

  return (
    <div className={styles.confettiContainer}>
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.confettiParticle}
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.type === 'rect' ? p.size : p.size,
            height: p.type === 'rect' ? p.size * 0.4 : p.size,
            borderRadius: p.type === 'circle' ? '50%' : '2px',
            background: p.color,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Timer Hook ─── */
function useElapsedTime(startDate) {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!startDate) return;
    const update = () => {
      const diff = Date.now() - new Date(startDate).getTime();
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (mins > 60) {
        const hrs = Math.floor(mins / 60);
        setElapsed(`${hrs} ч ${mins % 60} мин`);
      } else {
        setElapsed(`${mins} мин ${secs < 10 ? '0' : ''}${secs} сек`);
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startDate]);

  return elapsed;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function SteamGiftDeliveryPage() {
  const params = useParams();
  const code = params.code;

  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState(null);
  const [error, setError] = useState(null);

  // Friend link form
  const [friendLink, setFriendLink] = useState('');
  const [inputError, setInputError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [supplierError, setSupplierError] = useState(null);

  // UI
  const [activeTab, setActiveTab] = useState('pc');
  const [codeCopied, setCodeCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevStatusRef = useRef(null);

  // Timer
  const elapsed = useElapsedTime(delivery?.created_at);

  /* ─── Fetch delivery info ─── */
  useEffect(() => {
    let isMounted = true;
    async function fetchDelivery() {
      try {
        setLoading(true);
        setError(null);
        if (code === 'demo' || code === 'test') {
          setDelivery(getDemoOrder());
          setLoading(false);
          return;
        }
        let data = null;
        let fetchErr = null;
        try {
          const result = await supabase
            .from('steam_gift_deliveries')
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
          setError('Заказ с таким кодом не найден. Проверьте ссылку в письме от Яндекс Маркета.');
        } else {
          setDelivery(data);
          if (data.friend_link) {
            setFriendLink(data.friend_link);
            setSubmitted(true);
          }
        }
      } catch {
        if (isMounted) setError('Произошла ошибка при загрузке. Попробуйте обновить страницу.');
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

  /* ─── Realtime subscription ─── */
  useEffect(() => {
    if (!delivery || delivery.status === 'delivered' || delivery.status === 'error' || code === 'demo') return;
    const channel = supabase
      .channel(`gift-${code}`)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public',
        table: 'steam_gift_deliveries',
        filter: `delivery_code=eq.${code}`,
      }, (payload) => {
        setDelivery(prev => ({ ...prev, ...payload.new }));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [delivery, code]);

  /* ─── Fallback polling (every 30s) ─── */
  useEffect(() => {
    if (!delivery || delivery.status === 'delivered' || delivery.status === 'error' || code === 'demo') return;
    const poll = setInterval(async () => {
      const { data } = await supabase
        .from('steam_gift_deliveries')
        .select('status, delivered_at, supplier_transaction_id, status_message')
        .eq('delivery_code', code)
        .single();
      if (data && data.status !== delivery.status) {
        setDelivery(prev => ({ ...prev, ...data }));
      }
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

  /* ─── Copy code ─── */
  const handleCopyCode = useCallback(async () => {
    try { await navigator.clipboard.writeText(code); } catch {
      const el = document.createElement('textarea');
      el.value = code; document.body.appendChild(el);
      el.select(); document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  }, [code]);

  /* ─── DeslyHub error messages ─── */
  const SUPPLIER_ERROR_MESSAGES = {
    '-1': 'Временная ошибка сервиса доставки. Попробуйте через несколько минут или напишите в поддержку.',
    '-2': 'Недостаточно средств для выполнения заказа. Мы уже уведомлены — попробуйте позже или свяжитесь с поддержкой.',
    '-3': 'Ошибка параметров заказа. Свяжитесь с поддержкой для решения проблемы.',
    '-4': 'Не удалось обработать заказ. Возможные причины: регион вашего аккаунта Steam не совпадает с регионом товара, ссылка на добавление в друзья устарела, или профиль Steam закрыт. Проверьте настройки вашего профиля и скопируйте новую ссылку.',
    '-5': 'Игра временно недоступна у поставщика. Попробуйте через 10–15 минут.',
    '-6': 'Неверная ссылка на добавление в друзья Steam. Откройте Steam → Друзья → Добавить друга → скопируйте ссылку-приглашение и вставьте её заново.',
  };

  /* ─── Submit friend link ─── */
  const handleSubmitFriendLink = async () => {
    // Anti-fraud: block submit if already delivered or processing
    if (delivery?.status === 'delivered' || delivery?.status === 'processing' || delivery?.status === 'friend_link_submitted') {
      setInputError('Повторная отправка невозможна. Подарок уже обрабатывается или доставлен.');
      return;
    }

    const validationError = validateFriendLink(friendLink);
    if (validationError) { setInputError(validationError); return; }
    setInputError(null);
    setSupplierError(null);
    setSubmitting(true);

    try {
      if (code === 'demo' || code === 'test') {
        await new Promise(r => setTimeout(r, 1500));
        setDelivery(prev => ({ ...prev, status: 'friend_link_submitted', friend_link: friendLink.trim() }));
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(() => setDelivery(prev => ({ ...prev, status: 'processing' })), 3000);
        setTimeout(() => setDelivery(prev => ({ ...prev, status: 'delivered', delivered_at: new Date().toISOString() })), 8000);
        return;
      }

      const res = await fetch(
        `https://mzsyvbwfaszpgtixcolt.supabase.co/functions/v1/gift-delivery`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ delivery_code: code, friend_link: friendLink.trim() }) }
      );
      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || 'Ошибка отправки');

      // Anti-fraud: handle blocked responses from backend
      if (result.blocked) {
        setInputError(result.message || 'Повторная отправка заблокирована.');
        setDelivery(prev => ({ ...prev, status: result.status }));
        setSubmitted(true);
        return;
      }

      // Handle DeslyHub supplier errors — let user retry
      if (result.error_code) {
        const errMsg = SUPPLIER_ERROR_MESSAGES[String(result.error_code)] || result.message || 'Произошла ошибка при обработке. Попробуйте ещё раз.';
        setSupplierError({ code: result.error_code, message: errMsg });
        // Reset delivery status to pending so user can retry
        setDelivery(prev => ({ ...prev, status: 'pending' }));
        setSubmitted(false);
        setFriendLink('');
        return;
      }

      // Success — update status
      setDelivery(prev => ({ ...prev, status: result.status || 'friend_link_submitted', friend_link: friendLink.trim() }));
      setSubmitted(true);
      setSupplierError(null);
    } catch (err) {
      setInputError(err.message || 'Ошибка при отправке. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── Reset and retry (only for retryable supplier errors) ─── */
  const handleRetry = () => {
    // Anti-fraud: never allow retry if already delivered or processing
    if (delivery?.status === 'delivered' || delivery?.status === 'processing' || delivery?.status === 'friend_link_submitted') {
      return;
    }
    setSupplierError(null);
    setInputError(null);
    setSubmitted(false);
    setFriendLink('');
    setDelivery(prev => ({ ...prev, status: 'pending' }));
  };

  /* ─── Computed ─── */
  const currentStatusIdx = delivery ? STATUS_ORDER.indexOf(delivery.status) : 0;
  const progressPercent = currentStatusIdx >= 0 ? (currentStatusIdx / (STATUS_STEPS.length - 1)) * 100 : 0;

  const formatPrice = (amount, currency = 'RUB') => {
    if (!amount) return '';
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
  };

  const regionName = (r) => ({ RU: 'Россия', BR: 'Бразилия', TR: 'Турция', KZ: 'Казахстан', UA: 'Украина', AR: 'Аргентина' }[r] || r);

  return (
    <>
      {/* Confetti */}
      <Confetti show={showConfetti} />

      {/* Background */}
      <div className={styles.bgLayer}>
        <div className={styles.bgGradient} />
        <div className={styles.bgPattern} />
      </div>

      <main className={styles.main}>
        {/* ═══ Header ═══ */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <a href="/" className={styles.logo}>
              <div className={styles.logoMark}>B</div>
              <span className={styles.logoText}>BAZZAR</span>
            </a>
            <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.headerHelp}>
              <SvgTelegram />
              <span>Поддержка</span>
            </a>
          </div>
        </header>

        {/* ═══ Content ═══ */}
        <div className={styles.content}>
          <AnimatePresence>
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.loadingWrap}>
                <div className={styles.shimmer} style={{ width: '100%', height: 220, borderRadius: 24 }} />
                <div className={styles.shimmer} style={{ width: '60%', height: 28 }} />
                <div className={styles.shimmer} style={{ width: '100%', height: 80 }} />
                <div className={styles.shimmer} style={{ width: '100%', height: 200, borderRadius: 24 }} />
              </motion.div>

            ) : error ? (
              <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className={styles.errorCard}>
                <div className={styles.errorIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h2 className={styles.errorTitle}>Заказ не найден</h2>
                <p className={styles.errorText}>{error}</p>
                <a href="/" className={styles.btnOutline}>← На главную</a>
              </motion.div>

            ) : !delivery ? (
              <motion.div key="no-data" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className={styles.errorCard}>
                <div className={styles.errorIcon}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                </div>
                <h2 className={styles.errorTitle}>Заказ не найден</h2>
                <p className={styles.errorText}>Не удалось загрузить данные заказа. Попробуйте обновить страницу.</p>
                <a href="/" className={styles.btnOutline}>← На главную</a>
              </motion.div>

            ) : (
              <motion.div key="delivery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>

                {/* ═══ Game Card ═══ */}
                <motion.div className={styles.gameCard}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  {delivery.header_image && (
                    <div className={styles.gameImageWrap}>
                      <img src={delivery.header_image} alt={delivery.game_name} className={styles.gameImage} />
                      <div className={styles.gameImageGradient} />
                      <div className={styles.steamBadge}>
                        <SvgSteam />
                        <span>Steam Gift</span>
                      </div>
                    </div>
                  )}
                  <div className={styles.gameInfo}>
                    <h1 className={styles.gameName}>{delivery.game_name}</h1>
                    {delivery.edition_name && delivery.edition_name !== delivery.game_name && (
                      <span className={styles.editionBadge}>{delivery.edition_name}</span>
                    )}
                  </div>
                </motion.div>

                {/* ═══ Order Details Row ═══ */}
                <motion.div className={styles.detailsRow}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Код заказа</span>
                    <button className={styles.detailValue} onClick={handleCopyCode}>
                      <span className={styles.codeText}>{code}</span>
                      <span className={styles.copyIcon}>
                        {codeCopied ? <SvgCheck /> : <SvgCopy />}
                      </span>
                    </button>
                  </div>
                  {delivery.region && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Регион</span>
                      <div className={styles.detailValue}>
                        <span className={styles.regionFlag}>{delivery.region_flag || '🌍'}</span>
                        <span>{regionName(delivery.region)}</span>
                      </div>
                    </div>
                  )}
                  {delivery.amount && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Сумма</span>
                      <div className={`${styles.detailValue} ${styles.amountValue}`}>
                        {formatPrice(delivery.amount, delivery.currency || 'RUB')}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* ═══ Timer ═══ */}
                {elapsed && delivery.status !== 'delivered' && (
                  <motion.div className={styles.timerRow}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span>Создан {elapsed} назад</span>
                  </motion.div>
                )}

                {/* ═══ Progress Bar ═══ */}
                <motion.div className={styles.progressSection}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}>

                  {/* Progress track */}
                  <div className={styles.progressTrack}>
                    <motion.div className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>

                  {/* Status dots */}
                  <div className={styles.statusDots}>
                    {STATUS_STEPS.map((step, i) => {
                      const idx = STATUS_ORDER.indexOf(step.key);
                      const isDone = currentStatusIdx > idx;
                      const isActive = currentStatusIdx === idx;
                      const Icon = step.Icon;
                      return (
                        <div key={step.key} className={styles.statusStep}>
                          <div className={`${styles.statusDot} ${
                            isDone ? styles.statusDotDone :
                            isActive ? styles.statusDotActive :
                            styles.statusDotPending
                          }`}>
                            {isDone ? <SvgCheck /> : <Icon />}
                          </div>
                          <span className={`${styles.statusLabel} ${
                            isDone ? styles.statusLabelDone :
                            isActive ? styles.statusLabelActive : ''
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* ═══ Delivered State ═══ */}
                {delivery.status === 'delivered' && (
                  <motion.div className={styles.deliveredCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
                    <div className={styles.deliveredGlow} />
                    <div className={styles.deliveredIconWrap}>
                      <SvgGift />
                    </div>
                    <h3 className={styles.deliveredTitle}>Подарок доставлен!</h3>
                    <p className={styles.deliveredText}>
                      Игра «{delivery.game_name}» отправлена на ваш аккаунт Steam.
                      Проверьте входящие приглашения.
                    </p>
                    <div className={styles.deliveredCheck}>
                      <SvgShield />
                      <span>Безопасная доставка через BAZZAR</span>
                    </div>
                  </motion.div>
                )}

                {/* ═══ Processing / Friend Link Submitted ═══ */}
                {(delivery.status === 'processing' || delivery.status === 'friend_link_submitted') && (
                  <motion.div className={styles.processingCard}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <div className={styles.processingSpinner} />
                    <h3 className={styles.processingTitle}>
                      {delivery.status === 'processing' ? 'Отправляем подарок...' : 'Ссылка получена!'}
                    </h3>
                    <p className={styles.processingText}>
                      {delivery.status === 'processing'
                        ? 'Мы добавляем вас в друзья и отправляем подарок. Обычно это занимает до 15 минут.'
                        : 'Ваша ссылка передана системе доставки. Ожидайте — подарок скоро будет отправлен.'}
                    </p>
                  </motion.div>
                )}

                {/* ═══ Error State ═══ */}
                {delivery.status === 'error' && (
                  <motion.div className={styles.errorStateCard}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#ef4444', marginBottom: 6 }}>Ошибка доставки</h3>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {delivery.status_message || 'Произошла ошибка. Пожалуйста, свяжитесь с поддержкой.'}
                    </p>
                  </motion.div>
                )}

                {/* ═══ Supplier Error State ═══ */}
                {supplierError && (
                  <motion.div className={styles.supplierErrorCard}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}>
                    <div className={styles.supplierErrorIcon}>⚠️</div>
                    <h3 className={styles.supplierErrorTitle}>Не удалось отправить подарок</h3>
                    <p className={styles.supplierErrorText}>{supplierError.message}</p>
                    <div className={styles.supplierErrorHint}>
                      Код ошибки: {supplierError.code}
                    </div>
                  </motion.div>
                )}

                {/* ═══ Friend Link Input (when pending or supplier error) ═══ */}
                {(delivery.status === 'pending') && (
                  <motion.div className={styles.friendLinkCard}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}>
                    <div className={styles.friendLinkGlow} />
                    <h3 className={styles.friendLinkTitle}>
                      <SvgLinkSent />
                      <span>Отправьте ссылку на добавление в друзья</span>
                    </h3>
                    <p className={styles.friendLinkDesc}>
                      Для отправки подарка нам нужна ваша ссылка для быстрого добавления в друзья Steam.
                      Мы добавим вас в друзья и мгновенно отправим игру.
                    </p>

                    <div className={styles.inputWrap}>
                      <input
                        type="url"
                        className={`${styles.friendLinkInput} ${inputError ? styles.inputErr : ''}`}
                        placeholder="https://s.team/p/abc-defg/ABCDEFGH"
                        value={friendLink}
                        onChange={(e) => { setFriendLink(e.target.value); setInputError(null); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitFriendLink()}
                        disabled={submitting}
                      />
                    </div>

                    {inputError && (
                      <motion.div className={styles.inputError}
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                        ⚠️ {inputError}
                      </motion.div>
                    )}

                    <motion.button
                      className={styles.submitBtn}
                      onClick={handleSubmitFriendLink}
                      disabled={submitting || !friendLink.trim()}
                      whileHover={!submitting ? { scale: 1.01 } : undefined}
                      whileTap={!submitting ? { scale: 0.98 } : undefined}
                    >
                      {submitting ? (
                        <>
                          <div className={styles.btnSpinner} />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <SvgGift />
                          Отправить ссылку и получить подарок
                        </>
                      )}
                    </motion.button>

                    {submitted && (
                      <div className={styles.submittedNotice}>
                        <SvgCheck /> Ссылка успешно отправлена!
                      </div>
                    )}

                    {/* Instructions tabs */}
                    <div className={styles.instructionsBlock}>
                      <div className={styles.instructionsLabel}>Где найти ссылку?</div>
                      <div className={styles.platformTabs}>
                        {[
                          { id: 'pc', icon: '🖥️', label: 'ПК' },
                          { id: 'mobile', icon: '📱', label: 'Телефон' },
                          { id: 'browser', icon: '🌐', label: 'Браузер' },
                        ].map(tab => (
                          <button key={tab.id}
                            className={`${styles.platformTab} ${activeTab === tab.id ? styles.platformTabActive : ''}`}
                            onClick={() => setActiveTab(tab.id)}>
                            <span className={styles.tabIcon}>{tab.icon}</span>
                            {tab.label}
                          </button>
                        ))}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div key={activeTab} className={styles.instructionsList}
                          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                          {INSTRUCTIONS[activeTab].map((step, i) => (
                            <div key={i} className={styles.instructionStep}>
                              <span className={styles.stepNumber}>{i + 1}</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* ═══ Support Block ═══ */}
                <motion.a href="https://t.me/bazzar_support" target="_blank" rel="noopener"
                  className={styles.supportBlock}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <div className={styles.supportIconWrap}>
                    <SvgTelegram />
                  </div>
                  <div className={styles.supportContent}>
                    <strong>Возникли трудности?</strong>
                    <p>Напишите в поддержку — ответим за минуту</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" className={styles.supportArrow}>
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </motion.a>

                {/* ═══ Cashback Banner ═══ */}
                <motion.div className={styles.cashbackBanner}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}>
                  <div className={styles.cashbackGlow} />
                  <div className={styles.cashbackIcon}>
                    <SvgPercent />
                  </div>
                  <div className={styles.cashbackContent}>
                    <strong>Кешбэк 5% с каждой покупки</strong>
                    <p>Покупайте игры на bazzar-market.ru и получайте бонусы на счёт</p>
                  </div>
                  <div className={styles.cashbackBadge}>5%</div>
                </motion.div>

                {/* ═══ Promo Banner ═══ */}
                <motion.a href="https://bazzar-market.ru" target="_blank" rel="noopener"
                  className={styles.promoBanner}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <div className={styles.promoGlow} />
                  <div className={styles.promoTop}>
                    <div className={styles.promoLogoWrap}>
                      <div className={styles.promoLogoMark}>B</div>
                      <span>BAZZAR Market</span>
                    </div>
                    <div className={styles.promoStars}>
                      {[...Array(5)].map((_, i) => <SvgStar key={i} />)}
                    </div>
                  </div>
                  <h4 className={styles.promoTitle}>Покупайте дешевле на нашем маркете!</h4>
                  <p className={styles.promoDesc}>
                    Тысячи игр Steam по лучшим ценам. Быстрая доставка, кешбэк 5% и поддержка 24/7.
                  </p>
                  <div className={styles.promoBtn}>
                    Перейти на bazzar-market.ru →
                  </div>
                </motion.a>

                {/* ═══ FAQ ═══ */}
                <motion.div className={styles.faqSection}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}>
                  <h4 className={styles.faqTitle}>Частые вопросы</h4>
                  {FAQ_ITEMS.map((item, i) => (
                    <div key={i} className={`${styles.faqItem} ${openFaqIndex === i ? styles.faqItemOpen : ''}`}>
                      <button className={styles.faqQuestion} onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}>
                        <span>{item.q}</span>
                        <SvgChevron open={openFaqIndex === i} />
                      </button>
                      <AnimatePresence>
                        {openFaqIndex === i && (
                          <motion.div className={styles.faqAnswer}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <p>{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>

                {/* ═══ Footer ═══ */}
                <motion.div className={styles.footer}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}>
                  <div className={styles.footerBrand}>
                    <div className={styles.footerLogoMark}>B</div>
                    <span>BAZZAR</span>
                  </div>
                  <p className={styles.footerCopy}>© {new Date().getFullYear()} BAZZAR — Цифровая доставка Steam Gift</p>
                  <div className={styles.footerLinks}>
                    <a href="https://t.me/bazzar_support" target="_blank" rel="noopener">Поддержка</a>
                    <a href="https://bazzar-market.ru" target="_blank" rel="noopener">Маркет</a>
                  </div>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
