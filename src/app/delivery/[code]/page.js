'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { getProductConfig } from '../../../lib/constants';
import {
  CheckCircleIcon, StarIcon, DiamondIcon, GamepadIcon, GiftIcon,
  TelegramIcon, CopyIcon, RocketIcon,
} from '../../../components/icons/AnimatedIcons';
import styles from './delivery.module.css';

/* ─── Marketplace Logos (SVG inline) ─── */
const MarketplaceLogo = ({ platform }) => {
  const logos = {
    'Яндекс Маркет': (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" rx="4" fill="#FC3F1D"/>
        <path d="M11.5 15h-1.7V7.2c-.9 0-2.1.7-2.1 2.3 0 1.4.7 2 1.6 2.8l1.7 1.3L9 15.8l-1.8-1.5C6 13.3 5 12 5 9.5 5 6.8 7.2 5 9.8 5H11.5v10z" fill="white"/>
      </svg>
    ),
    'Ozon': (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" rx="4" fill="#005BFF"/>
        <circle cx="10" cy="10" r="4" stroke="white" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'Digiseller': (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" rx="4" fill="#2D9CDB"/>
        <path d="M6 10c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M10 8v4l2-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'Wildberries': (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" rx="4" fill="#CB11AB"/>
        <path d="M5 6l2.5 8L10 9l2.5 5L15 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  };
  return logos[platform] || (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="4" fill="#00E676"/>
      <text x="10" y="14" textAnchor="middle" fill="#000" fontSize="11" fontWeight="900" fontFamily="system-ui">B</text>
    </svg>
  );
};

/* ─── Product Icon Resolver ─── */
function ProductIcon({ config, size = 40 }) {
  const map = {
    'telegram_stars': <StarIcon size={size} />,
    'telegram_premium': <DiamondIcon size={size} />,
    'telegram_gift': <GiftIcon size={size} />,
    'steam_gift': <GamepadIcon size={size} />,
    'steam_topup': <GamepadIcon size={size} />,
    'gift_card': <GiftIcon size={size} />,
  };
  return map[config.id] || <StarIcon size={size} />;
}

/* ─── Skeleton Loader ─── */
function LoadingSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.shimmer} style={{ width: 100, height: 100, borderRadius: '50%' }} />
      <div className={styles.shimmer} style={{ width: '50%', height: 28 }} />
      <div className={styles.shimmer} style={{ width: '35%', height: 18 }} />
      <div className={styles.shimmer} style={{ width: '100%', height: 100, borderRadius: 20 }} />
      <div className={styles.shimmer} style={{ width: '100%', height: 150, borderRadius: 20 }} />
      <div className={styles.shimmer} style={{ width: '100%', height: 60, borderRadius: 16 }} />
    </div>
  );
}

/* ─── Error State ─── */
function ErrorState({ message }) {
  return (
    <motion.div className={styles.errorCard}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className={styles.errorIconWrap}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="rgba(239,68,68,0.3)" strokeWidth="2.5" fill="rgba(239,68,68,0.05)" />
          <path d="M22 22L42 42M42 22L22 42" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className={styles.errorTitle}>Заказ не найден</h2>
      <p className={styles.errorText}>{message}</p>
      <a href="/" className="btn-glass" style={{ marginTop: 20 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        На главную
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   DELIVERY PAGE — Premium
   ═══════════════════════════════════ */
export default function DeliveryPage() {
  const params = useParams();
  const code = params.code;

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);

        const { data, error: fetchErr } = await supabase
          .from('orders')
          .select('*')
          .eq('delivery_code', code)
          .single();

        if (fetchErr || !data) {
          const { data: byId, error: idErr } = await supabase
            .from('orders')
            .select('*')
            .eq('id', code)
            .single();

          if (idErr || !byId) {
            if (code === 'demo' || code === 'test') {
              setOrder({
                id: 'demo-001',
                product_name: '500 Telegram Stars',
                category: 'Telegram Stars',
                delivery_data: 'STAR-XXXX-YYYY-ZZZZ',
                delivery_instructions: 'Откройте Telegram → Настройки → Stars → Активировать код',
                status: 'delivered',
                created_at: new Date().toISOString(),
                platform: 'Яндекс Маркет',
                price: 850,
              });
            } else {
              setError('Заказ с таким кодом не найден. Проверьте правильность ссылки.');
            }
          } else {
            setOrder(byId);
          }
        } else {
          setOrder(data);
        }
      } catch {
        setError('Произошла ошибка при загрузке. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    }
    if (code) fetchOrder();
  }, [code]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const config = order ? getProductConfig(order.product_name, order.category) : null;

  return (
    <main className={styles.main}>
      <div className="app-bg" />

      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <a href="/" className={styles.logo}>
            <div className={styles.logoMark}>B</div>
            <span className={styles.logoText}>BAZZAR</span>
          </a>
          <a href="https://t.me/bazzar_support" target="_blank" rel="noopener"
            className="btn-glass" style={{ fontSize: 13 }}>
            <TelegramIcon size={16} animate={false} />
            Нужна помощь?
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className={`container ${styles.content}`}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingSkeleton />
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ErrorState message={error} />
            </motion.div>
          ) : order ? (
            <motion.div
              key="order"
              className={styles.deliveryFlow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* ─── Success Header ─── */}
              <motion.div className={styles.successHeader}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.successGlow} />
                <CheckCircleIcon size={90} />
                <h1 className={styles.successTitle}>Ваш заказ готов!</h1>
                <p className={styles.successProduct}>{order.product_name}</p>
                {order.platform && (
                  <div className={styles.platformBadge}>
                    <MarketplaceLogo platform={order.platform} />
                    <span>{order.platform}</span>
                  </div>
                )}
              </motion.div>

              {/* ─── Marketplace Trust Bar ─── */}
              <motion.div className={styles.trustBar}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <div className={styles.trustItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L1.5 4.5V7.5C1.5 11.14 4.26 14.5 8 15.5C11.74 14.5 14.5 11.14 14.5 7.5V4.5L8 1Z" stroke="var(--green)" strokeWidth="1.2"/><path d="M5.5 8L7 9.5L10.5 6" stroke="var(--green)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>Подлинный товар</span>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.trustItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 7.5V14h4.5v-4h3v4H14V7.5L8 1.5z" stroke="var(--green)" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                  <span>Официальный продавец</span>
                </div>
                <div className={styles.trustDivider} />
                <div className={styles.trustItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="var(--green)" strokeWidth="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="var(--green)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  <span>Моментальная доставка</span>
                </div>
              </motion.div>

              {/* ─── Product Card ─── */}
              <motion.div className={styles.productCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ '--accent': config.color }}
              >
                <div className={styles.productCardGlow} />
                <div className={styles.productIconWrap} style={{ background: config.gradient }}>
                  <ProductIcon config={config} size={36} />
                </div>
                <div className={styles.productInfo}>
                  <h3>{order.product_name}</h3>
                  <span>{config.title}</span>
                </div>
                <div className={styles.productStatus}>
                  <span className="badge badge-success">Доставлено</span>
                </div>
              </motion.div>

              {/* ─── Instructions ─── */}
              <motion.div className={styles.instructionsCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                <h3 className={styles.cardTitle}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  Инструкция
                </h3>
                <ol className={styles.steps}>
                  {(order.delivery_instructions
                    ? order.delivery_instructions.split('\n').filter(Boolean)
                    : config.instructions
                  ).map((step, i) => (
                    <motion.li key={i} className={styles.step}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    >
                      <span className={styles.stepNum}>{i + 1}</span>
                      <span className={styles.stepText}>{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>

              {/* ─── Delivery Data — THE KEY ─── */}
              {order.delivery_data && (
                <motion.div className={styles.dataCard}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55, duration: 0.5, type: 'spring', stiffness: 100 }}
                  style={{ '--accent': config.color }}
                >
                  <div className={styles.dataGlow} />
                  
                  <span className={styles.dataLabel}>{config.dataLabel}</span>
                  
                  {config.isLink ? (
                    <a href={order.delivery_data} target="_blank" rel="noopener"
                      className={styles.dataLink}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13H12C12.55 13 13 12.55 13 12V10M9 3H13V7M13 3L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {order.delivery_data}
                    </a>
                  ) : (
                    <div className={styles.dataValue}>
                      {order.delivery_data}
                    </div>
                  )}

                  <motion.button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(order.delivery_data)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: copied ? 'rgba(34,197,94,0.1)' : config.gradient,
                      borderColor: copied ? 'rgba(34,197,94,0.25)' : 'transparent',
                      color: copied ? 'var(--accent-green)' : '#fff',
                    }}
                  >
                    <CopyIcon size={18} copied={copied} />
                    {copied ? 'Скопировано!' : config.copyLabel}
                  </motion.button>
                </motion.div>
              )}

              {/* ─── Order Meta ─── */}
              <motion.div className={styles.metaGrid}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <div className={styles.metaCard}>
                  <span className={styles.metaLabel}>Код заказа</span>
                  <span className={styles.metaValue}>{code}</span>
                </div>
                {order.created_at && (
                  <div className={styles.metaCard}>
                    <span className={styles.metaLabel}>Дата</span>
                    <span className={styles.metaValue}>
                      {new Date(order.created_at).toLocaleString('ru-RU', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}
                <div className={styles.metaCard}>
                  <span className={styles.metaLabel}>Статус</span>
                  <span className={`badge badge-success`}>Доставлено</span>
                </div>
              </motion.div>

              {/* ─── Bottom CTAs ─── */}
              <motion.div className={styles.bottomCards}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.4 }}
              >
                <a href="https://t.me/bazzar_support" target="_blank" rel="noopener" className={styles.ctaCard}>
                  <div className={styles.ctaIcon}>
                    <TelegramIcon size={28} animate={false} />
                  </div>
                  <div>
                    <strong>Нужна помощь?</strong>
                    <p>Напишите нам в Telegram — ответим за минуту</p>
                  </div>
                </a>

                <a href="/" className={`${styles.ctaCard} ${styles.ctaCardAccent}`}>
                  <div className={styles.ctaIcon}>
                    <RocketIcon size={28} animate={false} />
                  </div>
                  <div>
                    <strong>Покупайте дешевле!</strong>
                    <p>На bazzar-market.ru цены на 20% ниже</p>
                  </div>
                </a>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
