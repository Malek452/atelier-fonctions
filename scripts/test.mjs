import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
await mkdir('.cache', { recursive: true });
// One deterministic process uses Node's built-in TAP runner. Separate dynamic
// imports ensure jsdom globals exist before Testing Library binds `screen`.
await build({
  entryPoints: [
    'tests/setup.ts',
    'tests/validation.test.ts',
    'tests/mathematics.test.ts',
    'tests/interactions.test.tsx',
    'tests/animation.test.ts',
    'tests/teaching-details.test.ts',
  ],
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'node',
  packages: 'external',
  outdir: '.cache/tests',
  target: 'node22',
  jsx: 'automatic',
});
// Bundle Motion Canvas itself for the scheduler regression (its published
// extensionless imports otherwise require the browser bundler).
await build({
  entryPoints: ['tests/timing.test.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: '.cache/tests/timing.test.js',
  target: 'node22',
});
await writeFile(
  '.cache/tests/run.mjs',
  "await import('./setup.js');\nawait import('./validation.test.js');\nawait import('./mathematics.test.js');\nawait import('./interactions.test.js');\nawait import('./animation.test.js');\nawait import('./teaching-details.test.js');\nawait import('./timing.test.js');\n",
);
const child = spawn(
  process.execPath,
  [
    '--test',
    '--test-isolation=none',
    '--test-reporter=tap',
    '--test-concurrency=1',
    '.cache/tests/run.mjs',
  ],
  { stdio: 'inherit' },
);
child.on('exit', (code, signal) => {
  process.exitCode = code ?? 1;
  if (signal) console.error('Test runner terminated by ' + signal);
});
child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
