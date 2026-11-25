# @swc/plugin-emotion does not support disabling cssPropOptimization

When cssPropOptimization is false, JSX with `css={{...whatever}}` should not get transformed. Starting in version 14.8.0, it does get transformed.

To see the repro, run `npm run start`. The output is also shown in `out-*.txt` files.
