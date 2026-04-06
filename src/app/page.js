'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import styles from './page.module.css';
import MobileMenu from './components/MobileMenu';

/* ═══════════════════════════════════════════════
   REVEAL ON SCROLL
   ═══════════════════════════════════════════════ */
function Reveal({ children, className, delay = 0, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.section ref={ref} className={className} id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.section>
  );
}

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */
function Counter({ end, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let frame;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end]);
  return <span ref={ref}>{prefix}{count.toLocaleString('ru-RU')}{suffix}</span>;
}

/* ═══════════════════════════════════════════════
   3D TILT CARD
   ═══════════════════════════════════════════════ */
function TiltCard({ children, className, ...props }) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale3d(1,1,1)';
  }, []);
  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)', transformStyle: 'preserve-3d', willChange: 'transform' }}
      {...props}
    >{children}</div>
  );
}

/* ═══════════════════════════════════════════════
   SVG SERVICE ICONS (real logos)
   ═══════════════════════════════════════════════ */
const SvgIcons = {
  telegram: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#2AABEE"/><path d="M10.6 23.4c6.5-2.8 10.8-4.7 13-5.5 6.2-2.6 7.5-3 8.3-3 .2 0 .6 0 .8.3.2.2.2.4.2.6 0 .2 0 .6-.1.9-.5 5-2.5 17.2-3.6 22.8-.4 2.4-1.3 3.2-2.2 3.2-1.8.2-3.2-1.2-5-2.4-2.8-1.8-4.4-3-7.1-4.7-3.2-2.1-1.1-3.2.7-5.1.5-.5 8.6-7.9 8.8-8.6 0-.1 0-.3-.1-.5-.1-.1-.4-.1-.5 0-.2 0-4.7 3-13.3 8.8-1.3.9-2.4 1.3-3.4 1.3-1.1 0-3.3-.6-4.9-1.2-2-.7-3.5-1-3.4-2.2.1-.6.9-1.2 2.3-1.7z" fill="#fff"/></svg>
  ),
  steam: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1B2838"/><path d="M24 8C15.2 8 8 14.7 8 23c0 4.3 1.9 8.2 5 10.9l5.3-2.2c.4-.2.9-.2 1.3 0l3.9 2.3 5.7-4.1c-.1-.3-.1-.7-.1-1 0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6c-.7 0-1.4-.1-2-.3L28.4 38c-.4.3-.9.3-1.3.1l-5-2.2C15.5 38.7 10.5 40 8 40c3.2 2.5 7.3 4 11.8 4 9.4 0 17-7.2 17-16S33.4 8 24 8z" fill="#66C0F4"/><circle cx="35" cy="28.9" r="3" fill="#1B2838"/></svg>
  ),
  discord: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#5865F2"/><path d="M33.6 15.2A22 22 0 0028 13.5a.1.1 0 00-.1 0 15 15 0 00-.7 1.4 20 20 0 00-6.1 0 14 14 0 00-.7-1.4.1.1 0 00-.1 0 22 22 0 00-5.5 1.7.1.1 0 000 0A23 23 0 0011 31.5a.1.1 0 000 .1 22 22 0 006.8 3.4.1.1 0 00.1 0 16 16 0 001.4-2.3.1.1 0 000-.1 15 15 0 01-2.2-1 .1.1 0 010-.2l.4-.3a.1.1 0 01.1 0 16 16 0 0013.7 0 .1.1 0 01.1 0l.4.3a.1.1 0 010 .2 14 14 0 01-2.2 1 .1.1 0 000 .1 16 16 0 001.4 2.3.1.1 0 00.1 0 22 22 0 006.8-3.4.1.1 0 000-.1c.5-5.6-.9-10.4-3.6-14.7zm-14 13.4c-1.3 0-2.4-1.2-2.4-2.6s1-2.6 2.4-2.6 2.4 1.2 2.4 2.6-1 2.6-2.4 2.6zm8.8 0c-1.3 0-2.4-1.2-2.4-2.6s1-2.6 2.4-2.6 2.4 1.2 2.4 2.6-1 2.6-2.4 2.6z" fill="#fff"/></svg>
  ),
  youtube: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#FF0000"/><path d="M36.2 17.8a3 3 0 00-2.1-2.1C32 15 24 15 24 15s-8 0-10.1.7a3 3 0 00-2.1 2.1C11 19.9 11 24 11 24s0 4.1.8 6.2a3 3 0 002.1 2.1C16 33 24 33 24 33s8 0 10.1-.7a3 3 0 002.1-2.1c.8-2.1.8-6.2.8-6.2s0-4.1-.8-6.2z" fill="#FF0000"/><path d="M21 28.5v-9l6.8 4.5L21 28.5z" fill="#fff"/></svg>
  ),
  apple: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#333"/><path d="M31.4 25.2c0-3.5 2.8-5.1 3-5.3-1.6-2.4-4.2-2.7-5.1-2.8-2.1-.2-4.2 1.3-5.3 1.3s-2.8-1.3-4.6-1.2c-2.4 0-4.6 1.4-5.8 3.5-2.5 4.3-.6 10.7 1.8 14.2 1.2 1.7 2.6 3.6 4.4 3.5 1.8-.1 2.5-1.1 4.6-1.1s2.8 1.1 4.6 1.1c1.9 0 3.1-1.7 4.3-3.5 1.3-2 1.9-3.9 1.9-4zM27.9 14.7c1-1.2 1.7-2.8 1.5-4.5-1.4.1-3.2 1-4.2 2.2-1 1.1-1.8 2.9-1.6 4.5 1.6.1 3.3-.8 4.3-2.2z" fill="#fff"/></svg>
  ),
  spotify: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#1DB954"/><path d="M32.8 28.5c-.3 0-.5-.1-.7-.2-3.8-2.3-8.5-2.8-14-1.5-.3.1-.7.1-1.1.2-.5 0-.8-.3-.9-.8s.3-.8.8-.9c6-1.4 11.2-.8 15.5 1.8.4.3.6.7.4 1.2-.2.3-.5.5-1 .2zm1.5-4c-.3 0-.5-.1-.8-.2-4.7-2.8-11-3.7-16.4-2-.4.1-.8.2-1.2.3-.5 0-.9-.4-1-.9s.4-.9.9-1c6-2 12.8-1 18 2.2.5.3.7.8.4 1.3-.2.4-.5.5-.9.3zm.2-4.5c-5.5-3.3-14.7-3.6-20-2-.5.1-.9.3-1.4.4-.6 0-1-.5-1.1-1.1s.5-1 1.1-1.1c6.1-1.8 16.2-1.5 22.5 2.3.5.3.7 1 .4 1.6-.3.4-.9.6-1.5.3z" fill="#fff"/></svg>
  ),
  netflix: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#E50914"/><path d="M18 12h4l6 15.6V12h4v24h-3.6L22 20.4V36h-4V12z" fill="#fff"/></svg>
  ),
  playstation: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#003087"/><path d="M19.2 17v14.6l3.5 1.2V19.5c0-.8.3-1.2.8-1.2.6 0 .8.4.8 1.2v13.3c2.4-.9 3.3-2.5 3.3-4.9 0-2.3-.8-3.8-3.2-5l-5.2-2.2V17zm14.5 14.5c-.6.8-2 1.4-2 1.4l-7.5 3v2.7l7.5-2.7c2-.7 2.2-1.6 2.2-2.8s-.7-2-2-2l-7.7 2.8v2.7l5.5-2c.6-.2 1 0 1 .4s-.3.7-1 1l-5.5 2v2.5l7.5-2.7c2-.7 2.2-1.6 2.2-2.8s-.5-1.8-.7-2z" fill="#fff"/></svg>
  ),
  xbox: (sz = 40) => (
    <svg width={sz} height={sz} viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#107C10"/><path d="M24 10c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 2c1.8 0 3.5.4 5 1.1-1 .7-2 1.8-3 3-1-.9-2-1.3-2-1.3s-1 .4-2 1.3c-1-1.2-2-2.3-3-3 1.5-.7 3.2-1.1 5-1.1zm-8.5 4c1.5 1 3.2 2.8 4.8 5.2 1.8 2.7 3.1 5.5 3.7 7.7-2.8.1-5.8-.6-8.1-2.8-2.3-2.2-3-5-2.7-7.3.1-1 .4-2 1-2.8h1.3zm17 0h1.3c.6.8.9 1.8 1 2.8.3 2.3-.4 5.1-2.7 7.3-2.3 2.2-5.3 2.9-8.1 2.8.6-2.2 1.9-5 3.7-7.7 1.6-2.4 3.3-4.2 4.8-5.2z" fill="#fff"/></svg>
  ),
};

/* ═══════════════════════════════════════════════
   SMALL SVG ICONS
   ═══════════════════════════════════════════════ */
const Icons = {
  globe: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3"/><ellipse cx="10" cy="10" rx="4" ry="8" stroke="currentColor" strokeWidth="1.3"/><path d="M2 10h16" stroke="currentColor" strokeWidth="1.3"/></svg>),
  search: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>),
  arrow: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  star: (<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M9 1l2.47 5.01L17 6.64l-4 3.9.94 5.5L9 13.4l-4.94 2.64.94-5.5-4-3.9 5.53-.63L9 1z"/></svg>),
  telegram: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>),
  flash: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M10 1L3 10.5H9L8 17L15 7.5H9L10 1Z" fill="currentColor"/></svg>),
  shield: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1L2 4.5V8.5C2 12.64 5.04 16.46 9 17.5C12.96 16.46 16 12.64 16 8.5V4.5L9 1Z" fill="currentColor" opacity="0.2"/><path d="M9 1L2 4.5V8.5C2 12.64 5.04 16.46 9 17.5C12.96 16.46 16 12.64 16 8.5V4.5L9 1Z" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 9L8 10.5L11.5 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  gift: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="9" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M10 9v9M2 13h16" stroke="currentColor" strokeWidth="1.3"/><path d="M10 9c0-3 2.5-5 4-4s1 4-4 4M10 9c0-3-2.5-5-4-4S5 9 10 9" stroke="currentColor" strokeWidth="1.3" fill="none"/></svg>),
  key: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="13" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M10 11l6-6m0 0v3m0-3h-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  gamepad: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 7h8a4 4 0 014 4v1a4 4 0 01-4 4H6a4 4 0 01-4-4v-1a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.3"/><circle cx="7" cy="11" r="1" fill="currentColor"/><circle cx="13" cy="11" r="1" fill="currentColor"/></svg>),
  wallet: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M14 11h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M2 8h16" stroke="currentColor" strokeWidth="1.3"/></svg>),
  user: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.3"/><path d="M3 17.5c0-3.04 2.46-5.5 5.5-5.5h3c3.04 0 5.5 2.46 5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>),
  diamond: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L2 8l8 10 8-10-8-6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M2 8h16" stroke="currentColor" strokeWidth="1.3"/><path d="M10 2l-3 6m3-6l3 6" stroke="currentColor" strokeWidth="1.3"/></svg>),
  discord: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 12a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/><path d="M7.5 4.5S9 4 10 4s2.5.5 2.5.5a12 12 0 013 10.5c-1 1-2.5 1.5-2.5 1.5l-.5-1.5-.5.5s-1 .5-2 .5-2-.5-2-.5l-.5-.5-.5 1.5S5 15 4 14a12 12 0 013.5-9.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>),
  chevronRight: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */
/* ═══ THEMED CATEGORY SECTIONS ═══ */
const themeSections = [
  {
    id: 'services',
    title: 'Консоли и сервисы',
    subtitle: 'Оплата зарубежных подписок и сервисов',
    emoji: '🌐',
    gradient: 'linear-gradient(135deg, rgba(42,171,238,0.15), rgba(88,101,242,0.12))',
    accentColor: '#2AABEE',
    items: [
      { title: 'Telegram Stars', desc: 'От 50 до 10 000', price: 'от 65 ₽', oldPrice: '85 ₽', discount: '-23%', tag: 'Хит', icon: SvgIcons.telegram, href: '/category/telegram-stars' },
      { title: 'Telegram Premium', desc: '1–12 месяцев', price: 'от 299 ₽', oldPrice: '399 ₽', discount: '-25%', icon: SvgIcons.telegram, href: '/category/telegram-premium' },
      { title: 'PlayStation Plus', desc: 'Essential / Extra / Deluxe', price: 'от 1 590 ₽', icon: SvgIcons.playstation, href: '/category/playstation' },
      { title: 'Spotify Premium', desc: 'Индивидуальная и семейная', price: 'от 199 ₽', icon: SvgIcons.spotify, href: '/category/spotify' },
      { title: 'Xbox Game Pass', desc: 'Core / Standard / Ultimate', price: 'от 499 ₽', tag: 'Новинка', icon: SvgIcons.xbox, href: '/category/xbox' },
      { title: 'Discord Nitro', desc: 'Basic и Full', price: 'от 299 ₽', oldPrice: '449 ₽', discount: '-33%', icon: SvgIcons.discord, href: '/category/discord-nitro' },
      { title: 'YouTube Premium', desc: 'Без рекламы', price: 'от 199 ₽', icon: SvgIcons.youtube, href: '/category/youtube' },
      { title: 'Netflix', desc: 'Подписки и карты', price: 'от 499 ₽', icon: SvgIcons.netflix, href: '/category/netflix' },
    ],
  },
  {
    id: 'game-currency',
    title: 'Игровая валюта',
    subtitle: 'Пополнение мобильных и ПК игр',
    emoji: '🎮',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.12))',
    accentColor: '#A855F7',
    items: [
      { title: 'PUBG Mobile', desc: 'UC пополнение', price: 'от 99 ₽', tag: 'Хит', href: '/category/pubg-mobile' },
      { title: 'Genshin Impact', desc: 'Genesis Crystals', price: 'от 149 ₽', href: '/category/genshin' },
      { title: 'Mobile Legends', desc: 'Diamonds', price: 'от 79 ₽', href: '/category/mobile-legends' },
      { title: 'Fortnite', desc: 'V-Bucks', price: 'от 499 ₽', href: '/category/fortnite' },
      { title: 'Roblox', desc: 'Robux', price: 'от 199 ₽', tag: 'Популярное', href: '/category/roblox' },
      { title: 'Clash Royale', desc: 'Gems', price: 'от 149 ₽', href: '/category/clash-royale' },
    ],
  },
  {
    id: 'steam-gifts',
    title: 'Покупай Гифт',
    subtitle: 'Мгновенная доставка подарков Steam',
    emoji: '🎁',
    gradient: 'linear-gradient(135deg, rgba(255,30,86,0.15), rgba(255,96,144,0.1))',
    accentColor: '#FF1E56',
    items: [
      { title: 'Steam Gift', desc: 'Любая игра в подарок', price: 'от 99 ₽', tag: 'Хит', icon: SvgIcons.steam, href: '/category/steam-gift' },
      { title: 'AAA Игры', desc: 'Cyberpunk, Elden Ring, GTA V', price: 'от 999 ₽', icon: SvgIcons.steam, href: '/category/steam-gift' },
      { title: 'Indie Хиты', desc: 'Stardew Valley, Hades', price: 'от 199 ₽', icon: SvgIcons.steam, href: '/category/steam-gift' },
      { title: 'Новинки 2026', desc: 'Предзаказ и релизы', price: 'от 1 499 ₽', tag: 'Новинка', icon: SvgIcons.steam, href: '/category/steam-gift' },
    ],
  },
  {
    id: 'keys-vouchers',
    title: 'Покупай Ключи',
    subtitle: 'Карты пополнения, ваучеры и ключи',
    emoji: '🔑',
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(245,158,11,0.1))',
    accentColor: '#FBBF24',
    items: [
      { title: 'App Store / iTunes', desc: 'Подарочные карты', price: 'от 500 ₽', icon: SvgIcons.apple, href: '/category/gift-cards' },
      { title: 'Google Play', desc: 'Карты пополнения', price: 'от 500 ₽', href: '/category/gift-cards' },
      { title: 'PlayStation Store', desc: 'Ваучеры PSN', price: 'от 999 ₽', icon: SvgIcons.playstation, href: '/category/gift-cards' },
      { title: 'Xbox Gift Card', desc: 'Карты Microsoft', price: 'от 999 ₽', icon: SvgIcons.xbox, href: '/category/gift-cards' },
      { title: 'Nintendo eShop', desc: 'Пополнение баланса', price: 'от 999 ₽', href: '/category/gift-cards' },
      { title: 'Apple Developer', desc: 'Аккаунт разработчика', price: 'от 6 990 ₽', icon: SvgIcons.apple, href: '/category/apple-developer' },
    ],
  },
  {
    id: 'steam-topup',
    title: 'Пополняй Стим',
    subtitle: 'Быстрое пополнение баланса Steam',
    emoji: '💰',
    gradient: 'linear-gradient(135deg, rgba(0,230,118,0.15), rgba(0,200,83,0.1))',
    accentColor: '#00E676',
    items: [
      { title: '100 ₽ на Steam', desc: 'Моментально', price: '115 ₽', icon: SvgIcons.steam, href: '/category/steam' },
      { title: '500 ₽ на Steam', desc: 'Самый популярный', price: '575 ₽', tag: 'Хит', icon: SvgIcons.steam, href: '/category/steam' },
      { title: '1 000 ₽ на Steam', desc: 'Выгодный вариант', price: '1 100 ₽', icon: SvgIcons.steam, href: '/category/steam' },
      { title: '5 000 ₽ на Steam', desc: 'Макс. экономия', price: '5 350 ₽', tag: 'Экономия', icon: SvgIcons.steam, href: '/category/steam' },
    ],
  },
];

const heroSlides = [
  { title: 'Цифровые товары', accent: 'мгновенно', desc: 'Telegram Stars, Premium, Steam ключи и подарочные карты', cta: 'Каталог товаров', href: '#catalog', gradient: 'radial-gradient(ellipse at 30% 50%, rgba(0,230,118,0.25), transparent 70%)' },
  { title: 'Discord Nitro', accent: 'от 299 ₽', desc: 'Basic и Full подписки по лучшим ценам. Моментальная активация', cta: 'Купить Nitro', href: '#catalog', gradient: 'radial-gradient(ellipse at 30% 50%, rgba(88,101,242,0.3), transparent 70%)' },
  { title: 'Telegram Stars', accent: 'за секунды', desc: 'Покупайте Stars для приложений, ботов и подарков в Telegram', cta: 'Купить Stars', href: '#catalog', gradient: 'radial-gradient(ellipse at 30% 50%, rgba(42,171,238,0.3), transparent 70%)' },
];

const navItems = [
  { label: 'Консоли и сервисы', sub: 'Подписки и оплата', icon: Icons.globe, href: '/category/services' },
  { label: 'Игровая валюта', sub: 'Моб. и ПК игры', icon: Icons.gamepad, href: '/category/game-currency' },
  { label: 'Покупай Гифт', sub: 'Steam подарки', icon: Icons.gift, href: '/category/steam-gifts' },
  { label: 'Покупай Ключи', sub: 'Карты и ваучеры', icon: Icons.key, href: '/category/keys-vouchers' },
  { label: 'Пополняй Стим', sub: 'Баланс Steam', icon: Icons.wallet, href: '/category/steam-topup' },
];

/* Premium SVG Step Icons */
const StepIcons = {
  cursor: (<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="gi1" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#00E676"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs><rect x="2" y="2" width="32" height="32" rx="10" fill="rgba(0,230,118,0.06)" stroke="url(#gi1)" strokeWidth="1.5"/><path d="M13 12l10 6-4 1.5L17.5 24 16 20.5l-3 1.5z" fill="url(#gi1)"/></svg>),
  card: (<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="gi2" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs><rect x="2" y="2" width="32" height="32" rx="10" fill="rgba(168,85,247,0.06)" stroke="url(#gi2)" strokeWidth="1.5"/><rect x="9" y="12" width="18" height="13" rx="2.5" stroke="url(#gi2)" strokeWidth="1.5"/><path d="M9 16.5h18" stroke="url(#gi2)" strokeWidth="1.5"/><path d="M13 21h5" stroke="url(#gi2)" strokeWidth="1.5" strokeLinecap="round"/></svg>),
  bolt: (<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="gi3" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#FBBF24"/><stop offset="1" stopColor="#F59E0B"/></linearGradient></defs><rect x="2" y="2" width="32" height="32" rx="10" fill="rgba(251,191,36,0.06)" stroke="url(#gi3)" strokeWidth="1.5"/><path d="M19 9l-7 10h5.5L16 27l8-11h-5.5L19 9z" fill="url(#gi3)"/></svg>),
  shield: (<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><defs><linearGradient id="gi4" x1="0" y1="0" x2="36" y2="36"><stop stopColor="#4DA6FF"/><stop offset="1" stopColor="#22D3EE"/></linearGradient></defs><rect x="2" y="2" width="32" height="32" rx="10" fill="rgba(77,166,255,0.06)" stroke="url(#gi4)" strokeWidth="1.5"/><path d="M18 10l-7 3.5v4c0 4.14 3.04 7.96 7 9 3.96-1.04 7-4.86 7-9v-4L18 10z" stroke="url(#gi4)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/><path d="M15 18.5l2 2 4-4" stroke="url(#gi4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

const steps = [
  { num: '01', title: 'Выберите товар', desc: 'Найдите нужный в каталоге или поиском', icon: StepIcons.cursor },
  { num: '02', title: 'Оплатите удобно', desc: 'Карта, СБП, Т-Банк — за секунды', icon: StepIcons.card },
  { num: '03', title: 'Получите мгновенно', desc: 'Автоматическая доставка на почту', icon: StepIcons.bolt },
  { num: '04', title: 'Поддержка 24/7', desc: 'Мы на связи в Telegram', icon: StepIcons.shield },
];

/* Live Purchase Feed Data */
const livePurchases = [
  { name: 'Анна М.', product: '500 Telegram Stars', time: '2 мин назад', avatar: 'А' },
  { name: 'Дмитрий К.', product: 'Telegram Premium 12 мес', time: '5 мин назад', avatar: 'Д' },
  { name: 'Максим Л.', product: 'Steam Gift Card $50', time: '8 мин назад', avatar: 'М' },
  { name: 'Елена С.', product: 'Discord Nitro Full', time: '12 мин назад', avatar: 'Е' },
  { name: 'Артём В.', product: '1000 Telegram Stars', time: '15 мин назад', avatar: 'А' },
  { name: 'Ольга Р.', product: 'Apple Developer Account', time: '18 мин назад', avatar: 'О' },
];

const reviews = [
  { name: 'Александр М.', text: 'Получил Stars за 10 секунд. Сервис — огонь! Рекомендую всем.', rating: 5, product: 'Telegram Stars', verified: true },
  { name: 'Марина К.', text: 'Premium по лучшей цене, уже третий раз продлеваю через BAZZAR.', rating: 5, product: 'Telegram Premium', verified: true },
  { name: 'Дмитрий С.', text: 'Ключ к игре пришёл моментально, всё работает отлично.', rating: 5, product: 'Steam', verified: true },
  { name: 'Анна В.', text: 'Подарила мужу подарочную карту — очень удобно и быстро!', rating: 5, product: 'Gift Cards', verified: true },
];

/* ═══════════════════════════════════════════════
   MAIN LANDING
   ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   PAYMENT MODAL — "Under Development"
   ═══════════════════════════════════════════════ */
function PaymentModal({ onClose }) {
  return (
    <motion.div className={styles.modalOverlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div className={styles.modalCard}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        <div className={styles.modalIcon}>
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="rgba(245,158,11,0.3)" strokeWidth="2" fill="rgba(245,158,11,0.04)"/>
            <path d="M32 18v20" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="32" cy="44" r="2" fill="#F59E0B"/>
          </svg>
        </div>
        <h3 className={styles.modalTitle}>Оплата на сайте</h3>
        <div className={styles.modalBadge}>
          <span className={styles.modalBadgeDot} />
          В разработке
        </div>
        <p className={styles.modalDesc}>
          Онлайн-оплата на сайте скоро будет доступна. Сейчас вы можете оформить заказ через Telegram — это быстро и безопасно.
        </p>
        <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.modalBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          Заказать в Telegram
        </a>
        <button onClick={onClose} className={styles.modalSecondary}>Закрыть</button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   LIVE PURCHASE FEED — Shows recent activity
   ═══════════════════════════════════════════════ */
function LivePurchaseFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrentIndex(p => (p + 1) % livePurchases.length), 4000);
    return () => clearInterval(t);
  }, []);
  const item = livePurchases[currentIndex];
  return (
    <div className={styles.liveFeed}>
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} className={styles.liveFeedItem}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <span className={styles.liveFeedDot} />
            <span className={styles.liveFeedAvatar}>{item.avatar}</span>
            <span className={styles.liveFeedText}>
              <strong>{item.name}</strong> купил(а) <strong>{item.product}</strong>
            </span>
            <span className={styles.liveFeedTime}>{item.time}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [activeAmount, setActiveAmount] = useState(2);
  const [heroIndex, setHeroIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', telegram: '', product: '', comment: '' });
  const [formSent, setFormSent] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [activeCatalogFilter, setActiveCatalogFilter] = useState(0);
  const [activeReviewFilter, setActiveReviewFilter] = useState(0);
  const { scrollYProgress } = useScroll();
  const headerBg = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  // Auto-slide hero
  useEffect(() => {
    const t = setInterval(() => setHeroIndex(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const amounts = [
    { label: '50 Stars', price: '65 ₽' },
    { label: '100 Stars', price: '120 ₽' },
    { label: '500 Stars', price: '550 ₽' },
    { label: '1000 Stars', price: '990 ₽' },
    { label: '5000 Stars', price: '4 500 ₽' },
  ];

  const tabs = ['Telegram Stars', 'Premium', 'Steam'];

  const handleSearch = (e) => { e.preventDefault(); if (searchQuery.trim()) router.push(`/delivery/${searchQuery.trim()}`); };
  const handleSubmit = async (e) => { e.preventDefault(); setFormSent(true); setTimeout(() => setFormSent(false), 5000); };

  const slide = heroSlides[heroIndex];

  return (
    <main className={styles.page}>
      <div className="app-bg" />

      {/* ═══ HEADER (kupikod-style with icons) ═══ */}
      <motion.header className={styles.header} style={{ '--hdr-bg': headerBg }}>
        <div className={`container ${styles.hdrInner}`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <svg width="24" height="24" viewBox="0 0 512 512" fill="none">
                <defs>
                  <linearGradient id="logoG" x1="0" y1="0" x2="512" y2="512">
                    <stop stopColor="#7B3FE4"/>
                    <stop offset="1" stopColor="#F97316"/>
                  </linearGradient>
                </defs>
                <rect width="512" height="512" rx="108" fill="url(#logoG)"/>
                <path d="M290 96L210 270h70L200 420l160-190h-80L350 96h-60z" fill="white"/>
              </svg>
            </span>
            <span className={styles.logoName}>BAZZAR</span>
          </Link>

          <nav className={styles.nav}>
            {navItems.map((item, i) => (
              <Link key={i} href={item.href} className={styles.navItem}>
                <span className={styles.navItemIcon}>{item.icon}</span>
                <div className={styles.navItemText}>
                  <span className={styles.navItemLabel}>{item.label}</span>
                  <span className={styles.navItemSub}>{item.sub}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className={styles.hdrRight}>
            <Link href="/account" className={styles.hdrAccount}>
              {Icons.user}
            </Link>
            <div className={styles.hdrBonus}>
              <span className={styles.hdrBonusBadge}>Б</span>
              <span>0</span>
            </div>

            <MobileMenu />
          </div>
        </div>
      </motion.header>

      {/* ═══ SEARCH BAR (sticky) ═══ */}
      <div className={styles.searchBar}>
        <div className={styles.searchOuter}>
          <form onSubmit={handleSearch} className={styles.searchField}>
            <span className={styles.searchIcon}>{Icons.search}</span>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Поиск товаров или введите код заказа..." className={styles.searchInput} />
          </form>
          <div className={styles.searchTags}>
            <span className={styles.searchTagLabel}>Популярные:</span>
            {['Сервисы', 'Игровая валюта', 'Steam Gift', 'Ключи', 'Пополнение Steam'].map(tag => (
              <button key={tag} className={styles.searchTag} onClick={() => { setSearchQuery(tag); const el = document.getElementById('services'); el && el.scrollIntoView({ behavior: 'smooth' }); }}>{tag}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ HERO — Auto-sliding banners + Quick widget ═══ */}
      <section className={styles.hero}>
        {/* Animated gradient orbs for living background */}
        <div className={styles.heroOrbs}>
          <div className={`${styles.heroOrb} ${styles.heroOrb1}`} />
          <div className={`${styles.heroOrb} ${styles.heroOrb2}`} />
          <div className={`${styles.heroOrb} ${styles.heroOrb3}`} />
        </div>
        <div className="container">
          <div className={styles.heroInner}>
            {/* Left — auto-slider */}
            <motion.div className={styles.heroBanner} key={heroIndex}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            >
              <div className={styles.heroBannerBg} style={{ background: slide.gradient }} />
              <div className={styles.heroBannerOverlay} />
              <div className={styles.heroSliderDots}>
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setHeroIndex(i)} className={`${styles.heroDot} ${i === heroIndex ? styles.heroDotActive : ''}`} />
                ))}
              </div>
              <div className={styles.heroBannerContent}>
                <h1 className={styles.heroBannerTitle}>
                  {slide.title}<br/>
                  <span className="gradient-text">{slide.accent}</span>
                </h1>
                <p className={styles.heroBannerDesc}>{slide.desc}</p>
                <div className={styles.heroBannerActions}>
                  <Link href={slide.href} className={styles.heroBannerBtn}>
                    {slide.cta} {Icons.arrow}
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right — quick purchase widget */}
            <div className={styles.heroWidget}>
              <div className={styles.heroWidgetTabs}>
                {tabs.map((tab, i) => (
                  <button key={i} onClick={() => setActiveTab(i)} className={`${styles.heroWidgetTab} ${activeTab === i ? styles.heroWidgetTabActive : ''}`}>{tab}</button>
                ))}
              </div>
              <div className={styles.heroWidgetMain}>
                <h2 className={styles.heroWidgetTitle}>
                  {activeTab === 0 ? 'Купить Stars' : activeTab === 1 ? 'Telegram Premium' : 'Пополнить Steam'}
                </h2>
                <div className={styles.heroWidgetField}>
                  <input type="text" className={styles.heroWidgetInput} placeholder={activeTab === 2 ? 'Логин Steam' : 'Username в Telegram'} />
                </div>
                <div className={styles.heroWidgetAmounts}>
                  {amounts.map((a, i) => (
                    <button key={i} onClick={() => setActiveAmount(i)} className={`${styles.heroWidgetAmount} ${activeAmount === i ? styles.heroWidgetAmountActive : ''}`}>{a.label}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ color: 'var(--text-400)', fontSize: 13 }}>Итого</span>
                  <span style={{ color: 'var(--text-white)', fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)' }}>{amounts[activeAmount].price}</span>
                </div>
                <button className={styles.heroWidgetCta} onClick={() => setShowPayModal(true)}>Оплатить {amounts[activeAmount].price}</button>
                <div className={styles.heroWidgetPayments}>
                  <span className={styles.heroWidgetPayLabel}>Принимаем:</span>
                  <div className={styles.heroWidgetPayIcons}>
                    <span className={styles.payIcon}>VISA</span>
                    <span className={styles.payIcon}>MC</span>
                    <span className={styles.payIcon}>МИР</span>
                    <span className={styles.payIcon}>СБП</span>
                    <span className={styles.payIcon}>Т-Банк</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIVE PURCHASE FEED ═══ */}
      <LivePurchaseFeed />

      {/* ═══ THEMED CATEGORY SECTIONS ═══ */}
      {themeSections.map((section, sIdx) => (
        <Reveal key={section.id} className={styles.section} id={section.id}>
          <div className="container">
            <div className={styles.themeSection}>
              {/* Section header with gradient accent */}
              <div className={styles.themeSectionGlow} style={{ background: section.gradient }} />
              <div className={styles.themeSectionHead}>
                <div className={styles.themeSectionTitle}>
                  <span className={styles.themeSectionEmoji}>{section.emoji}</span>
                  <div>
                    <h2 className={styles.themeSectionH2}>{section.title}</h2>
                    <p className={styles.themeSectionSub}>{section.subtitle}</p>
                  </div>
                </div>
                <Link href={`/category/${section.id}`} className={styles.themeSectionMore} style={{ '--accent': section.accentColor }}>
                  Смотреть все {Icons.chevronRight}
                </Link>
              </div>

              {/* Items grid */}
              <div className={styles.themeItemsGrid}>
                {section.items.map((item, i) => (
                  <Link key={i} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <motion.div className={styles.themeItem}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      whileHover={{ y: -4, borderColor: `${section.accentColor}33` }}
                      style={{ '--item-accent': section.accentColor }}
                    >
                      {/* Icon or fallback */}
                      <div className={styles.themeItemIcon}>
                        {item.icon ? item.icon(36) : <span className={styles.themeItemIconFallback}>{section.emoji}</span>}
                      </div>

                      {/* Info */}
                      <div className={styles.themeItemInfo}>
                        <div className={styles.themeItemName}>{item.title}</div>
                        <div className={styles.themeItemDesc}>{item.desc}</div>
                      </div>

                      {/* Price + badges */}
                      <div className={styles.themeItemRight}>
                        <div className={styles.themeItemPrice}>
                          {item.price}
                          {item.oldPrice && <span className={styles.themeItemOldPrice}>{item.oldPrice}</span>}
                        </div>
                        {item.discount && <span className={styles.themeItemDiscount}>{item.discount}</span>}
                        {item.tag && !item.discount && (
                          <span className={styles.themeItemTag} style={{
                            background: item.tag === 'Хит' ? 'rgba(255,30,86,0.12)' : item.tag === 'Новинка' ? 'rgba(42,171,238,0.12)' : item.tag === 'Популярное' ? 'rgba(168,85,247,0.12)' : 'rgba(0,230,118,0.12)',
                            color: item.tag === 'Хит' ? '#FF1E56' : item.tag === 'Новинка' ? '#2AABEE' : item.tag === 'Популярное' ? '#A855F7' : '#00E676',
                            borderColor: item.tag === 'Хит' ? 'rgba(255,30,86,0.2)' : item.tag === 'Новинка' ? 'rgba(42,171,238,0.2)' : item.tag === 'Популярное' ? 'rgba(168,85,247,0.2)' : 'rgba(0,230,118,0.2)',
                          }}>{item.tag}</span>
                        )}
                      </div>

                      {/* Hover arrow */}
                      <div className={styles.themeItemArrow}>{Icons.chevronRight}</div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}

      {/* ═══ MARQUEE ═══ */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...Array(3)].flatMap((_, k) => [
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tBolt" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#00E676"/><stop offset="1" stopColor="#00C853"/></linearGradient></defs><path d="M13 2L4.09 12.62a1 1 0 00.77 1.64H11v6.74a.5.5 0 00.9.3L20.91 11.38a1 1 0 00-.77-1.64H13V3.26a.5.5 0 00-.9-.3z" fill="url(#tBolt)"/></svg>, text: 'Моментальная доставка' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tLock" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#00E676"/><stop offset="1" stopColor="#4CAF50"/></linearGradient></defs><rect x="3" y="11" width="18" height="11" rx="2" fill="url(#tLock)"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="url(#tLock)" strokeWidth="2" fill="none"/></svg>, text: '100% гарантия' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tDia" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#7C3AED"/></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#tDia)"/></svg>, text: 'Premium качество' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tRocket" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#42A5F5"/><stop offset="1" stopColor="#5865F2"/></linearGradient></defs><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11.95A22 22 0 0112 15z" fill="url(#tRocket)"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3" stroke="url(#tRocket)" strokeWidth="1.5" fill="none"/></svg>, text: '24/7 поддержка' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tTag" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#FFD600"/><stop offset="1" stopColor="#FFA000"/></linearGradient></defs><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="url(#tTag)"/><circle cx="7" cy="7" r="1.5" fill="#000"/></svg>, text: 'Лучшие цены' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tStar" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#FFD600"/><stop offset="1" stopColor="#FF9100"/></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#tStar)"/></svg>, text: '2500+ товаров' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tGift" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#FF1E56"/><stop offset="1" stopColor="#FF6090"/></linearGradient></defs><rect x="3" y="8" width="18" height="13" rx="2" fill="url(#tGift)"/><path d="M12 8v13M3 12h18" stroke="#000" strokeWidth="1.5" opacity="0.2"/><path d="M12 8a4 4 0 00-4-4c-1.1 0-2 .9-2 2s3 2 6 2a4 4 0 014-4c1.1 0 2 .9 2 2s-3 2-6 2" stroke="url(#tGift)" strokeWidth="2" fill="none"/></svg>, text: 'Бонусная программа' },
            { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tCard" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#26C6DA"/><stop offset="1" stopColor="#00ACC1"/></linearGradient></defs><rect x="1" y="4" width="22" height="16" rx="3" fill="url(#tCard)"/><rect x="1" y="8" width="22" height="4" fill="#000" opacity="0.2"/></svg>, text: 'Удобная оплата' },
          ].map((item, i) => <span key={`${k}-${i}`} className={styles.tickerItem}><span className={styles.tickerIcon}>{item.icon}</span>{item.text}</span>))}
        </div>
      </div>

      {/* ═══ 3D PROMO BANNER (kupikod big green) ═══ */}
      <Reveal className={styles.section}>
        <div className="container">
          <div className={styles.promoBanner3d}>
            <div className={styles.promo3dBg} />
            <div className={styles.promo3dContent}>
              <h2 className={styles.promo3dTitle}>
                Маркетплейс цифровых<br/>товаров <span className="gradient-text">BAZZAR</span>
              </h2>
              <p className={styles.promo3dDesc}>
                Более 2 500 товаров. Моментальная доставка. Лучшие цены на рынке. Кэшбэк с каждой покупки.
              </p>
              <div className={styles.promo3dStats}>
                <div className={styles.promo3dStat}>
                  <span className={styles.promo3dStatNum}><Counter end={2500} suffix="+" /></span>
                  <span className={styles.promo3dStatLabel}>Товаров</span>
                </div>
                <div className={styles.promo3dStat}>
                  <span className={styles.promo3dStatNum}><Counter end={15000} suffix="+" /></span>
                  <span className={styles.promo3dStatLabel}>Клиентов</span>
                </div>
                <div className={styles.promo3dStat}>
                  <span className={styles.promo3dStatNum}><Counter end={99} suffix="%" /></span>
                  <span className={styles.promo3dStatLabel}>Довольных</span>
                </div>
              </div>
              <Link href="#catalog" className={styles.heroBannerBtn}>Перейти в каталог {Icons.arrow}</Link>
            </div>
            {/* 3D Objects visual */}
            <div className={styles.promo3dVisual}>
              <motion.div className={styles.promo3dFloat} animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                {SvgIcons.telegram(80)}
              </motion.div>
              <motion.div className={styles.promo3dFloat} style={{ top: '20%', right: '15%' }} animate={{ y: [0, 12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                {SvgIcons.steam(64)}
              </motion.div>
              <motion.div className={styles.promo3dFloat} style={{ bottom: '20%', right: '25%' }} animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                {SvgIcons.discord(56)}
              </motion.div>
              <motion.div className={styles.promo3dFloat} style={{ top: '60%', right: '5%' }} animate={{ y: [0, 8, 0], rotate: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
                {SvgIcons.playstation(48)}
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══ BENTO PROMO (cashback + bonus) ═══ */}
      <Reveal className={styles.section}>
        <div className="container">
          <div className={styles.bentoPromo}>
            <TiltCard className={styles.bentoPromoCard}>
              <div className={styles.bentoPromoCardBg} style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,230,118,0.2), transparent 60%)' }} />
              <h3 className={styles.bentoPromoTitle}>Покупай напрямую —<br/><span className="gradient-text">экономь до 20%</span></h3>
              <p className={styles.bentoPromoDesc}>Без комиссий маркетплейсов. Те же товары, та же скорость, но значительно дешевле.</p>
              <Link href="#direct" className={styles.bentoPromoBtn}>Выбрать товар</Link>
            </TiltCard>
            <TiltCard className={styles.bentoPromoCard}>
              <div className={styles.bentoPromoCardBg} style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.15), transparent 60%)' }} />
              <h3 className={styles.bentoPromoTitle}>Бонусная программа</h3>
              <p className={styles.bentoPromoDesc}>Кэшбэк с каждой покупки. Накапливайте бонусы и оплачивайте ими следующие заказы.</p>
              <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.bentoPromoLink}>
                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{marginRight:'6px',verticalAlign:'middle'}}><defs><linearGradient id="giftCta" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#FF1E56"/><stop offset="1" stopColor="#FF6090"/></linearGradient></defs><rect x="3" y="8" width="18" height="13" rx="2" fill="url(#giftCta)"/><path d="M12 8v13M3 12h18" stroke="#000" strokeWidth="1.5" opacity="0.15"/><path d="M12 8a4 4 0 00-4-4c-1.1 0-2 .9-2 2s3 2 6 2a4 4 0 014-4c1.1 0 2 .9 2 2s-3 2-6 2" stroke="url(#giftCta)" strokeWidth="2" fill="none"/></svg> Узнать подробнее</span>{Icons.chevronRight}
              </a>
            </TiltCard>
          </div>
        </div>
      </Reveal>

      {/* ═══ PROCESS ═══ */}
      <Reveal className={styles.section} id="process">
        <div className="container">
          <div className={styles.sectionBlock}>
            <div className={styles.secHead}><h2 className={styles.secH2}>Как это работает</h2></div>
            <div className={styles.processGrid}>
              {steps.map((step, i) => (
                <TiltCard key={i} className={styles.processCard}>
                  <span className={styles.processNum}>{step.num}</span>
                  <div className={styles.processEmoji}>{step.icon}</div>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══ REVIEWS ═══ */}
      <Reveal className={styles.section} id="reviews">
        <div className="container">
          <div className={styles.sectionBlock}>
            <div className={styles.secHead}>
              <h2 className={styles.secH2}>Отзывы клиентов</h2>
              <div className={styles.secFilters}>
                {['Все', 'Telegram', 'Steam', 'Другое'].map((f, i) => (
                  <button key={i} onClick={() => setActiveReviewFilter(i)} className={`${styles.secFilter} ${activeReviewFilter === i ? styles.secFilterActive : ''}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className={styles.reviewGrid}>
              {reviews.map((r, i) => (
                <TiltCard key={i} className={styles.reviewCard}>
                  <div className={styles.reviewStars}>{'★'.repeat(r.rating)}</div>
                  <p className={styles.reviewText}>«{r.text}»</p>
                  <div className={styles.reviewAuthor}>
                    <div className={styles.reviewAva}>{r.name[0]}</div>
                    <div>
                      <span className={styles.reviewName}>{r.name} {r.verified && <span className={styles.reviewVerified}>✓</span>}</span>
                      <span className={styles.reviewProd}>{r.product}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══ DIRECT BUY ═══ */}
      <Reveal className={styles.section} id="direct">
        <div className="container">
          <div className={styles.sectionBlock}>
            <div className={styles.directBox}>
              <div className={styles.directGlow} />
              <div className={styles.directInner}>
                <h2 className={styles.directH2}>Дешевле на <span className="gradient-text">20%</span></h2>
                <p className={styles.directP}>Нет комиссий площадок. Те же товары, та же скорость, но выгоднее.</p>
                <div className={styles.priceRow}>
                  <div className={styles.priceOld}>
                    <span className={styles.priceLabel}>Маркетплейс</span>
                    <span className={styles.priceVal} style={{ color: 'var(--red)', textDecoration: 'line-through' }}>₽100</span>
                  </div>
                  <div className={styles.priceArr}>→</div>
                  <div className={styles.priceNew}>
                    <span className={styles.priceLabel}>BAZZAR</span>
                    <span className={styles.priceVal} style={{ color: 'var(--green)' }}>₽80</span>
                    <span className={styles.priceSave}>−20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══ TRUST BLOCK ═══ */}
      <Reveal className={styles.section}>
        <div className="container">
          <div className={styles.trustBlock}>
            <div className={styles.trustLeft}>
              <h2 className={styles.trustH2}>Присоединяйтесь к<br/><span className="gradient-text">BAZZAR</span></h2>
              <p className={styles.trustDesc}>Тысячи пользователей уже экономят с нами на цифровых товарах</p>
              <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.heroBannerBtn}>Начать покупки {Icons.arrow}</a>
            </div>
            <div className={styles.trustStats}>
              {[
                { num: 15000, suffix: '+', label: 'Клиентов', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tsU" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#00E676"/><stop offset="1" stopColor="#00C853"/></linearGradient></defs><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="url(#tsU)" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke="url(#tsU)" strokeWidth="2"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="url(#tsU)" strokeWidth="2"/></svg> },
                { num: 50000, suffix: '+', label: 'Заказов', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tsB" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#7C3AED"/></linearGradient></defs><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="url(#tsB)" strokeWidth="2"/></svg> },
                { num: 4.9, suffix: '', label: 'Рейтинг', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tsS" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#FFD600"/><stop offset="1" stopColor="#FFA000"/></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#tsS)"/></svg> },
                { num: 24, suffix: '/7', label: 'Поддержка', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="tsH" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#42A5F5"/><stop offset="1" stopColor="#5865F2"/></linearGradient></defs><path d="M3 18v-6a9 9 0 0118 0v6" stroke="url(#tsH)" strokeWidth="2"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" fill="url(#tsH)"/></svg> },
              ].map((s, i) => (
                <motion.div key={i} className={styles.trustStatCard}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <span className={styles.trustStatIcon}>{s.icon}</span>
                  <span className={styles.trustStatNum}>
                    {s.label === 'Рейтинг' ? `${s.num}${s.suffix}` : <Counter end={s.num} suffix={s.suffix} />}
                  </span>
                  <span className={styles.trustStatLabel}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ═══ REQUEST FORM ═══ */}
      <Reveal className={styles.section}>
        <div className="container">
          <div className={styles.sectionBlock} style={{ textAlign: 'center' }}>
            <div className={styles.secHead} style={{ justifyContent: 'center', marginBottom: 8 }}>
              <h2 className={styles.secH2}>Оставить заявку</h2>
            </div>
            <p className={styles.secP} style={{ margin: '0 auto 28px', textAlign: 'center' }}>Заполните форму — мы предложим лучшую цену в Telegram</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {formSent ? (
                  <motion.div className={styles.formOk} key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <div style={{ marginBottom: 12 }}><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="26" stroke="var(--green)" strokeWidth="2" fill="rgba(0,230,118,0.06)"/><path d="M18 28l6 6 14-14" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <h3 style={{ color: 'var(--green)', fontSize: 20, fontWeight: 700 }}>Заявка отправлена!</h3>
                    <p style={{ color: 'var(--text-300)', fontSize: 14, marginTop: 8 }}>Мы свяжемся с вами в Telegram</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className={styles.formRow}>
                      <div className={styles.field}>
                        <label>Имя</label>
                        <input className="input" placeholder="Иван" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                      </div>
                      <div className={styles.field}>
                        <label>Telegram</label>
                        <input className="input" placeholder="@username" value={formData.telegram} onChange={e => setFormData({...formData, telegram: e.target.value})} required />
                      </div>
                    </div>
                    <div className={styles.field} style={{ marginTop: 14 }}>
                      <label>Товар</label>
                      <input className="input" placeholder="Например: 500 Telegram Stars" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} required />
                    </div>
                    <div className={styles.field} style={{ marginTop: 14 }}>
                      <label>Комментарий <span style={{ color: 'var(--text-500)' }}>(опционально)</span></label>
                      <textarea className="input" rows={3} placeholder="..." value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} style={{ resize: 'vertical', minHeight: 70 }} />
                    </div>
                    <motion.button type="submit" className={styles.formBtn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Отправить заявку {Icons.arrow}</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </Reveal>

      {/* ═══ PREMIUM FOOTER ═══ */}
      <footer className={styles.footer}>
        <div className={styles.footDivider} />
        <div className={`container ${styles.footGrid}`}>
          {/* Column 1: Brand */}
          <div className={styles.footCol}>
            <div className={styles.footBrand}>
              <span className={styles.logoIcon}>
                <svg width="24" height="24" viewBox="0 0 512 512" fill="none">
                  <defs>
                    <linearGradient id="footLogoG" x1="0" y1="0" x2="512" y2="512">
                      <stop stopColor="#7B3FE4"/>
                      <stop offset="1" stopColor="#F97316"/>
                    </linearGradient>
                  </defs>
                  <rect width="512" height="512" rx="108" fill="url(#footLogoG)"/>
                  <path d="M290 96L210 270h70L200 420l160-190h-80L350 96h-60z" fill="white"/>
                </svg>
              </span>
              <span className={styles.logoName}>BAZZAR</span>
            </div>
            <p className={styles.footBrandDesc}>Маркетплейс цифровых товаров. Мгновенная доставка 24/7.</p>
            <div className={styles.footSocials}>
              <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.footSocial}>{Icons.telegram}</a>
            </div>
          </div>

          {/* Column 2: Catalog */}
          <div className={styles.footCol}>
            <h4 className={styles.footColTitle}>Каталог</h4>
            <Link href="/category/telegram-stars" className={styles.footLink}>Telegram Stars</Link>
            <Link href="/category/telegram-premium" className={styles.footLink}>Telegram Premium</Link>
            <Link href="/category/steam" className={styles.footLink}>Steam</Link>
            <Link href="/category/discord-nitro" className={styles.footLink}>Discord Nitro</Link>
            <Link href="/category/gift-cards" className={styles.footLink}>Подарочные карты</Link>
          </div>

          {/* Column 3: Account */}
          <div className={styles.footCol}>
            <h4 className={styles.footColTitle}>Покупателям</h4>
            <Link href="/account" className={styles.footLink}>Личный кабинет</Link>
            <Link href="#process" className={styles.footLink}>Как это работает</Link>
            <Link href="#reviews" className={styles.footLink}>Отзывы</Link>
            <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.footLink}>Поддержка 24/7</a>
          </div>

          {/* Column 4: Contacts */}
          <div className={styles.footCol}>
            <h4 className={styles.footColTitle}>Контакты</h4>
            <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.footLink}>Telegram поддержка</a>
            <a href="mailto:support@bazzar-market.ru" className={styles.footLink}>support@bazzar-market.ru</a>
            <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.footLink}>B2B сотрудничество</a>
          </div>
        </div>

        {/* Payment methods row */}
        <div className={`container ${styles.footPayRow}`}>
          <div className={styles.footPayIcons}>
            <span className={styles.footPayBadge}>VISA</span>
            <span className={styles.footPayBadge}>Mastercard</span>
            <span className={styles.footPayBadge}>МИР</span>
            <span className={styles.footPayBadge}>СБП</span>
            <span className={styles.footPayBadge}>Т-Банк</span>
            <span className={styles.footPayBadge}>Apple Pay</span>
          </div>
        </div>

        <div className={`container ${styles.footBottom}`}>
          <p className={styles.footCopy}>© {new Date().getFullYear()} BAZZAR Market · ИП Базаров · bazzar-market.ru</p>
          <div className={styles.footBottomLinks}>
            <Link href="/offer">Оферта</Link>
            <Link href="/privacy">Политика конфиденциальности</Link>
          </div>
        </div>
      </footer>
      {/* Payment Modal */}
      <AnimatePresence>
        {showPayModal && <PaymentModal onClose={() => setShowPayModal(false)} />}
      </AnimatePresence>
    </main>
  );
}
