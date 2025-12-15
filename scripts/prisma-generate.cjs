#!/usr/bin/env node

// Wrapper script to run Prisma generate in CommonJS mode
// This is needed because Prisma CLI has issues with ES modules

const { spawn } = require('child_process');
const path = require('path');

const prismaPath = path.join(__dirname, '..', 'node_modules', '.bin', 'prisma');
const args = process.argv.slice(2);

const child = spawn('node', [prismaPath, ...args], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--no-warnings',
  },
});

child.on('exit', (code) => {
  process.exit(code || 0);
});


