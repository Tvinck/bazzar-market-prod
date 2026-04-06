import './globals.css';
import TopLoadingBar from './components/TopLoadingBar';
import CookieConsent from './components/CookieConsent';
import BackToTop from './components/BackToTop';
import SupportWidget from './components/SupportWidget';

export const metadata = {
  title: 'BAZZAR — Цифровые товары мгновенно',
  description: 'Telegram Stars, Premium, Steam ключи, подарочные карты — мгновенная доставка 24/7. Покупайте напрямую и экономьте до 20%.',
  keywords: 'telegram stars, telegram premium, steam ключи, подарочные карты, цифровые товары',
  openGraph: {
    title: 'BAZZAR — Цифровые товары мгновенно',
    description: 'Мгновенная доставка цифровых товаров 24/7',
    siteName: 'BAZZAR Market',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08080A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <TopLoadingBar />
        {children}
        <SupportWidget />
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
