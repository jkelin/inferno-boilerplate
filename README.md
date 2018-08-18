Just another SPA boilerplate. Focus on semi fast builds, output size and performance.

- `yarn`
- `yarn start` => Debug output on [http://localhost:3000](http://localhost:3000)
- `yarn build` => Optimized output in `/dist`

## Technology table

| Task  | Library  | Comment |
| ------------ | ------------ | ------------ |
| Build  | [Webpack 4](https://webpack.js.org/ "Webpack")  | [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) included for minor rebuild speedup |
| Compile  | [Typescript 3](https://www.typescriptlang.org/), [Babel 6](https://babeljs.io/)  | Typescript in `strict` mode. Babel used for Lodash optimization and Inferno handling |
| Style  | [Less](http://lesscss.org/), [CSS Modules](https://github.com/css-modules/css-modules), [PostCSS](https://github.com/postcss/postcss)  |
| Render  | [Inferno 5](https://github.com/infernojs/inferno)  | [inferno-compat](https://www.npmjs.com/package/inferno-compat) included |
| State | [Redux](https://redux.js.org/)  |
| Form  | [Formik](https://github.com/jaredpalmer/formik)  |
| Misc libs  | [Lodash](https://lodash.com/), [Axios](https://github.com/axios/axios)  |
| Misc tools | [TSLint](https://palantir.github.io/tslint/), [Bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) | Look into `package.json` on how to invoke these |
