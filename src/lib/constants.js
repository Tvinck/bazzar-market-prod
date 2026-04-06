/**
 * BAZZAR Market — Product delivery configurations
 * Each product type has different delivery data and instructions
 */

export const DELIVERY_CONFIGS = {
  // Telegram Stars — shared account instructions
  'telegram-stars': {
    icon: '⭐',
    title: 'Telegram Stars',
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    instructions: [
      'Откройте Telegram и перейдите в настройки',
      'Нажмите «Telegram Stars» → «Добавить Stars»',
      'Введите код активации ниже',
      'Stars будут зачислены на ваш аккаунт мгновенно'
    ],
    dataLabel: 'Код активации',
    copyLabel: 'Скопировать код',
    emoji: '🌟',
  },

  // Telegram Premium — username based 
  'telegram-premium': {
    icon: '💎',
    title: 'Telegram Premium',
    color: '#AF52DE',
    gradient: 'linear-gradient(135deg, #AF52DE 0%, #7C3AED 100%)',
    instructions: [
      'Подарок Telegram Premium отправлен на ваш username',
      'Откройте Telegram',
      'Проверьте входящие сообщения',
      'Нажмите «Принять подарок» в сообщении',
      'Premium активируется автоматически'
    ],
    dataLabel: 'Username получателя',
    copyLabel: 'Ваш username',
    emoji: '💎',
  },

  // Telegram Gift — gift link
  'telegram-gift': {
    icon: '🎁',
    title: 'Telegram Gift',
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    instructions: [
      'Нажмите на ссылку подарка ниже',
      'Ссылка откроется в Telegram',
      'Нажмите «Принять подарок»',
      'Подарок будет добавлен в вашу коллекцию'
    ],
    dataLabel: 'Ссылка на подарок',
    copyLabel: 'Скопировать ссылку',
    isLink: true,
    emoji: '🎁',
  },

  // Steam Gift — game gift
  'steam-gift': {
    icon: '🎮',
    title: 'Steam Gift',
    color: '#1B2838',
    gradient: 'linear-gradient(135deg, #1B2838 0%, #2a475e 100%)',
    instructions: [
      'Откройте клиент Steam на вашем компьютере',
      'Перейдите в «Библиотека» → «Активировать продукт в Steam»',
      'Введите ключ активации ниже',
      'Игра появится в вашей библиотеке'
    ],
    dataLabel: 'Ключ активации Steam',
    copyLabel: 'Скопировать ключ',
    emoji: '🎮',
  },

  // Steam TopUp — wallet replenishment
  'steam-topup': {
    icon: '💰',
    title: 'Steam Пополнение',
    color: '#66C0F4',
    gradient: 'linear-gradient(135deg, #66C0F4 0%, #1B2838 100%)',
    instructions: [
      'Откройте Steam → Ваш профиль → Кошелёк',
      'Нажмите «Пополнить кошелёк»',
      'Выберите «Активировать код кошелька»',
      'Введите код ниже',
      'Средства зачислятся на баланс Steam'
    ],
    dataLabel: 'Код пополнения',
    copyLabel: 'Скопировать код',
    emoji: '💰',
  },

  // Gift Card — generic
  'gift-card': {
    icon: '🎴',
    title: 'Подарочная карта',
    color: '#34C759',
    gradient: 'linear-gradient(135deg, #34C759 0%, #30B050 100%)',
    instructions: [
      'Используйте код подарочной карты ниже',
      'Перейдите на сайт сервиса',
      'Введите код в разделе «Активировать»',
      'Средства будут зачислены на ваш аккаунт'
    ],
    dataLabel: 'Код подарочной карты',
    copyLabel: 'Скопировать код',
    emoji: '🎴',
  },

  // Default — generic digital product
  'default': {
    icon: '📦',
    title: 'Цифровой товар',
    color: '#5AC8FA',
    gradient: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
    instructions: [
      'Ваш заказ готов!',
      'Скопируйте данные товара ниже',
      'Следуйте инструкциям в описании товара'
    ],
    dataLabel: 'Данные товара',
    copyLabel: 'Скопировать',
    emoji: '📦',
  },
};

/**
 * Determine product type from product name/category
 */
export function getProductConfig(productName = '', category = '') {
  const name = (productName + ' ' + category).toLowerCase();
  
  if (name.includes('star')) return DELIVERY_CONFIGS['telegram-stars'];
  if (name.includes('premium') && name.includes('telegram')) return DELIVERY_CONFIGS['telegram-premium'];
  if (name.includes('gift') && name.includes('telegram')) return DELIVERY_CONFIGS['telegram-gift'];
  if (name.includes('gift') && name.includes('steam')) return DELIVERY_CONFIGS['steam-gift'];
  if (name.includes('topup') || name.includes('top up') || name.includes('пополнен')) return DELIVERY_CONFIGS['steam-topup'];
  if (name.includes('gift card') || name.includes('подарочн')) return DELIVERY_CONFIGS['gift-card'];
  if (name.includes('steam')) return DELIVERY_CONFIGS['steam-gift'];
  
  return DELIVERY_CONFIGS['default'];
}

export const SITE_CONFIG = {
  name: 'BAZZAR',
  domain: 'bazzar-market.ru',
  tagline: 'Цифровые товары мгновенно',
  description: 'Telegram Stars, Steam игры, подарочные карты — моментальная доставка по лучшим ценам',
  telegram: '@bazzar_support',
  telegramLink: 'https://t.me/bazzar_support',
};
