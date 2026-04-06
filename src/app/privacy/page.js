'use client';
import Link from 'next/link';
import styles from '../legal.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.legalPage}>
      <header className={styles.legalHeader}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoBadge}>Б</span> BAZZAR
        </Link>
        <Link href="/" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          На главную
        </Link>
      </header>

      <main className={styles.legalContent}>
        <div className={styles.legalBadge}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="prShield" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#7C3AED"/></linearGradient></defs><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#prShield)" strokeWidth="2" fill="none"/><path d="M9 12l2 2 4-4" stroke="url(#prShield)" strokeWidth="2"/></svg>
          Конфиденциальность
        </div>
        <h1 className={styles.legalTitle}>Политика конфиденциальности</h1>
        <p className={styles.legalUpdate}>Последнее обновление: 1 марта 2026 г.</p>

        <section className={styles.legalSection}>
          <h2>1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей (далее — «Пользователь») интернет-магазина BAZZAR Market (далее — «Сайт»), расположенного по адресу bazzar-market.ru.</p>
          <p>Используя Сайт, Пользователь выражает своё согласие с условиями данной Политики. В случае несогласия Пользователь должен прекратить использование Сайта.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>2. Собираемые данные</h2>
          <p>При использовании Сайта мы можем собирать следующие данные:</p>
          <ul>
            <li><strong>Контактные данные:</strong> имя, адрес электронной почты, имя пользователя Telegram</li>
            <li><strong>Платёжные данные:</strong> информация о проведённых транзакциях (без хранения данных банковских карт)</li>
            <li><strong>Технические данные:</strong> IP-адрес, тип браузера, время доступа, cookie-файлы</li>
            <li><strong>Данные заказов:</strong> история покупок, статусы заказов</li>
          </ul>
        </section>

        <section className={styles.legalSection}>
          <h2>3. Цели обработки данных</h2>
          <p>Мы обрабатываем персональные данные в следующих целях:</p>
          <ul>
            <li>Выполнение заказов и доставка цифровых товаров</li>
            <li>Обеспечение работы службы поддержки</li>
            <li>Улучшение качества обслуживания</li>
            <li>Предотвращение мошеннических действий</li>
            <li>Отправка уведомлений о статусе заказа</li>
          </ul>
        </section>

        <section className={styles.legalSection}>
          <h2>4. Защита данных</h2>
          <p>4.1. Мы применяем современные технические и организационные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
          <p>4.2. Все платежи обрабатываются через сертифицированных платёжных провайдеров (Т-Банк, ЮKassa) с использованием протокола шифрования SSL/TLS.</p>
          <p>4.3. Мы не храним данные банковских карт на своих серверах.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>5. Передача данных третьим лицам</h2>
          <p>5.1. Мы не передаём персональные данные третьим лицам, за исключением случаев:</p>
          <ul>
            <li>Выполнение обязанности по закону РФ</li>
            <li>Передача платёжным провайдерам для обработки оплаты</li>
            <li>Защита прав и законных интересов Продавца</li>
          </ul>
        </section>

        <section className={styles.legalSection}>
          <h2>6. Cookie-файлы</h2>
          <p>Сайт использует cookie-файлы для обеспечения корректной работы, персонализации контента и аналитики. Пользователь может отключить cookie в настройках браузера, однако это может повлиять на функциональность Сайта.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>7. Права пользователя</h2>
          <p>Пользователь имеет право:</p>
          <ul>
            <li>Запросить информацию о хранимых данных</li>
            <li>Потребовать удаления своих персональных данных</li>
            <li>Отозвать согласие на обработку данных</li>
            <li>Обратиться с жалобой в Роскомнадзор</li>
          </ul>
        </section>

        <section className={styles.legalSection}>
          <h2>8. Контактная информация</h2>
          <p>По вопросам, связанным с обработкой персональных данных:<br/>ИП Базаров<br/>Email: support@bazzar-market.ru<br/>Telegram: @bazzar_support</p>
        </section>
      </main>
    </div>
  );
}
