'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './category.module.css';
import { categoryData, categoryNavItems } from './categoryData';

/* ═══ Icon component — pure CSS gradient + emoji ═══ */
const ServiceIcon = memo(function ServiceIcon({ emoji, bg, size = 40 }) {
  return (
    <span className={styles.serviceIcon} style={{ background: bg, width: size, height: size, fontSize: size * 0.5 }}>
      {emoji}
    </span>
  );
});

/* ═══ Product Card — memoized ═══ */
const ProductCard = memo(function ProductCard({ product, isSelected, accent, onClick }) {
  return (
    <button
      className={`${styles.productCard} ${isSelected ? styles.productCardSelected : ''}`}
      onClick={onClick}
      style={{ '--accent': accent }}
    >
      <div className={styles.productEmoji}>{product.emoji}</div>
      {isSelected && <span className={styles.productCheck}>Выбран ✓</span>}
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productPrice}>{product.price.toLocaleString('ru-RU')} ₽</div>
    </button>
  );
});

/* ═══ Sidebar Item — memoized ═══ */
const SidebarItem = memo(function SidebarItem({ service, isActive, onClick }) {
  return (
    <button className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`} onClick={onClick}>
      <ServiceIcon emoji={service.iconEmoji} bg={service.iconBg} size={38} />
      <div className={styles.sidebarInfo}>
        <span className={styles.sidebarName}>{service.name}</span>
        <span className={styles.sidebarSub}>{service.subtitle}</span>
      </div>
    </button>
  );
});

/* ═══ Fallback ═══ */
function FallbackPage() {
  return (
    <main className={styles.page}>
      <div className="app-bg" />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}><span className={styles.logoIcon}>B</span><span className={styles.logoName}>BAZZAR</span></Link>
          <Link href="/" className={styles.backBtn}>← На главную</Link>
        </div>
      </header>
      <div className={styles.fallbackContainer}>
        <div className={styles.fallbackEmoji}>🔧</div>
        <h1 className={styles.fallbackTitle}>Раздел в разработке</h1>
        <p className={styles.fallbackDesc}>Скоро здесь появятся товары</p>
        <Link href="/" className={styles.btnPrimary}>← На главную</Link>
      </div>
    </main>
  );
}

/* ═══ MAIN ═══ */
export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug || '';
  const data = categoryData[slug];

  const [activeIdx, setActiveIdx] = useState(0);
  const [tabId, setTabId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [promo, setPromo] = useState('');

  // Derived state — memoized
  const services = data?.services;
  const service = services?.[activeIdx] || services?.[0];
  const currentTab = tabId || service?.tabs[0]?.id;
  const products = useMemo(() => service?.products[currentTab] || [], [service, currentTab]);
  const selected = useMemo(
    () => products.find(p => p.id === selectedId) || products[0],
    [products, selectedId]
  );

  const filtered = useMemo(() => {
    if (!search || !services) return services || [];
    const q = search.toLowerCase();
    return services.filter(s => s.name.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q));
  }, [services, search]);

  const handleService = useCallback((idx) => {
    setActiveIdx(idx);
    setTabId(null);
    setSelectedId(null);
  }, []);

  const handleTab = useCallback((id) => {
    setTabId(id);
    setSelectedId(null);
  }, []);

  const handleProduct = useCallback((id) => {
    setSelectedId(id);
  }, []);

  if (!data) return <FallbackPage />;

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
          <nav className={styles.headerNav}>
            {categoryNavItems.map(c => (
              <Link key={c.key} href={`/category/${c.key}`} className={`${styles.headerNavItem} ${c.key === slug ? styles.headerNavActive : ''}`}>
                <span>{c.emoji}</span> {c.title}
              </Link>
            ))}
          </nav>
          <Link href="/" className={styles.backBtn}>← На главную</Link>
        </div>
      </header>

      {/* 3-column */}
      <div className={styles.layout}>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSearch}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="поиск" className={styles.sidebarSearchInput} />
          </div>
          <div className={styles.sidebarList}>
            {filtered.map(s => {
              const idx = services.indexOf(s);
              return <SidebarItem key={s.id} service={s} isActive={idx === activeIdx} onClick={() => handleService(idx)} />;
            })}
          </div>
        </aside>

        {/* CENTER */}
        <section className={styles.center}>
          {/* Banner */}
          <div className={styles.banner} style={{ '--bc': service.banner.color }}>
            <div className={styles.bannerGlow} />
            <div className={styles.bannerContent}>
              <ServiceIcon emoji={service.iconEmoji} bg={service.iconBg} size={52} />
              <div>
                <h2 className={styles.bannerTitle}>{service.banner.title}</h2>
                <span className={styles.bannerDelivery}>⚡ Доставка: {service.banner.delivery}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          {service.tabs.length > 1 && (
            <div className={styles.tabs}>
              {service.tabs.map(t => (
                <button key={t.id} className={`${styles.tab} ${currentTab === t.id ? styles.tabActive : ''}`} onClick={() => handleTab(t.id)}>
                  {t.label}
                  {t.isNew && <span className={styles.tabNew}>New</span>}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {service.inputLabel && (
            <div className={styles.inputBlock}>
              <div className={styles.inputHeader}>
                <span className={styles.inputLabel}>{service.inputLabel}</span>
                <button className={styles.inputHelp}>Инструкция ℹ️</button>
              </div>
              <p className={styles.inputHint}>{service.inputHint}</p>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>{service.inputIcon}</span>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder={service.inputLabel} className={styles.inputField} />
              </div>
              {inputVal && (
                <div className={styles.inputConfirm}>
                  <span className={styles.confirmDot}>✓</span> Я указал верные данные
                </div>
              )}
            </div>
          )}

          {/* Grid */}
          <div className={styles.productGrid} key={service.id + currentTab}>
            {products.map(p => (
              <ProductCard key={p.id} product={p} isSelected={selected?.id === p.id} accent={data.accentColor} onClick={() => handleProduct(p.id)} />
            ))}
          </div>

          <div className={styles.faq}><button className={styles.faqBtn}>Вопросы и ответы</button></div>
        </section>

        {/* PAYMENT */}
        <aside className={styles.payment}>
          <div className={styles.paymentCard}>
            <h3 className={styles.paymentTitle}>Детали оплаты</h3>
            <div className={styles.paymentSelected}>{selected?.name || 'Выберите товар'}</div>

            <div className={styles.paymentPromo}>
              <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Промокод" className={styles.promoInput} />
              <button className={styles.promoHelp}>?</button>
            </div>

            <div className={styles.paymentTotal}>
              <span className={styles.paymentTotalLabel}>Итого:</span>
              <span className={styles.paymentTotalValue}>{(selected?.price || 0).toLocaleString('ru-RU')} ₽</span>
            </div>

            <div className={styles.paymentMethods}>
              <span className={styles.paymentMethodsLabel}>Способ оплаты</span>
              <div className={styles.paymentMethodsGrid}>
                <button className={`${styles.methodBtn} ${styles.methodActive}`}>
                  <span className={styles.methodIcon}>💰</span>
                  <span className={styles.methodName}>КупиКоинами</span>
                </button>
                <button className={styles.methodBtn}>
                  <span className={styles.methodIcon}>🏦</span>
                  <span className={styles.methodName}>СБП</span>
                </button>
                <button className={styles.methodBtn}>
                  <span className={styles.methodIcon}>💳</span>
                  <span className={styles.methodName}>Картой</span>
                </button>
              </div>
            </div>

            <button className={styles.buyBtn}>Купить {(selected?.price || 0).toLocaleString('ru-RU')} ₽</button>

            <div className={styles.paymentBonus}>Начислим бонусами : {Math.floor((selected?.price || 0) * 0.02)} 💰</div>

            <p className={styles.paymentLegal}>
              Нажимая &quot;Купить&quot;, вы принимаете{' '}
              <Link href="/privacy">Правила пользования сайтом</Link> и{' '}
              <Link href="/privacy">Политику конфиденциальности</Link>
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
