const input = `
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
void css;
export function Inline() {
  return <div css={{ color: 'blue' }}>Inline</div>;
}
`.trim();

(async () => {
  const cwd = process.cwd();
  const swc = require(`${cwd}/node_modules/@swc/core`);
  const plugin = require(`${cwd}/node_modules/@swc/plugin-emotion/package.json`).version;
  const core = require(`${cwd}/node_modules/@swc/core/package.json`).version;
  const { code } = await swc.transform(input, {
    filename: 'test.tsx',
    jsc: {
      parser: { syntax: 'typescript', tsx: true },
      target: 'es2020',
      experimental: {
        plugins: [[`${cwd}/node_modules/@swc/plugin-emotion`, { cssPropOptimization: false }]],
      },
      transform: { react: { runtime: 'automatic', importSource: '@emotion/react' } },
    },
  });
  console.log(`@swc/plugin-emotion@${plugin} @swc/core@${core} cssPropOptimization=false`);
  console.log(code);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
