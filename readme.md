# How To Deploy
Frontend dibangun diatas Javascript vanilla yang sebagian diload oleh CDN serta Prologue untuk SSR yang dioptimalkan untuk SEO.

Backend dibangun diatas Node JS v22 (LTS) & Supabase (Hosted) serta Redis untuk caching.

Caddy digunakan sebagai penghubung antara Frontend & Backend dengan metode reverse proxy.

* <a href="https://nim-lang.org/install_unix.html">Install Nim</a>
* Install Caddy <br>`sudo apt-get install caddy`

## Front End
### Set Up
```bash
nimble install prologue puppy nimja
```

### Start
```bash
nim c -d:release --outdir:build -r server/app
```

## Back End
Berada di repository terpisah: <a href="https://github.com/upiKerja/kajian-online">upiKerja/kajian-online</a>. Pastikan clone dan run pada root directory yang berbeda.

### Set Up
```bash
npm i
mv .env.example .env # Jangan lupa set up .env
```

### Start
```bash
npm run dev
```

## Reverse Proxy (Opsional)
Reverse Proxy dapat dilakukan dengan Caddy atau menggunakan Cloudflare Tunnel.
```bash
sudo caddy start
```
