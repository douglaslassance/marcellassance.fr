# Marcel Lassance - Website

A modern, elegant website for Marcel Lassance, créateur de vêtements (cloth designer), built with Astro.

## Features

- **Home Section**: Hero section with elegant typography
- **About Section**: Information about Marcel Lassance and his creative approach
- **Works Section**: Gallery showcasing collections and projects
- **Footer**: Contact information and navigation

## Tech Stack

- **Astro** - Modern static site builder
- **TypeScript** - Type-safe development
- Responsive design with modern CSS

## Getting Started

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

The site will be available at `http://localhost:4321/`

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable Astro components
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Works.astro
│   │   └── Footer.astro
│   ├── layouts/     # Page layouts
│   │   └── Layout.astro
│   └── pages/       # Page routes
│       └── index.astro
└── package.json
```

## Design Philosophy

The website reflects Marcel Lassance's minimalist aesthetic with:
- Clean, modern typography
- Elegant spacing and layout
- Smooth transitions and interactions
- Mobile-responsive design
- Neutral color palette

## Customization

To customize content, edit the components in `src/components/`:
- Update works in `Works.astro`
- Modify about text in `About.astro`
- Change contact info in `Footer.astro`

---

© 2024 Marcel Lassance. All rights reserved.

