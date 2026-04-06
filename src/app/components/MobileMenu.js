'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './MobileMenu.module.css';

const menuLinks = [
  {
    label: 'Каталог',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2"/></svg>,
    href: '#catalog',
  },
  {
    label: 'Как это работает',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    href: '#process',
  },
  {
    label: 'Отзывы',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>,
    href: '#reviews',
  },
  {
    label: 'Прямая покупка',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18" stroke="currentColor" strokeWidth="2"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2"/></svg>,
    href: '#direct',
  },
];

const categoryLinks = [
  { label: 'Telegram Stars', href: '/category/telegram-stars', color: '#2AABEE' },
  { label: 'Telegram Premium', href: '/category/telegram-premium', color: '#7B68EE' },
  { label: 'Steam', href: '/category/steam', color: '#66C0F4' },
  { label: 'Discord Nitro', href: '/category/discord-nitro', color: '#5865F2' },
  { label: 'Подарочные карты', href: '/category/gift-cards', color: '#F59E0B' },
  { label: 'Общие аккаунты', href: '/category/shared-accounts', color: '#10B981' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Меню"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Panel */}
            <motion.nav
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              {/* Header */}
              <div className={styles.drawerHeader}>
                <div className={styles.drawerBrand}>
                  <span className={styles.drawerLogo}>
                    <svg width="22" height="22" viewBox="0 0 512 512" fill="none">
                      <defs>
                        <linearGradient id="drawerLogoG" x1="0" y1="0" x2="512" y2="512">
                          <stop stopColor="#7B3FE4"/>
                          <stop offset="1" stopColor="#F97316"/>
                        </linearGradient>
                      </defs>
                      <rect width="512" height="512" rx="108" fill="url(#drawerLogoG)"/>
                      <path d="M290 96L210 270h70L200 420l160-190h-80L350 96h-60z" fill="white"/>
                    </svg>
                  </span>
                  <span className={styles.drawerTitle}>BAZZAR</span>
                </div>
                <button className={styles.closeBtn} onClick={close} aria-label="Закрыть">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <div className={styles.drawerContent}>
                <div className={styles.sectionLabel}>Навигация</div>
                {menuLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    className={styles.navItem}
                    onClick={close}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <span className={styles.navIcon}>{link.icon}</span>
                    <span>{link.label}</span>
                    <svg className={styles.navArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  </motion.a>
                ))}

                <div className={styles.divider} />

                <div className={styles.sectionLabel}>Категории</div>
                <div className={styles.categoryGrid}>
                  {categoryLinks.map((cat, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.03 }}
                    >
                      <Link href={cat.href} className={styles.categoryChip} onClick={close}>
                        <span className={styles.categoryDot} style={{ background: cat.color }} />
                        {cat.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.divider} />

                {/* Account + Support */}
                <Link href="/account" className={styles.navItem} onClick={close}>
                  <span className={styles.navIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <span>Личный кабинет</span>
                  <svg className={styles.navArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </Link>

                <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.navItem} onClick={close}>
                  <span className={styles.navIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" fill="currentColor"/></svg>
                  </span>
                  <span>Поддержка 24/7</span>
                  <svg className={styles.navArrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </a>
              </div>

              {/* Footer CTA */}
              <div className={styles.drawerFooter}>
                <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.ctaBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                  Купить в Telegram
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
