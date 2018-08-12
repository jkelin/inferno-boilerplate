import { render } from 'inferno';
import { initDevTools } from 'inferno-devtools';

import { Root } from './Root';

import './style/index.less';
import { generateStore, RootStore } from './store';

if (process.env.NODE_ENV === 'development') {
  console.debug('Activating devtools');
  initDevTools();
}

function renderApp(RootComponent: typeof Root, store: RootStore) {
  render(<RootComponent store={store} />, document.getElementById('app'));
  console.debug('Initial render done');
}

function init() {
  const store = generateStore();
  renderApp(Root, store);
}

init();

// declare let module: { hot: any };
// if (module.hot) {
//   module.hot.accept();

//   console.warn('module.hot');
//   module.hot.accept(() => {
//     console.warn('module.hot.accept');
//     const NewRoot = require('./Root').default;
//     renderApp(NewRoot);
//   });

//   // module.hot.accept('containers/Layout/index', () => console.warn('containers/Layout/index'));
//   // module.hot.accept('./containers/Layout/index', () => console.warn('./containers/Layout/index'));

//   // module.hot.accept('containers/Layout/index.tsx', () => console.warn('containers/Layout/index.tsx'));
//   // module.hot.accept('./containers/Layout/index.tsx', () => console.warn('./containers/Layout/index.tsx'));
//   module.hot.accept('./Root.tsx', () => {
//     console.warn('module.hot.accept');
//     const NewRoot = require('./Root').default;
//     renderApp(NewRoot);
//   });
// }
