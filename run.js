const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cases = [
  ['swc-14.7.0', 'test.js', 'out-14.7.0.txt'],
  ['swc-14.8.0', 'test.js', 'out-14.8.0.txt'],
  ['swc-20.0.3', 'test.js', 'out-20.0.3.txt'],
  ['babel', 'test-babel.js', 'out-babel.txt'],
];

for (const [dir, script, out] of cases) {
  const cwd = path.join(__dirname, dir);
  const outPath = path.join(__dirname, out);
  const output = execSync(`node ../${script}`, { cwd, encoding: 'utf8' });
  fs.writeFileSync(outPath, output);
  process.stdout.write(`wrote ${out}\n`);
  process.stdout.write(output + '\n');
}
