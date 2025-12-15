#!/usr/bin/env node

// Generate Prisma client using dynamic import to avoid ES module conflicts
import { createRequire } from 'module';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Use require for Prisma CLI
const require = createRequire(import.meta.url);

// Try to run prisma generate
const prismaPath = join(rootDir, 'node_modules', '.bin', 'prisma');

const child = spawn('node', [prismaPath, 'generate'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    // Force CommonJS for Prisma
    NODE_OPTIONS: '',
  },
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});


