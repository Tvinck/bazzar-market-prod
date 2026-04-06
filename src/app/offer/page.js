'use client';
import Link from 'next/link';
import styles from '../legal.module.css';

export default function OfferPage() {
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="ofDoc" x1="0" y1="0" x2="24" y2="24"><stop stopColor="#00E676"/><stop offset="1" stopColor="#00C853"/></linearGradient></defs><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="url(#ofDoc)" strokeWidth="2" fill="none"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="url(#ofDoc)" strokeWidth="2"/></svg>
          Юридический документ
        </div>
        <h1 className={styles.legalTitle}>Публичная оферта</h1>
        <p className={styles.legalUpdate}>Последнее обновление: 1 марта 2026 г.</p>

        <section className={styles.legalSection}>
          <h2>1. Общие положения</h2>
          <p>Настоящий документ является официальным предложением (публичной офертой) ИП Базаров (далее — «Продавец») для полноценного использования интернет-магазина BAZZAR Market, расположенного по адресу bazzar-market.ru (далее — «Сайт»), для приобретения цифровых товаров.</p>
          <p>В соответствии с пунктом 2 статьи 437 Гражданского кодекса РФ данный документ является публичной офертой, и в случае принятия изложенных ниже условий, лицо, производящее акцепт этой оферты, становится Покупателем.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>2. Предмет оферты</h2>
          <p>Продавец обязуется передать Покупателю цифровые товары, а именно:</p>
          <ul>
            <li>Telegram Stars и Telegram Premium подписки</li>
            <li>Ключи и подарочные карты Steam</li>
            <li>Подписки Discord Nitro</li>
            <li>Подарочные сертификаты App Store, Google Play</li>
            <li>Общие аккаунты цифровых сервисов</li>
            <li>Иные цифровые товары, представленные на Сайте</li>
          </ul>
        </section>

        <section className={styles.legalSection}>
          <h2>3. Оформление заказа</h2>
          <p>3.1. Покупатель оформляет заказ на Сайте, заполняя необходимые данные (имя пользователя, email, контактные данные).</p>
          <p>3.2. После оплаты заказа Покупатель получает цифровой товар на указанные контактные данные в течение 1‑60 минут.</p>
          <p>3.3. Срок доставки может быть увеличен в случае технических неполадок, о чём Покупатель будет уведомлён через Telegram или email.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>4. Оплата</h2>
          <p>4.1. Оплата производится одним из следующих способов: банковские карты Visa, Mastercard, МИР; Система быстрых платежей (СБП); Т-Банк (Тинькофф); Apple Pay.</p>
          <p>4.2. Все цены на Сайте указаны в российских рублях (₽) и включают все применимые налоги.</p>
          <p>4.3. Продавец оставляет за собой право изменять цены на товары без предварительного уведомления.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>5. Гарантии и возврат</h2>
          <p>5.1. Продавец гарантирует работоспособность всех цифровых товаров на момент передачи Покупателю.</p>
          <p>5.2. В случае неработоспособности товара Покупатель имеет право на замену или полный возврат средств в течение 24 часов с момента получения.</p>
          <p>5.3. Для оформления возврата необходимо обратиться в службу поддержки через Telegram: @bazzar_support.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>6. Ответственность сторон</h2>
          <p>6.1. Продавец не несёт ответственности за невозможность использования товара по причинам, не зависящим от Продавца (блокировка аккаунта, нарушение правил платформы Покупателем и т.д.).</p>
          <p>6.2. Продавец обязуется обеспечивать конфиденциальность персональных данных Покупателя.</p>
        </section>

        <section className={styles.legalSection}>
          <h2>7. Контактная информация</h2>
          <p>ИП Базаров<br/>Email: support@bazzar-market.ru<br/>Telegram: @bazzar_support<br/>Сайт: bazzar-market.ru</p>
        </section>
      </main>
    </div>
  );
}
