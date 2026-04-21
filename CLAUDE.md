# Westfield Consulting Partners — Website

## Project Overview
Modern, single-page corporate website for Westfield Consulting Partners, a specialized engineering staffing and recruitment agency.

## Tech Stack
- Pure HTML/CSS/JS (no build tools)
- GSAP + ScrollTrigger for scroll animations
- Google Fonts: Inter (sans), Playfair Display (serif)
- No CMS — static site

## Brand Colors
- Navy: `#0F1C2E`
- Blue: `#2874A6`
- Light Blue: `#5DADE2`
- White: `#FFFFFF`

## Structure
```
westfield/
├── index.html          # Main single-page site
├── css/style.css       # All styles
├── js/main.js          # Animations, interactions, form
├── assets/             # Video and media files
├── wcp-logo.png        # Dark background logo
├── wcp-logo-light.png  # Light/white logo
├── wcp-icon.png        # Icon mark (dark)
└── wcp-icon-light.png  # Icon mark (light)
```

## Key Features
- Video background hero section (needs `assets/hero-video.mp4`)
- Parallax scrolling effects
- GSAP scroll-triggered animations
- Custom cursor (desktop only)
- Counter animations for stats
- Mobile responsive with hamburger menu
- Contact form → mailto: (sends via user's email client)
- Preloader animation

## Sections
1. Hero (video bg + CTAs)
2. About + Stats
3. Why WCP (3 pillars)
4. Services
5. Industries (8 cards)
6. Parallax CTA Banner
7. Careers (job seekers)
8. Contact (form + info)
9. Footer

## Notes
- Hero video placeholder: add `assets/hero-video.mp4` — a corporate/engineering themed ambient video
- Contact form uses mailto: — no backend needed
- No CMS integration planned currently
- Deploy target: TBD (likely Vercel)
