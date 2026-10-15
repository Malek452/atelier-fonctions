import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

// The React build follows the Motion Canvas build. A fingerprinted entry keeps
// returning students from loading an older player from their browser cache.
const motionManifest = JSON.parse(
  readFileSync(new URL('./public/animations/manifest.json', import.meta.url), 'utf8'),
);
const playerFile = motionManifest['motion/player.ts']?.file;
if (!playerFile) throw new Error('Run npm run build:motion before starting the React app.');
export default defineConfig({
  base: './',
  plugins: [react()],
  define: { __MOTION_PLAYER_URL__: JSON.stringify(`animations/${playerFile}`) },
  build: { target: 'es2022' },
});
