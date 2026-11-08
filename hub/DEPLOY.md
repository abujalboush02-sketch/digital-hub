# Deploying the hub (static build -> VPS behind nginx)

## Build (on your machine)
    cd hub
    npm ci
    npm run check        # i18n audit + production build -> hub/dist
    npm run preview      # optional: serve dist locally at http://localhost:4173

`dist/` contains: `index.html` (EN, device-language default), `ar/index.html` (Arabic route for hreflang),
`assets/` (hashed JS/CSS/fonts), `og.png`, `favicon.svg`, `robots.txt`, `sitemap.xml`,
and **`payment-config.js`** (the E-Book order page loads it from the bare domain; keep it).

## Upload
    rsync -avz --delete dist/ USER@VPS:/var/www/hub/
`--delete` is safe only because /var/www/hub holds nothing but the hub. First deploy: create the folder
(`sudo mkdir -p /var/www/hub && sudo chown USER /var/www/hub`).

## nginx (bare domain serves the hub; portfolio. redirects)
    server {
        listen 443 ssl http2;
        server_name mohammad-abujalboush.com www.mohammad-abujalboush.com;
        # ssl_certificate ... (your existing certbot lines)
        root /var/www/hub;
        index index.html;

        gzip on;
        gzip_types text/css application/javascript image/svg+xml application/json application/xml text/plain;
        gzip_min_length 512;

        add_header X-Content-Type-Options nosniff always;
        add_header Referrer-Policy strict-origin-when-cross-origin always;

        location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
        location = /payment-config.js { add_header Cache-Control "no-cache"; }
        location = /sitemap.xml { add_header Cache-Control "no-cache"; }
        location / { try_files $uri $uri/index.html =404; add_header Cache-Control "no-cache"; }
    }

    # portfolio is merged into the hub
    server {
        listen 443 ssl http2;
        listen 80;
        server_name portfolio.mohammad-abujalboush.com;
        # ssl_certificate ... (existing lines for this host)
        return 301 https://mohammad-abujalboush.com/;
    }

Then: `sudo nginx -t && sudo systemctl reload nginx`.

## After deploy
1. Run `hub/sql/contact_messages.sql` in Supabase, send one test message, find it in Admin -> 01c_Messages.
2. `curl -I https://mohammad-abujalboush.com/payment-config.js` -> 200 (E-Book depends on it).
3. `curl -I https://portfolio.mohammad-abujalboush.com/` -> 301 to the hub.
4. Check `/ar/`, `/robots.txt`, `/sitemap.xml`; submit the sitemap in Search Console.
5. Run Lighthouse (mobile) in Chrome DevTools on `/` and `/ar/`.
6. The old `main/index.html` is superseded by this build; remove it from the repo once the VPS serves `dist/`.
