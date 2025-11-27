# Prahlad Singh – Production Portfolio

This repository contains the fully static, Netlify-ready portfolio for **Prahlad Singh**, Computer Science student at RGPV University (Bhopal) and fullstack developer.

## Stack & Integrations

- **Frontend**: HTML5 + Tailwind v3.4 + custom CSS overrides
- **Animations**: AOS (20+ triggers), custom cursor trail, glow states
- **Visuals**: Three.js r165 CSS3D carousel, particles.js background, Chart.js radar
- **AI/Realtime**:
  - Live GitHub stats (stars + push commits) refreshed every 30 seconds
  - GPT-3.5-turbo chatbot (bring your own API key, stored locally)
  - Voice resume powered by the Web Speech API
- **PWA**: Install-ready (manifest + service worker + offline cache)

## Local Usage

1. Clone or download the repo.
2. Serve the `prahlad-portfolio/` directory with any static server (e.g. `npx serve`).
3. Optional: add your OpenAI key inside the chatbot widget for live responses.

## Deployment (Netlify Recommended)

1. **Download ZIP → Extract**
2. **netlify.com → “Deploy site” → Drag folder**
3. **OR GitHub → New repo → Push → Netlify connect**
4. Live target URL suggestion: `https://prahlad-portfolio.netlify.app`
5. Custom domain: add CNAME + DNS (optional)

GitHub Pages fallback: push this folder to a repo and enable Pages (root). Service worker + manifest already configured.

## Feature Checklist

- [x] Hero with particles, parallax CTA, typing headline
- [x] About section with Hindi/English bio + Chart.js radar
- [x] Three.js 3D carousel (drag/wheel rotate)
- [x] AI chatbot bubble (GPT-3.5-turbo)
- [x] Voice resume (Hindi narration)
- [x] Mouse glow trail + glassmorphism UI
- [x] Real-time GitHub stats
- [x] Contact form validation + success toast
- [x] Dark / light persistence
- [x] Scroll-triggered animations (AOS)
- [x] Loading top progress bar
- [x] PWA install prompt ready

## Environment Notes

- All dependencies come via CDN (unpkg / jsDelivr / CDNJS) to keep hosting free-tier friendly.
- No build tooling required; single drag-and-drop deploy works on Netlify, Vercel static, GitHub Pages, or any S3 bucket.

Happy shipping! 🚀



