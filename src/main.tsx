import { render } from 'inferno';
import { initDevTools } from 'inferno-devtools';

import { HelloWorld } from "./functions";
import { Root } from './Root';

import './style/index.less';
import { store } from './store';

if (process.env.NODE_ENV === 'development') {
  console.log('Activating devtools');
  initDevTools();
}

function init() {
  console.log(HelloWorld('55'))
  render(<Root store={store} />, document.getElementById('app'));
}

init();
