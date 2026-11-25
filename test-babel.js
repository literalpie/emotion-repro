const babel = require(`${process.cwd()}/node_modules/@babel/core`);
const cwd = process.cwd();

const input = `
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
void css;
export function Inline() {
  return <div css={{ color: 'blue' }}>Inline</div>;
}
`.trim();

const plugin = require(`${cwd}/node_modules/@emotion/babel-plugin/package.json`).version;
const babelVersion = require(`${cwd}/node_modules/@babel/core/package.json`).version;

const result = babel.transformSync(input, {
  filename: 'test.tsx',
  presets: [
    [`${cwd}/node_modules/@babel/preset-typescript`],
    [`${cwd}/node_modules/@babel/preset-react`, { runtime: 'automatic', importSource: '@emotion/react' }],
  ],
  plugins: [[`${cwd}/node_modules/@emotion/babel-plugin`, { cssPropOptimization: false }]],
  babelrc: false,
  configFile: false,
});

console.log(`@emotion/babel-plugin@${plugin} @babel/core@${babelVersion} cssPropOptimization=false`);
console.log(result.code);
