# ✨ Crossfield — Cross-Disciplinary Learning Explorer

> **Learning that bridges the gap.** An immersive, interactive single-page explorer designed for university students to bridge the cognitive divide between fields of study.

check it out @ https://praanesh-s.github.io/Crossfield/
---

## 🌌 The Vision

Higher education is increasingly siloed. Engineers write code without understanding the business models that fund them. Lawyers draft technology agreements without grasping the architecture of the databases they regulate. Business leaders manage products without understanding the design methodologies that dictate customer retention.

**Crossfield** exists to dismantle these silos. 

By mapping the connection vectors between distinct disciplines, Crossfield helps students find what they are missing. It curates custom syllabus paths that translate complex theories into immediate, actionable models relative to their current fields of study. 

---

## 🎨 Design Philosophy

Crossfield is built with a **dark cosmic, liquid glassmorphism** aesthetic. 
* **Dynamic Canvas**: Two large drifting ambient orbs (gold and indigo) float behind a subtle SVG noise matrix, mimicking a cosmic fog.
* **Cinematic Physics**: Layouts drift with scroll parallax. Cards expand and shimmer. Page transitions blur and dissolve, creating a highly premium, tactile desktop experience.
* **Liquid Waves**: SVG wave layers animate to morph and partition key sections of the layout.

---

## 🛠️ Stack & Architecture

* **Core**: React (Vite-powered)
* **Styling**: Tailwind CSS v4 (using the `@tailwindcss/vite` inline compiler for hyper-optimized build sizes)
* **Animations**: Pure CSS keyframes and transitions for 60fps rendering, avoiding heavy libraries like Framer Motion.
* **SEO**: Built with semantic HTML elements and descriptive meta tags.

---

## 📂 Project Structure

```
crossfield/
├── dist/                # Production build artifacts
├── src/
│   ├── App.jsx          # Core App container (state, cards, curricula content)
│   ├── App.css          # App spacer overrides
│   ├── index.css        # Tailwind directives, Google Font imports, custom keyframe rules
│   └── main.jsx         # App bootstrapping
├── index.html           # Document template, Google Font linkages, and SEO parameters
├── package.json         # Package configuration
└── vite.config.js       # Vite configuration with Tailwind v4 compilation plugin
```

---

## 🚀 Running Locally

To start the development server:

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

The application will launch on your local host (usually `http://localhost:5173/` or `http://localhost:5174/`).

---

*Created with passion for Cross-Disciplinary education by Praanesh Srinivasan.*
