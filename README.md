# Seyed CJ — Portfolio

<p align="center">
  <img src="/public/portfolio.png" alt="Portfolio preview" width="100%" />
</p>

<p align="center">
  A modern, animated, multilingual portfolio built with Next.js, TypeScript, and Tailwind CSS.
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#project-structure">Project Structure</a> ·
  <a href="#deployment">Deployment</a>
</p>

---

## Features

- 🎨 **Modern, minimal design** — dark theme with smooth glow/gradient accents
- 🌍 **Multilingual (i18n)** — powered by `next-intl`, supports English and Persian (Farsi) with RTL support
- ✨ **Smooth animations** — page and section transitions built with `framer-motion`
- 📱 **Fully responsive** — optimized for mobile, tablet, and desktop
- 🖼️ **Project showcase** — image-based project cards with hover previews and links to live demo / source code
- 📬 **Contact section** — direct email, phone, and Telegram links plus social profiles
- ⚡ **Optimized performance** — `next/image` for automatic image optimization, self-hosted fonts via `next/font`

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Internationalization:** [next-intl](https://next-intl.dev)
- **Icons:** [Lucide](https://lucide.dev)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Project Structure

```
.
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable UI components and sections
├── fonts/          # Self-hosted font files
├── i18n/           # Internationalization config and routing
├── lib/            # Utility functions
├── messages/       # Translation files (en.json, fa.json, ...)
└── public/         # Static assets (images, favicon, etc.)
```

## Deployment

The easiest way to deploy this project is with the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other deployment options.

## License

This project is open source. Feel free to use it as inspiration for your own portfolio.