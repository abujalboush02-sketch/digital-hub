OmniNode website (index, docs, legal) - English + Arabic, auto language by device.

Upload the whole folder to the web root of omni.mohammad-abujalboush.com.

Before going live, check assets/site.js (top):
  appUrl       https://omniapp.mohammad-abujalboush.com
  registerPath /#/register   (change if the app uses path URLs, e.g. /register)
  loginPath    /#/login
  apiBase      https://omniapi.mohammad-abujalboush.com   (your real HTTPS API domain)
  email        moe.abujalboush@gmail.com

Prices live in one place: the BIZ / AG arrays near the bottom of index.html.
Arabic text: assets/i18n-*-ar.js. English text is in the HTML.
Force a language with ?lang=ar or ?lang=en.
