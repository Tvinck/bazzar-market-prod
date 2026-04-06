'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import styles from './auth.module.css';

export default function AuthPage() {
  const router = useRouter();
  const { user, loading, signIn, signUp } = useAuth();

  const [mode, setMode] = useState('login'); // login | register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/account');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      if (mode === 'register') {
        if (password.length < 6) {
          throw new Error('Пароль должен быть не менее 6 символов');
        }
        await signUp(email, password, name);
        setSuccess('Аккаунт создан! Проверьте почту для подтверждения.');
      } else {
        await signIn(email, password);
        router.push('/account');
      }
    } catch (err) {
      const msg = err.message || 'Произошла ошибка';
      if (msg.includes('Invalid login')) setError('Неверный email или пароль');
      else if (msg.includes('already registered')) setError('Этот email уже зарегистрирован');
      else if (msg.includes('Email not confirmed')) setError('Подтвердите email перед входом');
      else setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className="app-bg" />
        <div className={styles.loader}>
          <div className={styles.spinner} />
        </div>
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
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.bgGlow} />

        <motion.div className={styles.card}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative top */}
          <div className={styles.cardTop}>
            <motion.div className={styles.authIcon}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              {mode === 'login' ? '🔐' : '✨'}
            </motion.div>
          </div>

          {/* Mode tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
              onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            >
              Вход
            </button>
            <button
              className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
              onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            >
              Регистрация
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              className={styles.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
              transition={{ duration: 0.25 }}
            >
              {mode === 'register' && (
                <div className={styles.field}>
                  <label className={styles.label}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className={styles.input}
                    autoComplete="name"
                  />
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={styles.input}
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  Пароль
                </label>
                <div className={styles.passwordWrap}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'register' ? 'Минимум 6 символов' : '••••••••'}
                    className={styles.input}
                    required
                    minLength={6}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  />
                  <button type="button" className={styles.showPwd} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error / Success */}
              {error && (
                <motion.div className={styles.error} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div className={styles.success} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  {success}
                </motion.div>
              )}

              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? (
                  <div className={styles.btnSpinner} />
                ) : (
                  mode === 'login' ? 'Войти' : 'Создать аккаунт'
                )}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Footer */}
          <div className={styles.cardFooter}>
            <Link href="/" className={styles.footerLink}>← На главную</Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
