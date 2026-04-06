'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className="app-bg" />

      <div className={styles.container}>
        {/* Floating background shapes — brand colors */}
        <div className={styles.bgShapes}>
          <motion.div className={styles.shape1} animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className={styles.shape2} animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.div className={styles.shape3} animate={{ y: [0, -12, 0], x: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        </div>

        {/* Main 404 content */}
        <motion.div className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Упс! Страница не найдена</h2>
          <p className={styles.desc}>
            К сожалению, эта страница не существует или была перемещена. Вернитесь на главную или свяжитесь с поддержкой.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.btnPrimary}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2.25 6.75L9 1.5L15.75 6.75V15C15.75 15.4 15.59 15.78 15.31 16.06C15.03 16.34 14.65 16.5 14.25 16.5H3.75C3.35 16.5 2.97 16.34 2.69 16.06C2.41 15.78 2.25 15.4 2.25 15V6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.75 16.5V9H11.25V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              На главную
            </Link>
            <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.btnGlass}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5S13.14 1.5 9 1.5zm3.48 5.1c-.11 1.19-.6 4.07-.85 5.39-.1.56-.31.75-.51.77-.44.04-.77-.29-1.19-.56-.66-.44-1.04-.71-1.67-1.13-.74-.49-.26-.76.16-1.19.11-.11 2.03-1.86 2.07-2.02a.15.15 0 00-.04-.13c-.04-.04-.11-.02-.16-.01-.07.01-1.12.71-3.17 2.09-.3.2-.57.31-.81.3-.27-.01-.78-.15-1.16-.28-.47-.15-.84-.23-.81-.5.01-.13.2-.27.55-.41 2.19-.95 3.65-1.58 4.37-1.88 2.09-.87 2.51-1.02 2.8-1.02.06 0 .2.01.29.09.08.06.1.14.11.2-.01.05.01.18 0 .29z"/>
              </svg>
              Поддержка
            </a>
          </div>
        </motion.div>

        {/* Bottom hint */}
        <motion.p className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          BAZZAR Market · bazzar-market.ru
        </motion.p>
      </div>
    </main>
  );
}
