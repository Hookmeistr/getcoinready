// ═══════════════════════════════════════════════════════════
// GetCoinReady — Affiliate Link Configuration
// ═══════════════════════════════════════════════════════════
// This is the ONLY file you need to edit when affiliate links
// are approved. Every button and link across the entire site
// reads from this file automatically.
//
// HOW TO UPDATE:
// 1. Go to your GitHub repository
// 2. Click on config.js
// 3. Click the pencil (edit) icon
// 4. Replace the '#' next to the platform name with your
//    actual affiliate URL (keep the quotes around it)
// 5. Click "Commit changes"
// 6. Netlify will redeploy in ~60 seconds
//
// EXAMPLE — changing Coinbase from placeholder to real link:
//   BEFORE:  coinbase: '#',
//   AFTER:   coinbase: 'https://coinbase.com/join/YOUR_CODE',
// ═══════════════════════════════════════════════════════════

var AFFILIATE = {

  // ── Primary Exchange Links ──────────────────────────────
  coinbase: '#',    // Pending approval — coinbase.com/affiliates
  kraken:   '#',    // Pending approval — kraken.com/affiliates
  gemini:   '#',    // Pending approval — gemini.com/affiliates
  cashapp:  '#',    // Pending approval — cash.app/referral

  // ── Hardware Wallet Links (Cold Wallets) ────────────────
  ledger:   'https://shop.ledger.com/?r=e72bf9d5a165',    // Pending — ledger.com affiliate program
  trezor:   '#',    // Pending — trezor.io affiliate program

  // ── Disclosure text shown near every affiliate button ───
  disclosure: 'Affiliate link — we may earn a small referral fee at no cost to you. This never influences our recommendations.',

};

// Make globally available
if(typeof window !== 'undefined') window.AFFILIATE = AFFILIATE;
