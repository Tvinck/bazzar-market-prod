/* ═══════════════════════════════════════════════
   Category Data — separated from component for
   zero re-creation on re-render
   ═══════════════════════════════════════════════ */

export const categoryData = {
  'services': {
    title: 'Консоли и сервисы',
    emoji: '🌐',
    accentColor: '#2AABEE',
    services: [
      {
        id: 'telegram', name: 'Telegram', subtitle: 'Звёзды, Подарки и Премиум',
        iconEmoji: '✈️', iconBg: 'linear-gradient(135deg, #2AABEE, #229ED9)',
        banner: { title: 'Telegram звёзды и Премиум', color: '#2AABEE', delivery: 'до 5 минут' },
        tabs: [
          { id: 'stars', label: 'Звёзды' },
          { id: 'premium', label: 'Подписка Premium', isNew: true },
          { id: 'gifts', label: 'Подарки' },
        ],
        products: {
          stars: [
            { id: 's50', name: '50 звёзд', price: 77, emoji: '⭐' },
            { id: 's75', name: '75 звёзд', price: 117, emoji: '⭐' },
            { id: 's100', name: '100 звёзд', price: 152, emoji: '⭐' },
            { id: 's150', name: '150 звёзд', price: 228, emoji: '⭐' },
            { id: 's250', name: '250 звёзд', price: 378, emoji: '⭐⭐' },
            { id: 's350', name: '350 звёзд', price: 529, emoji: '⭐⭐' },
            { id: 's500', name: '500 звёзд', price: 755, emoji: '⭐⭐' },
            { id: 's750', name: '750 звёзд', price: 1177, emoji: '⭐⭐⭐' },
            { id: 's1000', name: '1000 звёзд', price: 1569, emoji: '⭐⭐⭐' },
            { id: 's1500', name: '1500 звёзд', price: 2525, emoji: '⭐⭐⭐' },
            { id: 's2500', name: '2500 звёзд', price: 4208, emoji: '⭐⭐⭐⭐' },
            { id: 's5000', name: '5000 звёзд', price: 8416, emoji: '⭐⭐⭐⭐' },
          ],
          premium: [
            { id: 'p1', name: 'Premium 1 мес', price: 299, emoji: '💎' },
            { id: 'p3', name: 'Premium 3 мес', price: 799, emoji: '💎💎' },
            { id: 'p6', name: 'Premium 6 мес', price: 1499, emoji: '💎💎' },
            { id: 'p12', name: 'Premium 12 мес', price: 2499, emoji: '💎💎💎' },
          ],
          gifts: [
            { id: 'g1', name: 'Подарок 50 Stars', price: 99, emoji: '🎁' },
            { id: 'g2', name: 'Подарок 100 Stars', price: 179, emoji: '🎁' },
            { id: 'g3', name: 'Подарок 500 Stars', price: 799, emoji: '🎁🎁' },
          ],
        },
        inputLabel: 'Никнейм в Telegram',
        inputHint: 'Убедись, что у тебя установлен username (не имя и фамилия) и укажи его без символа @',
        inputIcon: '@',
      },
      {
        id: 'psn', name: 'PSN', subtitle: 'PlayStation Network',
        iconEmoji: '🎮', iconBg: 'linear-gradient(135deg, #003087, #0050D4)',
        banner: { title: 'PlayStation Network', color: '#003087', delivery: 'до 15 минут' },
        tabs: [{ id: 'cards', label: 'Карты пополнения' }],
        products: { cards: [
          { id: 'psn1', name: 'PSN 1000 ₽', price: 1150, emoji: '💳' },
          { id: 'psn2', name: 'PSN 2500 ₽', price: 2899, emoji: '💳' },
          { id: 'psn3', name: 'PSN 5000 ₽', price: 5699, emoji: '💳💳' },
        ]},
      },
      {
        id: 'psplus', name: 'PlayStation Plus', subtitle: 'Подписки PS',
        iconEmoji: '➕', iconBg: 'linear-gradient(135deg, #FFD600, #FFC107)',
        banner: { title: 'PlayStation Plus подписка', color: '#E6A800', delivery: 'до 30 минут' },
        tabs: [{ id: 'subs', label: 'Подписки' }],
        products: { subs: [
          { id: 'psp1', name: 'PS Plus Essential 1 мес', price: 899, emoji: '🏆' },
          { id: 'psp3', name: 'PS Plus Essential 3 мес', price: 1799, emoji: '🏆' },
          { id: 'psp12', name: 'PS Plus Essential 12 мес', price: 4999, emoji: '🏆🏆' },
          { id: 'psp_extra', name: 'PS Plus Extra 1 мес', price: 1299, emoji: '🏆🏆' },
          { id: 'psp_deluxe', name: 'PS Plus Deluxe 1 мес', price: 1599, emoji: '🏆🏆🏆' },
        ]},
      },
      {
        id: 'chatgpt', name: 'ChatGPT', subtitle: 'AI подписки',
        iconEmoji: '🤖', iconBg: 'linear-gradient(135deg, #10A37F, #0D8C6C)',
        banner: { title: 'ChatGPT Plus / Pro', color: '#10A37F', delivery: 'до 10 минут' },
        tabs: [{ id: 'ai', label: 'Подписки' }],
        products: { ai: [
          { id: 'gpt1', name: 'ChatGPT Plus 1 мес', price: 1990, emoji: '🧠' },
          { id: 'gpt3', name: 'ChatGPT Plus 3 мес', price: 5490, emoji: '🧠🧠' },
          { id: 'gptpro', name: 'ChatGPT Pro 1 мес', price: 19900, emoji: '🧠🧠🧠' },
        ]},
      },
      {
        id: 'spotify', name: 'Spotify', subtitle: 'Музыка',
        iconEmoji: '🎵', iconBg: 'linear-gradient(135deg, #1DB954, #1AA34A)',
        banner: { title: 'Spotify Premium', color: '#1DB954', delivery: 'до 10 минут' },
        tabs: [{ id: 'music', label: 'Подписки' }],
        products: { music: [
          { id: 'sp1', name: 'Spotify 1 мес', price: 199, emoji: '🎧' },
          { id: 'sp3', name: 'Spotify 3 мес', price: 549, emoji: '🎧🎧' },
          { id: 'sp6', name: 'Spotify 6 мес', price: 999, emoji: '🎧🎧' },
          { id: 'sp12', name: 'Spotify 12 мес', price: 1799, emoji: '🎧🎧🎧' },
        ]},
      },
      {
        id: 'xboxgp', name: 'XBOX Game Pass', subtitle: 'Подписки',
        iconEmoji: '🟢', iconBg: 'linear-gradient(135deg, #107C10, #0E6B0E)',
        banner: { title: 'Xbox Game Pass', color: '#107C10', delivery: 'до 15 минут' },
        tabs: [{ id: 'gp', label: 'Game Pass' }],
        products: { gp: [
          { id: 'xgp1', name: 'Game Pass Core 1 мес', price: 499, emoji: '🎮' },
          { id: 'xgp3', name: 'Game Pass Core 3 мес', price: 1299, emoji: '🎮' },
          { id: 'xgpu', name: 'Game Pass Ultimate 1 мес', price: 999, emoji: '🎮🎮' },
          { id: 'xgpu3', name: 'Game Pass Ultimate 3 мес', price: 2499, emoji: '🎮🎮🎮' },
        ]},
      },
      {
        id: 'xbox', name: 'XBOX', subtitle: 'Пополнение счёта',
        iconEmoji: '❎', iconBg: 'linear-gradient(135deg, #107C10, #14A614)',
        banner: { title: 'Xbox Gift Card', color: '#107C10', delivery: 'до 15 минут' },
        tabs: [{ id: 'balance', label: 'Карты' }],
        products: { balance: [
          { id: 'xb1', name: 'Xbox 1000 ₽', price: 1150, emoji: '💚' },
          { id: 'xb2', name: 'Xbox 2500 ₽', price: 2899, emoji: '💚' },
          { id: 'xb5', name: 'Xbox 5000 ₽', price: 5699, emoji: '💚💚' },
        ]},
      },
      {
        id: 'discord', name: 'Discord Nitro', subtitle: 'Подписки',
        iconEmoji: '🟣', iconBg: 'linear-gradient(135deg, #5865F2, #4752C4)',
        banner: { title: 'Discord Nitro', color: '#5865F2', delivery: 'до 5 минут' },
        tabs: [{ id: 'nitro', label: 'Nitro' }],
        products: { nitro: [
          { id: 'dn1', name: 'Nitro Basic 1 мес', price: 299, emoji: '🚀' },
          { id: 'dn3', name: 'Nitro Basic 3 мес', price: 799, emoji: '🚀' },
          { id: 'dnf1', name: 'Nitro Full 1 мес', price: 699, emoji: '🚀🚀' },
          { id: 'dnf12', name: 'Nitro Full 12 мес', price: 6999, emoji: '🚀🚀🚀' },
        ]},
      },
      {
        id: 'youtube', name: 'YouTube Premium', subtitle: 'Подписки',
        iconEmoji: '▶️', iconBg: 'linear-gradient(135deg, #FF0000, #CC0000)',
        banner: { title: 'YouTube Premium', color: '#FF0000', delivery: 'до 10 минут' },
        tabs: [{ id: 'yt', label: 'Подписки' }],
        products: { yt: [
          { id: 'yt1', name: 'YouTube Premium 1 мес', price: 199, emoji: '📺' },
          { id: 'yt3', name: 'YouTube Premium 3 мес', price: 549, emoji: '📺' },
          { id: 'yt12', name: 'YouTube Premium 12 мес', price: 1899, emoji: '📺📺' },
        ]},
      },
      {
        id: 'suno', name: 'Suno AI', subtitle: 'Музыка',
        iconEmoji: '🎶', iconBg: 'linear-gradient(135deg, #FF6B35, #E55A2B)',
        banner: { title: 'Suno Pro', color: '#FF6B35', delivery: 'до 10 минут' },
        tabs: [{ id: 'suno', label: 'Подписки' }],
        products: { suno: [
          { id: 'sun1', name: 'Suno Pro 1 мес', price: 990, emoji: '🎤' },
          { id: 'sun12', name: 'Suno Pro 12 мес', price: 9900, emoji: '🎤🎤' },
        ]},
      },
      {
        id: 'midjourney', name: 'Midjourney', subtitle: 'AI генерация',
        iconEmoji: '🎨', iconBg: 'linear-gradient(135deg, #1A1A2E, #4A4A6A)',
        banner: { title: 'Midjourney', color: '#2D2D5E', delivery: 'до 15 минут' },
        tabs: [{ id: 'mj', label: 'Подписки' }],
        products: { mj: [
          { id: 'mj1', name: 'Midjourney Basic 1 мес', price: 990, emoji: '🖼️' },
          { id: 'mj3', name: 'Midjourney Standard 1 мес', price: 2990, emoji: '🖼️🖼️' },
          { id: 'mj_pro', name: 'Midjourney Pro 1 мес', price: 5990, emoji: '🖼️🖼️🖼️' },
        ]},
      },
    ],
  },
  'game-currency': {
    title: 'Игровая валюта',
    emoji: '🎮',
    accentColor: '#A855F7',
    services: [
      {
        id: 'pubg', name: 'PUBG Mobile', subtitle: 'UC пополнение',
        iconEmoji: '🔫', iconBg: 'linear-gradient(135deg, #F7C948, #E6B800)',
        banner: { title: 'PUBG Mobile UC', color: '#D4A017', delivery: 'до 15 минут' },
        tabs: [{ id: 'uc', label: 'UC' }],
        products: { uc: [
          { id: 'uc60', name: '60 UC', price: 99, emoji: '🪙' }, { id: 'uc325', name: '325 UC', price: 499, emoji: '🪙' },
          { id: 'uc660', name: '660 UC', price: 999, emoji: '🪙🪙' }, { id: 'uc1800', name: '1800 UC', price: 2499, emoji: '🪙🪙🪙' },
          { id: 'uc3850', name: '3850 UC', price: 4999, emoji: '🪙🪙🪙' }, { id: 'uc8100', name: '8100 UC', price: 9999, emoji: '🪙🪙🪙🪙' },
        ]},
        inputLabel: 'ID игрока', inputHint: 'Введите ваш Player ID из настроек игры', inputIcon: '#',
      },
      {
        id: 'genshin', name: 'Genshin Impact', subtitle: 'Genesis Crystals',
        iconEmoji: '⚔️', iconBg: 'linear-gradient(135deg, #6C63FF, #5B52E0)',
        banner: { title: 'Genshin Impact', color: '#6C63FF', delivery: 'до 15 минут' },
        tabs: [{ id: 'crystals', label: 'Кристаллы' }],
        products: { crystals: [
          { id: 'gc60', name: '60 Genesis', price: 149, emoji: '💎' }, { id: 'gc300', name: '300 Genesis', price: 699, emoji: '💎' },
          { id: 'gc980', name: '980 Genesis', price: 1990, emoji: '💎💎' }, { id: 'gc1980', name: '1980 Genesis', price: 3990, emoji: '💎💎💎' },
          { id: 'gc3280', name: '3280 Genesis', price: 5990, emoji: '💎💎💎' }, { id: 'gc6480', name: '6480 Genesis', price: 9990, emoji: '💎💎💎💎' },
        ]},
        inputLabel: 'UID игрока', inputHint: 'Найдите UID в настройках профиля', inputIcon: '#',
      },
      {
        id: 'mlegends', name: 'Mobile Legends', subtitle: 'Diamonds',
        iconEmoji: '⚡', iconBg: 'linear-gradient(135deg, #E84393, #D63384)',
        banner: { title: 'Mobile Legends: BB', color: '#E84393', delivery: 'до 15 минут' },
        tabs: [{ id: 'dia', label: 'Diamonds' }],
        products: { dia: [
          { id: 'ml11', name: '11 Diamonds', price: 35, emoji: '💠' }, { id: 'ml56', name: '56 Diamonds', price: 149, emoji: '💠' },
          { id: 'ml112', name: '112 Diamonds', price: 279, emoji: '💠💠' }, { id: 'ml290', name: '290 Diamonds', price: 699, emoji: '💠💠' },
          { id: 'ml878', name: '878 Diamonds', price: 1990, emoji: '💠💠💠' }, { id: 'ml2010', name: '2010 Diamonds', price: 4490, emoji: '💠💠💠💠' },
        ]},
        inputLabel: 'ID + Server', inputHint: 'Введите ID и Server через пробел', inputIcon: '#',
      },
      {
        id: 'fortnite', name: 'Fortnite', subtitle: 'V-Bucks',
        iconEmoji: '🎯', iconBg: 'linear-gradient(135deg, #7B68EE, #6A5ACD)',
        banner: { title: 'Fortnite V-Bucks', color: '#7B68EE', delivery: 'до 30 минут' },
        tabs: [{ id: 'vb', label: 'V-Bucks' }],
        products: { vb: [
          { id: 'vb1000', name: '1000 V-Bucks', price: 899, emoji: '💰' }, { id: 'vb2800', name: '2800 V-Bucks', price: 2299, emoji: '💰💰' },
          { id: 'vb5000', name: '5000 V-Bucks', price: 3999, emoji: '💰💰💰' }, { id: 'vb13500', name: '13500 V-Bucks', price: 9999, emoji: '💰💰💰💰' },
        ]},
      },
      {
        id: 'roblox', name: 'Roblox', subtitle: 'Robux',
        iconEmoji: '🟩', iconBg: 'linear-gradient(135deg, #FF4455, #DD3344)',
        banner: { title: 'Roblox Robux', color: '#FF4455', delivery: 'до 15 минут' },
        tabs: [{ id: 'robux', label: 'Robux' }],
        products: { robux: [
          { id: 'rb400', name: '400 Robux', price: 499, emoji: '🟢' }, { id: 'rb800', name: '800 Robux', price: 899, emoji: '🟢' },
          { id: 'rb1700', name: '1700 Robux', price: 1790, emoji: '🟢🟢' }, { id: 'rb4500', name: '4500 Robux', price: 4490, emoji: '🟢🟢🟢' },
          { id: 'rb10000', name: '10000 Robux', price: 8990, emoji: '🟢🟢🟢🟢' },
        ]},
      },
      {
        id: 'standoff', name: 'Standoff 2', subtitle: 'Gold',
        iconEmoji: '🔫', iconBg: 'linear-gradient(135deg, #FF6B00, #E65C00)',
        banner: { title: 'Standoff 2 Gold', color: '#FF6B00', delivery: 'до 15 минут' },
        tabs: [{ id: 'gold', label: 'Gold' }],
        products: { gold: [
          { id: 'so100', name: '100 Gold', price: 99, emoji: '🥇' }, { id: 'so500', name: '500 Gold', price: 449, emoji: '🥇' },
          { id: 'so1000', name: '1000 Gold', price: 849, emoji: '🥇🥇' }, { id: 'so5000', name: '5000 Gold', price: 3990, emoji: '🥇🥇🥇' },
        ]},
        inputLabel: 'ID игрока', inputHint: 'Введите ID из профиля Standoff 2', inputIcon: '#',
      },
    ],
  },
  'steam-gifts': {
    title: 'Покупай Гифт',
    emoji: '🎁',
    accentColor: '#FF1E56',
    services: [
      {
        id: 'steamgift', name: 'Steam Gift', subtitle: 'Любая игра в подарок',
        iconEmoji: '🎁', iconBg: 'linear-gradient(135deg, #1B2838, #2A475E)',
        banner: { title: 'Steam Gift — Подарки', color: '#1B2838', delivery: 'до 30 минут' },
        tabs: [{ id: 'games', label: 'Игры' }],
        products: { games: [
          { id: 'sg1', name: 'Любая игра до 500₽', price: 599, emoji: '🎮' },
          { id: 'sg2', name: 'Любая игра до 1000₽', price: 1149, emoji: '🎮🎮' },
          { id: 'sg3', name: 'Любая игра до 2000₽', price: 2249, emoji: '🎮🎮' },
          { id: 'sg4', name: 'Любая игра до 5000₽', price: 5499, emoji: '🎮🎮🎮' },
        ]},
        inputLabel: 'Ссылка на Steam профиль', inputHint: 'Укажите ссылку вида steamcommunity.com/id/...', inputIcon: '🔗',
      },
    ],
  },
  'keys-vouchers': {
    title: 'Покупай Ключи',
    emoji: '🔑',
    accentColor: '#FBBF24',
    services: [
      {
        id: 'appstore', name: 'App Store / iTunes', subtitle: 'Подарочные карты',
        iconEmoji: '🍎', iconBg: 'linear-gradient(135deg, #333, #555)',
        banner: { title: 'App Store Gift Card', color: '#333', delivery: 'мгновенно' },
        tabs: [{ id: 'cards', label: 'Карты' }],
        products: { cards: [
          { id: 'as500', name: 'App Store 500₽', price: 599, emoji: '🍏' },
          { id: 'as1000', name: 'App Store 1000₽', price: 1149, emoji: '🍏' },
          { id: 'as2000', name: 'App Store 2000₽', price: 2249, emoji: '🍏🍏' },
          { id: 'as5000', name: 'App Store 5000₽', price: 5499, emoji: '🍏🍏🍏' },
        ]},
      },
      {
        id: 'googleplay', name: 'Google Play', subtitle: 'Карты пополнения',
        iconEmoji: '▶️', iconBg: 'linear-gradient(135deg, #34A853, #2D9649)',
        banner: { title: 'Google Play Gift Card', color: '#34A853', delivery: 'мгновенно' },
        tabs: [{ id: 'cards', label: 'Карты' }],
        products: { cards: [
          { id: 'gp500', name: 'Google Play 500₽', price: 599, emoji: '🟢' },
          { id: 'gp1000', name: 'Google Play 1000₽', price: 1149, emoji: '🟢' },
          { id: 'gp2000', name: 'Google Play 2000₽', price: 2249, emoji: '🟢🟢' },
        ]},
      },
      {
        id: 'psncard', name: 'PlayStation Store', subtitle: 'Ваучеры PSN',
        iconEmoji: '🎮', iconBg: 'linear-gradient(135deg, #003087, #0050D4)',
        banner: { title: 'PSN Gift Card', color: '#003087', delivery: 'до 15 минут' },
        tabs: [{ id: 'cards', label: 'Ваучеры' }],
        products: { cards: [
          { id: 'psc1', name: 'PSN 1000₽', price: 1150, emoji: '🕹️' },
          { id: 'psc2', name: 'PSN 2500₽', price: 2899, emoji: '🕹️' },
          { id: 'psc5', name: 'PSN 5000₽', price: 5699, emoji: '🕹️🕹️' },
        ]},
      },
      {
        id: 'xboxcard', name: 'Xbox Gift Card', subtitle: 'Карты Microsoft',
        iconEmoji: '❎', iconBg: 'linear-gradient(135deg, #107C10, #14A614)',
        banner: { title: 'Xbox Gift Card', color: '#107C10', delivery: 'до 15 минут' },
        tabs: [{ id: 'cards', label: 'Карты' }],
        products: { cards: [
          { id: 'xc1', name: 'Xbox 1000₽', price: 1150, emoji: '💚' },
          { id: 'xc2', name: 'Xbox 2500₽', price: 2899, emoji: '💚' },
        ]},
      },
      {
        id: 'nintendo', name: 'Nintendo eShop', subtitle: 'Пополнение баланса',
        iconEmoji: '🔴', iconBg: 'linear-gradient(135deg, #E60012, #CC0010)',
        banner: { title: 'Nintendo eShop', color: '#E60012', delivery: 'до 15 минут' },
        tabs: [{ id: 'cards', label: 'Карты' }],
        products: { cards: [
          { id: 'ns1', name: 'eShop $10', price: 999, emoji: '🍄' },
          { id: 'ns2', name: 'eShop $25', price: 2499, emoji: '🍄' },
          { id: 'ns5', name: 'eShop $50', price: 4999, emoji: '🍄🍄' },
        ]},
      },
    ],
  },
  'steam-topup': {
    title: 'Пополняй Стим',
    emoji: '💰',
    accentColor: '#00E676',
    services: [
      {
        id: 'steambal', name: 'Steam баланс', subtitle: 'Пополнение кошелька',
        iconEmoji: '💵', iconBg: 'linear-gradient(135deg, #1B2838, #2A475E)',
        banner: { title: 'Пополнение Steam', color: '#1B2838', delivery: 'до 30 минут' },
        tabs: [{ id: 'topup', label: 'Суммы' }],
        products: { topup: [
          { id: 'st100', name: '100₽ на Steam', price: 115, emoji: '💵' },
          { id: 'st250', name: '250₽ на Steam', price: 289, emoji: '💵' },
          { id: 'st500', name: '500₽ на Steam', price: 575, emoji: '💵💵' },
          { id: 'st1000', name: '1000₽ на Steam', price: 1100, emoji: '💵💵' },
          { id: 'st2000', name: '2000₽ на Steam', price: 2150, emoji: '💵💵💵' },
          { id: 'st5000', name: '5000₽ на Steam', price: 5350, emoji: '💵💵💵💵' },
        ]},
        inputLabel: 'Ссылка на Steam профиль', inputHint: 'Укажите ссылку вида steamcommunity.com/id/...', inputIcon: '🔗',
      },
    ],
  },
};

/* Category nav items (lightweight, no re-creation) */
export const categoryNavItems = Object.entries(categoryData).map(([key, cat]) => ({
  key,
  emoji: cat.emoji,
  title: cat.title,
}));
