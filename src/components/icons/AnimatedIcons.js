'use client';

import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════
   Custom Animated SVG Icons — BAZZAR Brand Suite
   Each icon is handcrafted for the brand
   ═══════════════════════════════════════════════ */

// ─── Telegram Star Icon ───
export function StarIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { rotate: [0, -8, 8, -4, 0], scale: 1.1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <defs>
        <linearGradient id="starGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path
        d="M32 4L39.5 22.5L59 24L44 37.5L48 57L32 48L16 57L20 37.5L5 24L24.5 22.5Z"
        fill="url(#starGrad)"
        filter="url(#starGlow)"
        initial={animate ? { scale: 0, rotate: -180 } : {}}
        animate={animate ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
      />
      <motion.path
        d="M32 12L36.5 24L49 25.5L40 33.5L42.5 46L32 40L21.5 46L24 33.5L15 25.5L27.5 24Z"
        fill="rgba(255,255,255,0.3)"
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: [0, 0.4, 0.2, 0.4] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Sparkles */}
      {[{ cx: 12, cy: 12 }, { cx: 52, cy: 8 }, { cx: 56, cy: 48 }].map((s, i) => (
        <motion.circle key={i} cx={s.cx} cy={s.cy} r="2"
          fill="#FFD700"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}
    </motion.svg>
  );
}

// ─── Telegram Diamond Icon (Premium) ───
export function DiamondIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1, rotate: 5 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <linearGradient id="diamondGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="40%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <filter id="diamondGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Diamond shape */}
      <motion.path
        d="M32 6L54 24L32 58L10 24Z"
        fill="url(#diamondGrad)"
        filter="url(#diamondGlow)"
        initial={animate ? { scale: 0, y: 20 } : {}}
        animate={animate ? { scale: 1, y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.15 }}
      />
      {/* Top facet */}
      <path d="M32 6L54 24H10Z" fill="rgba(255,255,255,0.15)" />
      {/* Side shine */}
      <motion.path d="M32 6L20 24L32 58Z" fill="rgba(255,255,255,0.08)"
        animate={animate ? { opacity: [0.08, 0.2, 0.08] } : {}}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      {/* Center highlight */}
      <motion.path d="M32 16L42 24L32 48L22 24Z" fill="rgba(255,255,255,0.12)"
        animate={animate ? { opacity: [0.1, 0.25, 0.1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );
}

// ─── Steam Controller Icon ───
export function GamepadIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1, y: -4 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <linearGradient id="steamGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#1B2838" />
          <stop offset="50%" stopColor="#2A475E" />
          <stop offset="100%" stopColor="#66C0F4" />
        </linearGradient>
        <filter id="steamGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Body */}
      <motion.path
        d="M8 28C8 22 12 18 18 18H46C52 18 56 22 56 28V36C56 42 52 46 46 46H42L38 54H26L22 46H18C12 46 8 42 8 36V28Z"
        fill="url(#steamGrad)"
        stroke="rgba(102,192,244,0.3)"
        strokeWidth="1"
        filter="url(#steamGlow)"
        initial={animate ? { scale: 0 } : {}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 130, delay: 0.2 }}
      />
      {/* D-pad */}
      <rect x="18" y="28" width="12" height="3" rx="1.5" fill="rgba(102,192,244,0.6)" />
      <rect x="22.5" y="23.5" width="3" height="12" rx="1.5" fill="rgba(102,192,244,0.6)" />
      {/* Buttons */}
      <motion.circle cx="42" cy="26" r="3" fill="#66C0F4"
        animate={animate ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle cx="48" cy="30" r="3" fill="#66C0F4"
        animate={animate ? { opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <circle cx="42" cy="34" r="3" fill="rgba(102,192,244,0.4)" />
      <circle cx="36" cy="30" r="3" fill="rgba(102,192,244,0.4)" />
      {/* Light bar */}
      <motion.rect x="26" y="40" width="12" height="2" rx="1"
        fill="#66C0F4"
        animate={animate ? { opacity: [0.3, 0.8, 0.3] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// ─── Gift Card / Box Icon ───
export function GiftIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1, rotate: [-5, 5, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="giftGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#D946EF" />
        </linearGradient>
        <filter id="giftGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Ribbon */}
      <motion.path d="M32 8C26 8 22 12 22 16C22 20 32 24 32 24C32 24 42 20 42 16C42 12 38 8 32 8Z"
        fill="url(#giftGrad)" filter="url(#giftGlow)"
        initial={animate ? { y: -20, opacity: 0 } : {}}
        animate={animate ? { y: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
      />
      {/* Box */}
      <motion.rect x="10" y="24" width="44" height="12" rx="4"
        fill="url(#giftGrad)" filter="url(#giftGlow)"
        initial={animate ? { scaleX: 0 } : {}}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
      />
      <motion.rect x="14" y="36" width="36" height="22" rx="4"
        fill="url(#giftGrad)" opacity="0.85"
        initial={animate ? { scaleY: 0 } : {}}
        animate={animate ? { scaleY: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        style={{ transformOrigin: 'top' }}
      />
      {/* Vertical stripe */}
      <rect x="29" y="24" width="6" height="34" fill="rgba(255,255,255,0.2)" />
      {/* Horizontal stripe */}
      <rect x="14" y="43" width="36" height="4" fill="rgba(255,255,255,0.1)" />
      {/* Sparkle */}
      <motion.circle cx="22" cy="44" r="2" fill="rgba(255,255,255,0.5)"
        animate={animate ? { opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle cx="44" cy="40" r="1.5" fill="rgba(255,255,255,0.5)"
        animate={animate ? { opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </motion.svg>
  );
}

// ─── Lightning / Instant Delivery ───
export function LightningIcon({ size = 48, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      whileHover={animate ? { scale: 1.15 } : {}}
    >
      <defs>
        <linearGradient id="lightGrad" x1="16" y1="4" x2="32" y2="44">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <motion.path
        d="M26 4L10 28H22L18 44L38 18H26L30 4H26Z"
        fill="url(#lightGrad)"
        initial={animate ? { pathLength: 0, opacity: 0 } : {}}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.path
        d="M26 4L10 28H22L18 44L38 18H26L30 4H26Z"
        fill="rgba(255,255,255,0.3)"
        animate={animate ? { opacity: [0, 0.3, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.svg>
  );
}

// ─── Shield / Guarantee ───
export function ShieldIcon({ size = 48, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      whileHover={animate ? { scale: 1.1 } : {}}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="8" y1="4" x2="40" y2="44">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      <motion.path
        d="M24 4L8 12V22C8 34 15.5 41.5 24 44C32.5 41.5 40 34 40 22V12L24 4Z"
        fill="url(#shieldGrad)"
        initial={animate ? { scale: 0 } : {}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 130 }}
      />
      <motion.path
        d="M18 24L22 28L30 18"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : {}}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
    </motion.svg>
  );
}

// ─── Wallet / Payment ───
export function WalletIcon({ size = 48, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      whileHover={animate ? { scale: 1.1 } : {}}
    >
      <defs>
        <linearGradient id="walletGrad" x1="4" y1="8" x2="44" y2="40">
          <stop offset="0%" stopColor="#4DA6FF" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <motion.rect x="4" y="12" width="40" height="28" rx="6"
        fill="url(#walletGrad)"
        initial={animate ? { scaleX: 0 } : {}}
        animate={animate ? { scaleX: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
      />
      <rect x="4" y="12" width="40" height="8" rx="4" fill="rgba(0,0,0,0.2)" />
      <motion.circle cx="36" cy="30" r="4"
        fill="#fff"
        initial={animate ? { scale: 0 } : {}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
      />
      <circle cx="36" cy="30" r="2" fill="url(#walletGrad)" />
    </motion.svg>
  );
}

// ─── Headset / Support ───
export function SupportIcon({ size = 48, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      whileHover={animate ? { scale: 1.1 } : {}}
    >
      <defs>
        <linearGradient id="suppGrad" x1="8" y1="8" x2="40" y2="40">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#4DA6FF" />
        </linearGradient>
      </defs>
      <motion.path
        d="M12 28V24C12 17.4 17.4 12 24 12C30.6 12 36 17.4 36 24V28"
        stroke="url(#suppGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={animate ? { pathLength: 0 } : {}}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.rect x="8" y="26" width="8" height="12" rx="4"
        fill="url(#suppGrad)"
        initial={animate ? { y: 10, opacity: 0 } : {}}
        animate={animate ? { y: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', delay: 0.3 }}
      />
      <motion.rect x="32" y="26" width="8" height="12" rx="4"
        fill="url(#suppGrad)"
        initial={animate ? { y: 10, opacity: 0 } : {}}
        animate={animate ? { y: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', delay: 0.4 }}
      />
    </motion.svg>
  );
}

// ─── Animated Check Circle (for delivery) ───
export function CheckCircleIcon({ size = 100 }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="checkCircleGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="successGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Outer ring */}
      <motion.circle cx="50" cy="50" r="46" stroke="url(#checkCircleGrad)" strokeWidth="2.5" fill="none"
        filter="url(#successGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
      />
      {/* Inner glow fill */}
      <motion.circle cx="50" cy="50" r="40" fill="rgba(34,197,94,0.06)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
      />
      {/* Checkmark */}
      <motion.path d="M30 50L44 65L70 35"
        stroke="url(#checkCircleGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        filter="url(#successGlow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      />
      {/* Sparkle particles */}
      {[
        { cx: 82, cy: 18, r: 3, d: 1.2 },
        { cx: 88, cy: 55, r: 2, d: 1.8 },
        { cx: 15, cy: 80, r: 2.5, d: 2.2 },
        { cx: 10, cy: 25, r: 2, d: 1.5 },
      ].map((p, i) => (
        <motion.circle key={i} cx={p.cx} cy={p.cy} r={p.r}
          fill="#22C55E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: p.d }}
        />
      ))}
    </motion.svg>
  );
}

// ─── Telegram Paper Plane ───
export function TelegramIcon({ size = 48, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      whileHover={animate ? { x: 4, y: -4, scale: 1.1 } : {}}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <linearGradient id="tgGrad" x1="4" y1="4" x2="44" y2="44">
          <stop offset="0%" stopColor="#2AABEE" />
          <stop offset="100%" stopColor="#229ED9" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#tgGrad)" />
      <motion.path
        d="M12 24L18 22L30 16L22 26L20 34L24 29L28 33L36 14L12 24Z"
        fill="#fff"
        initial={animate ? { x: -10, opacity: 0 } : {}}
        animate={animate ? { x: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
      />
    </motion.svg>
  );
}

// ─── Rocket / Fast Delivery ───
export function RocketIcon({ size = 48, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 48 48" fill="none"
      whileHover={animate ? { y: -6, rotate: -5 } : {}}
      transition={{ duration: 0.3 }}
    >
      <defs>
        <linearGradient id="rocketGrad" x1="12" y1="4" x2="36" y2="44">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Flame */}
      <motion.path d="M24 44C24 44 18 38 20 34C22 30 26 30 28 34C30 38 24 44 24 44Z"
        fill="#FBBF24"
        animate={animate ? { scaleY: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
      <motion.path d="M24 40C24 40 21 36 22 34C23 32 25 32 26 34C27 36 24 40 24 40Z"
        fill="#F59E0B"
        animate={animate ? { scaleY: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      {/* Body */}
      <motion.path
        d="M24 6C24 6 16 14 16 28L20 34H28L32 28C32 14 24 6 24 6Z"
        fill="url(#rocketGrad)"
        initial={animate ? { y: 20, opacity: 0 } : {}}
        animate={animate ? { y: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120 }}
      />
      {/* Window */}
      <circle cx="24" cy="20" r="4" fill="#fff" opacity="0.9" />
      <circle cx="24" cy="20" r="2.5" fill="#1e1e2e" />
      {/* Fins */}
      <path d="M16 28L10 34L16 32Z" fill="url(#rocketGrad)" opacity="0.7" />
      <path d="M32 28L38 34L32 32Z" fill="url(#rocketGrad)" opacity="0.7" />
    </motion.svg>
  );
}

// ─── Shared Account / People Icon ───
export function AccountIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1, rotate: 3 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <linearGradient id="acctGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#4DA6FF" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <filter id="acctGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Main person */}
      <motion.circle cx="32" cy="18" r="9"
        fill="url(#acctGrad)" filter="url(#acctGlow)"
        initial={animate ? { scale: 0 } : {}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
      />
      <motion.path d="M16 50C16 40 23 34 32 34C41 34 48 40 48 50"
        fill="url(#acctGrad)" filter="url(#acctGlow)" opacity="0.9"
        initial={animate ? { scaleY: 0 } : {}}
        animate={animate ? { scaleY: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        style={{ transformOrigin: 'bottom' }}
      />
      {/* Second person (behind) */}
      <motion.circle cx="46" cy="22" r="7"
        fill="url(#acctGrad)" opacity="0.5"
        initial={animate ? { x: 10, opacity: 0 } : {}}
        animate={animate ? { x: 0, opacity: 0.5 } : {}}
        transition={{ delay: 0.3 }}
      />
      <motion.path d="M36 52C36 44 40 40 46 40C52 40 56 44 56 52"
        fill="url(#acctGrad)" opacity="0.35"
        initial={animate ? { x: 10, opacity: 0 } : {}}
        animate={animate ? { x: 0, opacity: 0.35 } : {}}
        transition={{ delay: 0.4 }}
      />
      {/* Sparkle */}
      <motion.circle cx="50" cy="14" r="2" fill="#818CF8"
        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  );
}

// ─── Certificate / Award Icon ───
export function CertificateIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1, y: -3 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <linearGradient id="certGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="certGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Certificate body */}
      <motion.rect x="8" y="8" width="48" height="36" rx="6"
        fill="url(#certGrad)" filter="url(#certGlow)"
        initial={animate ? { scaleX: 0, opacity: 0 } : {}}
        animate={animate ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 130, delay: 0.1 }}
      />
      {/* Inner border */}
      <rect x="14" y="14" width="36" height="24" rx="3"
        stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      {/* Star in center */}
      <motion.path d="M32 18L34 24L40 25L35.5 29L37 35L32 32L27 35L28.5 29L24 25L30 24Z"
        fill="rgba(255,255,255,0.6)"
        animate={animate ? { opacity: [0.4, 0.8, 0.4], rotate: [0, 5, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '32px 26px' }}
      />
      {/* Ribbons hanging */}
      <motion.path d="M24 44L24 56L28 52L32 56L32 44"
        fill="url(#certGrad)" opacity="0.7"
        initial={animate ? { scaleY: 0 } : {}}
        animate={animate ? { scaleY: 1 } : {}}
        transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.path d="M32 44L32 56L36 52L40 56L40 44"
        fill="url(#certGrad)" opacity="0.5"
        initial={animate ? { scaleY: 0 } : {}}
        animate={animate ? { scaleY: 1 } : {}}
        transition={{ type: 'spring', stiffness: 100, delay: 0.4 }}
        style={{ transformOrigin: 'top' }}
      />
      {/* Sparkles */}
      {[{ cx: 10, cy: 12 }, { cx: 54, cy: 10 }].map((s, i) => (
        <motion.circle key={i} cx={s.cx} cy={s.cy} r="2"
          fill="#FBBF24"
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}
    </motion.svg>
  );
}

// ─── Apple Developer Icon ───
export function AppleDevIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <linearGradient id="appleGrad" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="#E5E7EB" />
          <stop offset="50%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <filter id="appleGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Apple shape */}
      <motion.path
        d="M42 20C42 14 38 10 34 10C32 10 30 12 28 12C26 12 24 10 22 12C18 15 16 22 18 30C20 38 24 46 28 50C30 52 32 52 34 50C38 46 44 38 44 30C44 26 43 22 42 20Z"
        fill="url(#appleGrad)" filter="url(#appleGlow)"
        initial={animate ? { scale: 0 } : {}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
      />
      {/* Leaf */}
      <motion.path d="M32 10C32 10 36 4 42 6"
        stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={animate ? { pathLength: 0 } : {}}
        animate={animate ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      {/* Inner shine */}
      <motion.path d="M26 20C28 18 30 18 32 20C30 22 26 30 24 28C22 26 24 22 26 20Z"
        fill="rgba(255,255,255,0.15)"
        animate={animate ? { opacity: [0.1, 0.25, 0.1] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Code brackets overlay < / > */}
      <motion.text x="23" y="36" fontSize="14" fontWeight="900" fill="rgba(0,0,0,0.3)"
        fontFamily="monospace"
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: [0.2, 0.4, 0.2] } : {}}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        {'</>'}
      </motion.text>
    </motion.svg>
  );
}

// ─── BAZZAR App (Phone) Icon ───
export function BazzarAppIcon({ size = 64, animate = true }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none"
      whileHover={animate ? { scale: 1.1, y: -3 } : {}}
      transition={{ duration: 0.4 }}
    >
      <defs>
        <linearGradient id="appGrad" x1="16" y1="4" x2="48" y2="60">
          <stop offset="0%" stopColor="#4DA6FF" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="appScreenGrad" x1="20" y1="12" x2="44" y2="50">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0d0d15" />
        </linearGradient>
        <filter id="appGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Phone body */}
      <motion.rect x="18" y="4" width="28" height="56" rx="7"
        fill="url(#appGrad)" filter="url(#appGlow)"
        initial={animate ? { y: 20, opacity: 0 } : {}}
        animate={animate ? { y: 0, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
      />
      {/* Screen */}
      <rect x="21" y="12" width="22" height="40" rx="3" fill="url(#appScreenGrad)" />
      {/* Dynamic Island */}
      <rect x="28" y="7" width="8" height="3" rx="1.5" fill="rgba(0,0,0,0.5)" />
      {/* BAZZAR B logo on screen */}
      <motion.text x="32" y="36" fontSize="16" fontWeight="900" fill="rgba(255,255,255,0.9)"
        textAnchor="middle" fontFamily="sans-serif"
        initial={animate ? { scale: 0 } : {}}
        animate={animate ? { scale: 1 } : {}}
        transition={{ type: 'spring', delay: 0.3 }}
      >
        B
      </motion.text>
      {/* Screen glow ring */}
      <motion.circle cx="32" cy="33" r="10"
        stroke="url(#appGrad)" strokeWidth="1" fill="none" opacity="0.4"
        animate={animate ? { r: [10, 12, 10], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Bottom bar */}
      <rect x="28" y="55" width="8" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      {/* Sparkles */}
      <motion.circle cx="14" cy="16" r="2" fill="#4DA6FF"
        animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle cx="52" cy="50" r="1.5" fill="#A855F7"
        animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
      />
    </motion.svg>
  );
}

// ─── Copy Icon ───
export function CopyIcon({ size = 20, copied = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {copied ? (
        <motion.path d="M5 10L8.5 13.5L15 6.5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
      ) : (
        <>
          <rect x="6" y="6" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 14V5C4 3.9 4.9 3 6 3H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
