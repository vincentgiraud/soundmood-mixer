# SoundMood Mixer

Discover music that matches your mood through a playful, beautiful quiz interface.

## Mission
SoundMood Mixer helps users discover music genres that match their current emotional state through an intuitive, visually appealing mood-selection experience.

## Key Features
- Mood selection grid with emoji-driven buttons
- Hardcoded genre-matching algorithm to surface relevant recommendations
- Animated result cards with descriptions and visual feedback
- Persistent last-result state so returning users see their previous discovery
- Polished visual design: gradients, glassmorphism, and subtle animations

## Design & Experience
- Visual tone: modern, playful, and elegant with a touch of whimsy
- Color strategy: gradient purple → cyan background with high-contrast foregrounds
- Typography: Inter for clean, readable text
- Animations: subtle, purposeful transitions to enhance delight without distraction

## Getting Started
Prerequisites: Node.js (v18+ recommended) and npm or pnpm

Clone the repository and install dependencies:

```bash
git clone https://github.com/vincentgiraud/soundmood-mixer.git
cd soundmood-mixer
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure (high level)
- `src/` — application source files
  - `App.tsx`, `main.tsx` — app entry points
  - `components/` — reusable UI components and design system
  - `styles/` — theme and global styles
  - `assets/` — images and brand assets
- `src/prd.md` — Product Requirements Document (design intent and decisions)

## Development Notes
- Animations use Framer Motion and are tuned to be performant on typical devices
- State persistence uses the `useKV` hook to store the last result for returning users
- Tailwind CSS is used for responsive layout and consistent spacing

## Contributing
All contributions, bug reports, and feature requests are welcome.
- Create an issue to discuss larger changes before implementing
- Fork the repo and open a pull request with a clear description of your changes
- Follow existing code style and add tests where applicable

## License
This project is released under the MIT License. See the `LICENSE` file for details.

---

If you'd like the README translated to French or expanded with screenshots and usage examples, tell me what you'd like included.
