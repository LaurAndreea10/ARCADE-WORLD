import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const indexPath = resolve(process.cwd(), 'index.html');
const scriptTag = '<script type="module" src="./src/ui/autoHudDashboard.js"></script>';

const original = readFileSync(indexPath, 'utf8');

if (original.includes(scriptTag)) {
  console.log('HUD dashboard script tag already present.');
  process.exit(0);
}

if (!original.includes('</body>')) {
  throw new Error('Could not find </body> in index.html.');
}

const updated = original.replace('</body>', `  ${scriptTag}\n</body>`);
writeFileSync(indexPath, updated);
console.log('HUD dashboard script tag added to index.html.');
