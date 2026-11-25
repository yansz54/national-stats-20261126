// main.js — the router. One job: render the page for the current hash route
// and re-render when the hash changes. All content lives in views.js.

import { renderPage, routeName } from './views.js';

const root = document.getElementById('app');

function go() {
  const path = routeName(window.location.hash);
  renderPage(root, path);
  window.scrollTo(0, 0);
  document.title = 'STATISTIKA · Indonesia in Numbers — ' + (path === '/' ? 'Overview' : path.slice(1).replace(/^\w/, (c) => c.toUpperCase()));
}

window.addEventListener('hashchange', go);
go();
