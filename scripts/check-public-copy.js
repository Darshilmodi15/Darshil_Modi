const fs = require('fs');
const path = require('path');

const roots = ['app', 'components', 'lib', 'public'];
const extensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.xml', '.txt']);
const banned = [/Résumé/g, /résumé/g, /—/g, /–/g, /Presents/g];
const issues = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (extensions.has(path.extname(file))) {
      const text = fs.readFileSync(file, 'utf8');
      const lines = text.split(/\r?\n/);
      lines.forEach((line, index) => {
        for (const pattern of banned) {
          if (pattern.test(line)) issues.push(`${file}:${index + 1}: ${line.trim()}`);
          pattern.lastIndex = 0;
        }
      });
    }
  }
}

roots.forEach(walk);
if (issues.length) {
  console.error('Public copy validation failed:\n' + issues.join('\n'));
  process.exit(1);
}
console.log('Public copy validation passed.');
