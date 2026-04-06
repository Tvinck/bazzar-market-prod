'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './account.module.css';

export default function AccountPage() {
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
          <Link href="/" className={styles.backBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            На главную
          </Link>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.bgGlow} />

        <motion.div className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* User avatar placeholder */}
          <div className={styles.avatarSection}>
            <motion.div className={styles.avatar}
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="18" r="8" stroke="rgba(0,230,118,0.5)" strokeWidth="2" fill="none"/>
                <path d="M8 42c0-8.84 7.16-16 16-16s16 7.16 16 16" stroke="rgba(0,230,118,0.5)" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </motion.div>

            {/* Lock icon badge */}
            <motion.div className={styles.lockBadge}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </motion.div>
          </div>

          <h1 className={styles.title}>Личный кабинет</h1>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            В разработке
          </div>
          <p className={styles.desc}>
            Мы создаём удобный личный кабинет с историей заказов, бонусной программой и управлением подписками. Скоро здесь!
          </p>

          {/* Preview features grid */}
          <div className={styles.featuresGrid}>
            {[
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="aClip" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#00E676"/><stop offset="1" stopColor="#00C853"/></linearGradient></defs><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="url(#aClip)" strokeWidth="2"/><rect x="9" y="3" width="6" height="4" rx="1" stroke="url(#aClip)" strokeWidth="2"/><path d="M9 14l2 2 4-4" stroke="url(#aClip)" strokeWidth="2"/></svg>, title: 'История заказов', desc: 'Все покупки в одном месте' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="aCoin" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#FBBF24"/><stop offset="1" stopColor="#D97706"/></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#aCoin)" strokeWidth="2"/><path d="M12 6v12M8 10c0-1.66 1.34-2 4-2s4 .34 4 2-1.34 2-4 2-4 .34-4 2 1.34 2 4 2 4-.34 4-2" stroke="url(#aCoin)" strokeWidth="2"/></svg>, title: 'Бонусный баланс', desc: 'Кэшбэк с каждой покупки' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="aBell" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#7C3AED"/></linearGradient></defs><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z" stroke="url(#aBell)" strokeWidth="2"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="url(#aBell)" strokeWidth="2"/></svg>, title: 'Уведомления', desc: 'Статус заказа в реальном времени' },
              { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="aGear" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#42A5F5"/><stop offset="1" stopColor="#1E88E5"/></linearGradient></defs><circle cx="12" cy="12" r="3" stroke="url(#aGear)" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="url(#aGear)" strokeWidth="2"/></svg>, title: 'Настройки', desc: 'Управление аккаунтом' },
            ].map((feat, i) => (
              <motion.div key={i} className={styles.featureCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <span className={styles.featureIcon}>{feat.icon}</span>
                <span className={styles.featureTitle}>{feat.title}</span>
                <span className={styles.featureDesc}>{feat.desc}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress indicator */}
          <motion.div className={styles.progressSection}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          >
            <div className={styles.progressLabel}>
              <span>Прогресс разработки</span>
              <span className={styles.progressPercent}>40%</span>
            </div>
            <div className={styles.progressTrack}>
              <motion.div className={styles.progressBar}
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>

          {/* Actions */}
          <div className={styles.actions}>
            <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.btnPrimary}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5zm3.48 5.1c-.11 1.19-.6 4.07-.85 5.39-.1.56-.31.75-.51.77-.44.04-.77-.29-1.19-.56-.66-.44-1.04-.71-1.67-1.13-.74-.49-.26-.76.16-1.19.11-.11 2.03-1.86 2.07-2.02a.15.15 0 00-.04-.13c-.04-.04-.11-.02-.16-.01-.07.01-1.12.71-3.17 2.09-.3.2-.57.31-.81.3-.27-.01-.78-.15-1.16-.28-.47-.15-.84-.23-.81-.5.01-.13.2-.27.55-.41 2.19-.95 3.65-1.58 4.37-1.88 2.09-.87 2.51-1.02 2.8-1.02.06 0 .2.01.29.09.08.06.1.14.11.2-.01.05.01.18 0 .29z"/>
              </svg>
              Узнать о запуске
            </a>
            <Link href="/" className={styles.btnGlass}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              В каталог
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
