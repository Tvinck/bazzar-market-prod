'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('bazzar_cookie_consent')) {
        setVisible(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem('bazzar_cookie_consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className={styles.overlay}
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
        >
          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="cookieGrad" x1="0" y1="0" x2="24" y2="24">
                    <stop stopColor="#7B3FE4"/>
                    <stop offset="1" stopColor="#F97316"/>
                  </linearGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#cookieGrad)"/>
                <path d="M14 3L10 12h5L9 21l8-10h-5L16 3h-2z" fill="white"/>
              </svg>
            </div>
            <div className={styles.text}>
              <p className={styles.title}>Мы используем cookie</p>
              <p className={styles.desc}>
                Для персонализации и улучшения работы сайта. Продолжая, вы соглашаетесь с{' '}
                <a href="/privacy">политикой конфиденциальности</a>.
              </p>
            </div>
            <div className={styles.actions}>
              <button className={styles.btnAccept} onClick={accept}>
                Принять
              </button>
              <button className={styles.btnSettings} onClick={accept}>
                Только необходимые
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
