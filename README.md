# 🧬 Biohazard Archive: Resident Evil Event Map

<div align="center">

![Resident Evil](https://img.shields.io/badge/Resident%20Evil-Fan%20Project-red?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMiAyMGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6Ii8+PC9zdmc+)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/Three.js-r183-black?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)

**An immersive 3D interactive world map documenting every major biohazard incident in the Resident Evil universe.**

[Live Demo](https://vittoriocodes.github.io/RE_World_Map/) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📸 Preview

> A dark, atmospheric globe rendered in Umbrella red wireframe — spin it, zoom into infected zones, and follow your favorite characters across the world.

---

## ✨ Features

### 🌍 Interactive 3D Globe
A fully navigable 3D Earth built with React Three Fiber and Three.js. Real topographic displacement maps give the globe a raised terrain feel with actual land elevation.

### 🎯 Character Path Tracking
Select any character — Chris Redfield, Jill Valentine, Leon S. Kennedy, and more — to highlight every location they visited across the series, connected with animated paths in chronological game order.

### 🧪 Virus Database
An in-universe "Umbrella classified" tablet interface detailing every major pathogen in the franchise: T-Virus, G-Virus, Las Plagas, Uroboros, Mutamycete, and the mysterious Elanthropus virus from RE9 Requiem.

### 📍 Location Intel Panels
Click any map marker to pull up a classified dossier on that location — which games it appeared in, which operatives were deployed there, and a lore summary of the incident.

### 📺 Nostalgia Mode
Toggle a CRT shader overlay for retro horror aesthetics. Crank it to MAX for full scanlines, chromatic aberration, pixelation, bloom, and glitch effects powered by `@react-three/postprocessing`.

### 🌐 10 Languages
Full localization in English, Turkish, Spanish, French, German, Italian, Portuguese, Russian, Chinese, and Japanese via `i18next`.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| 3D Engine | Three.js r183 + React Three Fiber |
| 3D Helpers | @react-three/drei, @react-three/postprocessing |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| i18n | i18next + react-i18next |
| Icons | Lucide React |
| Hosting | GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/VittorioCodes/RE_World_Map.git
cd RE_World_Map

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready for static hosting.

---

## 🗺️ Locations Covered

| Location | Games | Key Characters |
|---|---|---|
| Raccoon City & Arklay Mountains | RE0, RE1, RE2, RE3, RE9 | Chris, Jill, Leon, Claire, Ada, Grace |
| Rockfort Island | RE Code: Veronica | Claire, Chris |
| Valdelobos, Spain | RE4 | Leon, Ada |
| Kijuju, West Africa | RE5 | Chris, Jill |
| Tall Oaks, USA | RE6 | Leon, Ada |
| Edonia, Eastern Europe | RE6 | Chris, Ada |
| Lanshiang, China | RE6 | Leon, Chris, Ada |
| Dulvey, Louisiana | RE7 | Ethan, Chris |
| The Village, Romania | RE8 | Ethan, Chris |

---

## 🙏 Credits & Acknowledgements

### Character Artwork
Special thanks to **[EvilSource.com](https://www.evilsource.com)** for kindly granting permission to use their character artwork in this project. Character images for **Ada Wong** and **Chris Redfield** are sourced from EvilSource.com — an excellent Resident Evil fan resource. Please visit and support their work.

### Libraries & Tools
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) — 3D rendering in React
- [Three.js](https://threejs.org/) — WebGL 3D engine
- [i18next](https://www.i18next.com/) — Internationalization
- [Lucide React](https://lucide.dev/) — Icon library
- [Motion](https://motion.dev/) — Animation library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS

---

## ⚠️ Legal Disclaimer

*Resident Evil* and *Biohazard* are registered trademarks of **Capcom Co., Ltd.** This is a non-commercial, fan-made project created for educational and entertainment purposes only. No copyright infringement is intended. All game assets, lore, and character names belong to their respective owners.

Character artwork for Ada Wong and Chris Redfield used with permission from [EvilSource.com](https://www.evilsource.com).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by a Resident Evil fan. Stay vigilant. The T-Virus is closer than you think.</sub>
</div>
