# ✨ Crossfield — Cross-Disciplinary Learning Explorer

> **Learning that bridges the gap.** An immersive, interactive single-page explorer designed for university students to bridge the cognitive divide between fields of study.

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

## 🐙 Connecting to GitHub

To push this project to your GitHub account:

1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Crossfield Web Explorer"
   ```

2. **Create a Repository on GitHub**:
   Go to [github.com/new](https://github.com/new) and create a repository named `crossfield` (do *not* initialize with a README, `.gitignore`, or license).

3. **Link Remote and Push**:
   ```bash
   # Replace <your-username> with your actual GitHub username
   git remote add origin https://github.com/YOUR_USERNAME/crossfield.git
   git branch -M main
   git push -u origin main
   ```

---

## 📦 Deploying to GitHub Pages

To host your Crossfield application for free on GitHub Pages, follow these steps:

### 1. Update `vite.config.js`
Vite needs to know your repository name to resolve asset paths correctly. Modify your `vite.config.js` to include the `base` property matching your repository name:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/crossfield/', // Set to '/<repo-name>/' for GitHub Pages
})
```

### 2. Configure GitHub Pages Deployment (Choose Option A or B)

#### Option A: GitHub Actions (Recommended)
This method automatically builds and deploys your site every time you push to the `main` branch.

1. Create a directory structure `.github/workflows` in the root of your project:
   ```bash
   mkdir -p .github/workflows
   ```
2. Create a file named `deploy.yml` in that folder:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: 'main'

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: 'pages'
     cancel-in-progress: true

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - name: Install dependencies
           run: npm ci
         - name: Build site
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```
3. Commit and push the workflow file.
4. On GitHub, go to your repository **Settings** → **Pages**. Under **Build and deployment** → **Source**, select **GitHub Actions**.

#### Option B: Manual CLI Script Deployment
Alternatively, you can deploy directly from your local terminal using the `gh-pages` helper package:

1. Install the deployment helper:
   ```bash
   npm install -D gh-pages
   ```
2. Add the following scripts to your `package.json` under `"scripts"`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run the deploy script:
   ```bash
   npm run deploy
   ```
   This will build your site and push the output of the `dist` directory to a new `gh-pages` branch on GitHub.
4. On GitHub, go to your repository **Settings** → **Pages**. Under **Build and deployment** → **Branch**, select `gh-pages` and folder `/ (root)`. Click **Save**.

Your app will be live at: `https://<your-username>.github.io/crossfield/`

---
*Created with passion for Cross-Disciplinary education by Praanesh Srinivasan.*
