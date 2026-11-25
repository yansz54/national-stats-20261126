// views.js — one renderer per page of the site, plus the controls each page
// offers. Every control on every page does something: links change the hash
// route, selectors re-draw the charts, table headers re-sort, the search box
// filters, and the compare tool re-computes. Nothing is a placeholder.

import { HEADLINES, SERIES, SECTORS, PROVINCES, FACTS, TRADE_NOTES, COMPARE_INDICATORS, YEARS } from './data.js';
import { barChart, lineChart, hbarChart, sparkline, GREEN, AMBER, RED } from './charts.js';

const TOTAL_POP = 281.6;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function srcLine(source) {
  return `<p class="src">Source: ${esc(source)}</p>`;
}

function fmtPct(v) {
  return v.toFixed(2).replace(/\.00$/, '.0') + '%';
}

function chartCard(title, canvasId, note, controls = '') {
  return `<section class="panel"><div class="panel-head"><h2>${title}</h2><div class="controls">${controls}</div></div>
  <canvas id="${canvasId}" class="chart" role="img" aria-label="${esc(title)}"></canvas>
  ${note ? `<p class="note">${note}</p>` : ''}</section>`;
}

function statCard(label, value, unit, note, source) {
  return `<div class="stat"><div class="stat-label">${label}</div><div class="stat-value">${value}</div>
  <div class="stat-unit">${unit}</div><p class="stat-note">${note}</p>${srcLine(source)}</div>`;
}

// ---------- Overview ----------

function overview() {
  const cards = HEADLINES.map((h) => `
    <article class="card">
      <div class="card-top"><span class="card-label">${h.label}</span><span class="card-year">${h.year}</span></div>
      <div class="card-value">${h.value}</div>
      <div class="card-unit">${h.unit} · ${h.change}</div>
      <canvas class="spark" data-values="${h.spark.join(',')}" role="img" aria-label="${esc(h.label)} trend"></canvas>
      <p class="card-blurb">${h.blurb}</p>
      <p class="src">Source: ${esc(h.source)}</p>
      <a class="card-link" href="#/${{ population: 'population', gdp: 'economy', growth: 'economy', inflation: 'prices', unemployment: 'jobs', poverty: 'economy' }[h.id]}">Explore ${h.label.toLowerCase()} &rarr;</a>
    </article>`).join('');
  return `
  <section class="hero">
    <p class="kicker">Badan Pusat Statistik figures · 2019–2024</p>
    <h1>Indonesia<br>in numbers.</h1>
    <p class="lede">One country, one page per question. Population, the economy, jobs, prices, trade and every province — the published figures, with the source and year on each one.</p>
    <div class="chips">
      <a href="#/population">Population 281.6m</a>
      <a href="#/economy">GDP Rp 22,139tn</a>
      <a href="#/jobs">Jobs 4.91%</a>
      <a href="#/prices">Prices 1.57%</a>
      <a href="#/trade">Trade +US$31.0bn</a>
      <a href="#/regions">38 provinces</a>
    </div>
  </section>
  <section class="grid">${cards}</section>
  <section class="panel"><h2>At a glance — 2024</h2>
    <div class="facts">
      <div><strong>${FACTS.gini.value}</strong><span>Gini ratio, Mar 2024 (BPS)</span></div>
      <div><strong>75.02</strong><span>Human Development Index, 2024 (BPS)</span></div>
      <div><strong>${FACTS.tradeSurplus.value}</strong><span>Trade surplus, 2024 (BPS)</span></div>
      <div><strong>${FACTS.lifeExpectancy.value}</strong><span>Life expectancy, 2024 (BPS)</span></div>
    </div>
  </section>
  <section class="panel"><h2>What changed in 2024</h2>
    <ul class="changes">
      <li><a href="#/economy">The economy grew 5.03%</a> — a third straight year above 5% (BPS, 2024).</li>
      <li><a href="#/prices">Inflation fell to 1.57%</a> in December, from 2.61% a year earlier (BPS, 2024).</li>
      <li><a href="#/jobs">Unemployment dropped to 4.91%</a> in August, the lowest August reading since 2019 (BPS, Aug 2024).</li>
      <li><a href="#/population">Poverty fell to 9.03%</a> in March — 25.22 million people below the line (BPS, Mar 2024).</li>
      <li><a href="#/trade">Exports reached US$264.7bn</a> and the trade surplus was US$31.0bn (BPS, 2024).</li>
    </ul>
  </section>`;
}

// ---------- Population ----------

function population() {
  const age = [
    { label: 'Age 0–14', value: 25 },
    { label: 'Age 15–64', value: 68 },
    { label: 'Age 65+', value: 7 },
  ];
  const top = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 6);
  const rows = top.map((p) => `<tr><td>${p.name}</td><td class="num">~${p.pop.toFixed(1)}m</td><td class="num">${((p.pop / TOTAL_POP) * 100).toFixed(1)}%</td><td>${p.capital}</td></tr>`).join('');
  return `
  <section class="page-head"><p class="kicker">Population</p><h1>281.6 million people.</h1>
  <p class="lede">Indonesia is the world's fourth most populous country. The 2020 census counted 270.2 million people; the mid-year estimate for 2024 is 281.6 million.</p></section>
  ${chartCard('Population, 2010–2024 (millions)', 'popChart', 'Censuses in 2010 and 2020; 2015 intercensal survey; 2021–2024 mid-year estimates.')}
  <div class="grid3">
    ${statCard('Living on Java', '~56%', 'of all Indonesians', 'Java holds just over half the population on about 7% of the land.', 'BPS, 2024')}
    ${statCard('Median age', '~30 yrs', 'years', 'Half the population is younger than about 30.', 'BPS, 2024')}
    ${statCard('Life expectancy', FACTS.lifeExpectancy.value, 'at birth', FACTS.lifeExpectancy.note, FACTS.lifeExpectancy.source)}
  </div>
  ${chartCard('Age structure, 2024 (share of population, %)', 'ageChart', 'Rounded shares; they sum to 100%.')}
  <section class="panel"><h2>Largest provinces, 2024</h2>
  <table class="tbl"><thead><tr><th>Province</th><th class="num">Population</th><th class="num">Share</th><th>Capital</th></tr></thead><tbody>${rows}</tbody></table>
  ${srcLine('BPS, 2024 (mid-year estimates, rounded).')}
  <p><a href="#/regions">See all provinces, sortable &rarr;</a></p></section>`;
}

// ---------- Economy ----------

let econState = { type: 'line', from: 2019 };

function economy() {
  const years = YEARS.filter((y) => y >= econState.from).map((y) => `<option value="${y}"${y === econState.from ? ' selected' : ''}>${y}</option>`).join('');
  return `
  <section class="page-head"><p class="kicker">Economy</p><h1>Growth above 5% again.</h1>
  <p class="lede">Real GDP grew 5.03% in 2024, the third year in a row above 5%. GDP at current prices was Rp 22,139 trillion — about Rp 78.6 million per person.</p></section>
  ${chartCard('Real GDP growth, % per year', 'growthChart', 'Annual real GDP growth (BPS). 2020 is the pandemic contraction.',
    `<label>From <select id="econFrom">${years}</select></label>
     <span class="seg" id="econType"><button data-t="line" class="${econState.type === 'line' ? 'on' : ''}">Line</button><button data-t="bar" class="${econState.type === 'bar' ? 'on' : ''}">Bars</button></span>`)}
  ${chartCard('GDP at current prices, Rp trillion', 'gdpChart', 'Nominal GDP (BPS).')}
  <div class="grid3">
    ${statCard('GDP per capita', FACTS.gdpPerCapita.value, '2024', FACTS.gdpPerCapita.note, FACTS.gdpPerCapita.source)}
    ${statCard('Human Development Index', '75.02', 'points, 2024', 'Up from 74.39 in 2023 and 71.92 in 2019.', 'BPS, 2024')}
    ${statCard('Poverty rate', '9.03%', 'March 2024', '25.22 million people below the poverty line.', 'BPS, Mar 2024')}
  </div>
  ${chartCard('What makes up GDP, 2024 (share, %)', 'sectorChart', 'Shares of GDP at current prices, rounded (BPS, 2024).')}`;
}

// ---------- Jobs ----------

let jobsState = { from: 2019 };

function jobs() {
  const years = YEARS.filter((y) => y >= jobsState.from).map((y) => `<option value="${y}"${y === jobsState.from ? ' selected' : ''}>${y}</option>`).join('');
  return `
  <section class="page-head"><p class="kicker">Jobs</p><h1>4.91% unemployed.</h1>
  <p class="lede">The open unemployment rate fell to 4.91% in August 2024, its lowest August reading since 2019. The labour force was about 152.1 million people.</p></section>
  ${chartCard('Open unemployment rate (TPT), August, %', 'jobsChart', 'Open unemployment rate, August survey each year (BPS). February 2024 was 4.82%.',
    `<label>From <select id="jobsFrom">${years}</select></label>`)}
  <div class="grid3">
    ${statCard('Labour force', FACTS.labourForce.value, 'people', FACTS.labourForce.note, FACTS.labourForce.source)}
    ${statCard('Informal work', FACTS.informal.value, 'of workers', FACTS.informal.note, FACTS.informal.source)}
    ${statCard('Minimum wage, Jakarta', FACTS.umpJakarta.value, 'per month, 2025', FACTS.umpJakarta.note, FACTS.umpJakarta.source)}
  </div>
  <section class="panel"><h2>How to read the rate</h2>
  <p>The open unemployment rate (TPT) is the share of the labour force that is not working but is looking for work. It is measured by the national labour force survey (Sakernas) every February and August. Informal work — own-account workers, casual workers and unpaid family workers — still covers about three in five jobs.</p>
  ${srcLine('BPS, Sakernas, Aug 2024.')}</section>`;
}

// ---------- Prices ----------

let pricesState = { type: 'line' };

function prices() {
  return `
  <section class="page-head"><p class="kicker">Prices</p><h1>Inflation 1.57%.</h1>
  <p class="lede">Consumer prices rose 1.57% in the year to December 2024, down from 2.61% a year earlier and from the 5.51% peak of December 2022.</p></section>
  ${chartCard('Consumer price inflation, December year on year, %', 'cpiChart', 'December CPI, year on year (BPS).',
    `<span class="seg" id="cpiType"><button data-t="line" class="${pricesState.type === 'line' ? 'on' : ''}">Line</button><button data-t="bar" class="${pricesState.type === 'bar' ? 'on' : ''}">Bars</button></span>`)}
  <div class="grid3">
    ${statCard('December 2024', '1.57%', 'year on year', 'Lowest December reading since 2020.', 'BPS, 2024')}
    ${statCard('Core inflation', '~2.26%', '2024', 'Core inflation strips out volatile food and administered prices.', 'BPS, 2024')}
    ${statCard('2022 peak', '5.51%', 'December 2022', 'The fuel-price adjustment of September 2022 pushed inflation up.', 'BPS, 2022')}
  </div>
  <section class="panel"><h2>How the CPI works</h2>
  <p>BPS tracks the prices of a fixed basket of goods and services in 90 cities. The headline rate is the change in the consumer price index. Food prices move the most month to month; the core rate leaves out volatile food and prices the government sets, which is why it moves more slowly.</p>
  ${srcLine('BPS, 2024.')}</section>`;
}

// ---------- Trade ----------

let tradeState = { series: 'exports' };

function trade() {
  const labels = { exports: 'Exports', imports: 'Imports', surplus: 'Trade surplus' };
  const btns = ['exports', 'imports', 'surplus'].map((k) =>
    `<button data-s="${k}" class="${tradeState.series === k ? 'on' : ''}">${labels[k]}</button>`).join('');
  return `
  <section class="page-head"><p class="kicker">Trade</p><h1>A US$31.0bn surplus.</h1>
  <p class="lede">Exports were US$264.7 billion in 2024 and imports US$233.7 billion. Indonesia has run a trade surplus every year since 2020.</p></section>
  ${chartCard('Trade, US$ billion', 'tradeChart', 'Exports and imports of goods (BPS). The surplus is exports minus imports.',
    `<span class="seg" id="tradeSeg">${btns}</span>`)}
  <div class="grid3">
    ${statCard('Exports 2024', 'US$264.7bn', 'goods', 'Below the 2022 record of US$291.9bn.', 'BPS, 2024')}
    ${statCard('Imports 2024', 'US$233.7bn', 'goods', 'Up from US$221.9bn in 2023.', 'BPS, 2024')}
    ${statCard('Trade surplus', FACTS.tradeSurplus.value, '2024', FACTS.tradeSurplus.note, FACTS.tradeSurplus.source)}
  </div>
  <section class="panel"><h2>What Indonesia trades</h2>
  <ul class="changes">${TRADE_NOTES.map((n) => `<li>${n}</li>`).join('')}</ul></section>`;
}

// ---------- Regions ----------

let regionsState = { q: '', sort: 'pop', dir: -1 };

function density(p) {
  return Math.round((p.pop * 1000000) / p.area);
}

function regionsRows(list) {
  return list.map((p) => `<tr><td>${p.name}</td><td class="num">~${p.pop.toFixed(1)}m</td><td class="num">${((p.pop / TOTAL_POP) * 100).toFixed(1)}%</td><td class="num">${density(p).toLocaleString('en-US')}</td><td>${p.capital}</td></tr>`).join('');
}

function regions() {
  const sorted = [...PROVINCES].sort((a, b) => {
    const key = regionsState.sort === 'pop' ? (x) => x.pop : regionsState.sort === 'share' ? (x) => x.pop : (x) => density(x);
    return (key(a) - key(b)) * regionsState.dir;
  });
  const filtered = regionsState.q
    ? sorted.filter((p) => p.name.toLowerCase().includes(regionsState.q.toLowerCase()))
    : sorted;
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const sortBtn = (k, label) => `<button data-sort="${k}" class="${regionsState.sort === k ? 'on' : ''}">${label} ${regionsState.sort === k ? (regionsState.dir === -1 ? '↓' : '↑') : ''}</button>`;
  return `
  <section class="page-head"><p class="kicker">Regions</p><h1>38 provinces.</h1>
  <p class="lede">Indonesia has 38 provinces and 514 regencies and cities. Three provinces — West, Central and East Java — hold about 130 million people between them.</p></section>
  ${chartCard('Largest provinces by population, 2024 (millions)', 'provChart', 'Mid-year population estimates, rounded (BPS, 2024).')}
  <section class="panel"><div class="panel-head"><h2>All provinces in this table</h2>
  <div class="controls"><input id="provSearch" type="search" placeholder="Filter provinces…" value="${esc(regionsState.q)}" aria-label="Filter provinces">
  <span class="seg" id="provSort">${sortBtn('pop', 'Population')}${sortBtn('density', 'Density')}</span></div></div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Province</th><th class="num">Population</th><th class="num">Share</th><th class="num">Density /km²</th><th>Capital</th></tr></thead>
  <tbody id="provBody">${regionsRows(filtered) || '<tr><td colspan="5">No province matches that filter.</td></tr>'}</tbody></table></div>
  ${srcLine('BPS, 2024 (mid-year estimates, rounded). Density is population divided by province area.')}
  <p class="note">Pick a province to see it on its own:</p>
  <div class="controls"><label>Province <select id="provSelect">${[...PROVINCES].sort((a, b) => b.pop - a.pop).map((p) => `<option value="${p.name}">${p.name}</option>`).join('')}</select></label></div>
  <div id="provDetail"></div></section>`;
}

function provDetail(p) {
  return `<div class="detail"><h3>${p.name}</h3>
  <p>Capital: <strong>${p.capital}</strong> · Population: <strong>~${p.pop.toFixed(1)} million</strong> (${((p.pop / TOTAL_POP) * 100).toFixed(1)}% of Indonesia) · Density: <strong>${density(p).toLocaleString('en-US')} people per km²</strong> · Area: ${p.area.toLocaleString('en-US')} km².</p>
  ${srcLine('BPS, 2024 (mid-year estimates, rounded).')}</div>`;
}

// ---------- Compare ----------

let compareState = { a: 2019, b: 2024 };

function compare() {
  const opts = (sel) => YEARS.map((y) => `<option value="${y}"${y === sel ? ' selected' : ''}>${y}</option>`).join('');
  const rows = COMPARE_INDICATORS.map((ind) => {
    const va = SERIES[ind.series].find((d) => d.year === compareState.a).value;
    const vb = SERIES[ind.series].find((d) => d.year === compareState.b).value;
    const delta = vb - va;
    const sign = delta > 0 ? '+' : '';
    const cls = delta > 0 ? 'up' : delta < 0 ? 'down' : '';
    return `<tr><td>${ind.label}</td><td class="num">${va} ${ind.unit}</td><td class="num">${vb} ${ind.unit}</td><td class="num ${cls}">${sign}${delta.toFixed(2).replace(/\.00$/, '')} ${ind.unit === '%' ? 'pp' : ind.unit}</td></tr>`;
  }).join('');
  return `
  <section class="page-head"><p class="kicker">Compare years</p><h1>${compareState.a} vs ${compareState.b}.</h1>
  <p class="lede">Pick any two years and see how the country moved. Every figure below is a published BPS figure for that year.</p></section>
  <section class="panel"><div class="controls big">
    <label>Year A <select id="cmpA">${opts(compareState.a)}</select></label>
    <label>Year B <select id="cmpB">${opts(compareState.b)}</select></label>
  </div>
  <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Indicator</th><th class="num">${compareState.a}</th><th class="num">${compareState.b}</th><th class="num">Change</th></tr></thead>
  <tbody>${rows}</tbody></table></div>
  ${srcLine('BPS, 2019–2024. Change is shown in percentage points (pp) for rates and in the indicator\u2019s own unit otherwise.')}
  <p class="note">Try 2020 vs 2024 to see the pandemic year against today — or 2019 vs 2024 for the full five-year change.</p></section>`;
}

// ---------- Router ----------

const ROUTES = {
  '/': { title: 'Overview', render: overview },
  '/population': { title: 'Population', render: population },
  '/economy': { title: 'Economy', render: economy },
  '/jobs': { title: 'Jobs', render: jobs },
  '/prices': { title: 'Prices', render: prices },
  '/trade': { title: 'Trade', render: trade },
  '/regions': { title: 'Regions', render: regions },
  '/compare': { title: 'Compare years', render: compare },
};

export function routeName(hash) {
  const path = (hash || '#/').replace(/^#/, '') || '/';
  return ROUTES[path] ? path : '/';
}

export function renderPage(root, path) {
  root.innerHTML = ROUTES[path].render();
  drawCharts(path);
  bindControls(path);
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + path);
  });
}

function drawCharts(path) {
  document.querySelectorAll('canvas.spark').forEach((c) => {
    sparkline(c, c.dataset.values.split(',').map(Number));
  });
  const byId = (id) => document.getElementById(id);
  if (path === '/population') {
    lineChart(byId('popChart'), SERIES.population.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(0) + 'm', fill: true });
    hbarChart(byId('ageChart'), [
      { label: 'Age 0–14', value: 25 },
      { label: 'Age 15–64', value: 68 },
      { label: 'Age 65+', value: 7 },
    ], { format: (v) => v + '%', rowH: 34 });
  }
  if (path === '/economy') drawGrowth();
  if (path === '/economy') {
    barChart(byId('gdpChart'), SERIES.gdpCurrent.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => 'Rp ' + v.toLocaleString('en-US') });
    hbarChart(byId('sectorChart'), SECTORS.map((s) => ({ label: s.name, value: s.share })), { format: (v) => v.toFixed(1) + '%' });
  }
  if (path === '/jobs') {
    const data = SERIES.unemployment.filter((d) => d.year >= jobsState.from);
    lineChart(byId('jobsChart'), data.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(2) + '%', color: AMBER, fill: true });
  }
  if (path === '/prices') drawCpi();
  if (path === '/trade') drawTrade();
  if (path === '/regions') {
    const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
    hbarChart(byId('provChart'), top10.map((p) => ({ label: p.name, value: p.pop })), { format: (v) => '~' + v.toFixed(1) + 'm' });
    const sel = byId('provSelect');
    if (sel) byId('provDetail').innerHTML = provDetail(top10.find((p) => p.name === sel.value) || top10[0]);
  }
}

function drawGrowth() {
  const data = SERIES.gdpGrowth.filter((d) => d.year >= econState.from);
  const el = document.getElementById('growthChart');
  if (!el) return;
  const args = { format: (v) => v.toFixed(2) + '%' };
  if (econState.type === 'bar') barChart(el, data.map((d) => ({ label: String(d.year), value: d.value })), { ...args, color: GREEN });
  else lineChart(el, data.map((d) => ({ label: String(d.year), value: d.value })), { ...args, fill: true });
}

function drawCpi() {
  const el = document.getElementById('cpiChart');
  if (!el) return;
  const args = { format: (v) => v.toFixed(2) + '%' };
  if (pricesState.type === 'bar') barChart(el, SERIES.inflation.map((d) => ({ label: String(d.year), value: d.value })), { ...args, color: AMBER });
  else lineChart(el, SERIES.inflation.map((d) => ({ label: String(d.year), value: d.value })), { ...args, color: AMBER, fill: true });
}

function drawTrade() {
  const el = document.getElementById('tradeChart');
  if (!el) return;
  if (tradeState.series === 'exports') barChart(el, SERIES.exports.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => '$' + v.toFixed(1) + 'bn' });
  else if (tradeState.series === 'imports') barChart(el, SERIES.imports.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => '$' + v.toFixed(1) + 'bn', color: AMBER });
  else barChart(el, SERIES.exports.map((d, i) => ({ label: String(d.year), value: +(d.value - SERIES.imports[i].value).toFixed(1) })), { format: (v) => (v < 0 ? '−$' : '$') + Math.abs(v).toFixed(1) + 'bn' });
}

function bindControls(path) {
  const on = (id, ev, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(ev, fn);
  };
  if (path === '/economy') {
    on('econFrom', 'change', (e) => { econState.from = Number(e.target.value); drawGrowth(); });
    document.querySelectorAll('#econType button').forEach((b) => b.addEventListener('click', () => {
      econState.type = b.dataset.t;
      document.querySelectorAll('#econType button').forEach((x) => x.classList.toggle('on', x === b));
      drawGrowth();
    }));
  }
  if (path === '/jobs') on('jobsFrom', 'change', (e) => {
    jobsState.from = Number(e.target.value);
    const data = SERIES.unemployment.filter((d) => d.year >= jobsState.from);
    lineChart(document.getElementById('jobsChart'), data.map((d) => ({ label: String(d.year), value: d.value })), { format: (v) => v.toFixed(2) + '%', color: AMBER, fill: true });
  });
  if (path === '/prices') {
    document.querySelectorAll('#cpiType button').forEach((b) => b.addEventListener('click', () => {
      pricesState.type = b.dataset.t;
      document.querySelectorAll('#cpiType button').forEach((x) => x.classList.toggle('on', x === b));
      drawCpi();
    }));
  }
  if (path === '/trade') {
    document.querySelectorAll('#tradeSeg button').forEach((b) => b.addEventListener('click', () => {
      tradeState.series = b.dataset.s;
      document.querySelectorAll('#tradeSeg button').forEach((x) => x.classList.toggle('on', x === b));
      drawTrade();
    }));
  }
  if (path === '/regions') {
    on('provSearch', 'input', (e) => {
      regionsState.q = e.target.value;
      const sorted = [...PROVINCES].sort((a, b) => {
        const key = regionsState.sort === 'density' ? (x) => density(x) : (x) => x.pop;
        return (key(a) - key(b)) * regionsState.dir;
      });
      const filtered = regionsState.q ? sorted.filter((p) => p.name.toLowerCase().includes(regionsState.q.toLowerCase())) : sorted;
      document.getElementById('provBody').innerHTML = regionsRows(filtered) || '<tr><td colspan="5">No province matches that filter.</td></tr>';
    });
    document.querySelectorAll('#provSort button').forEach((b) => b.addEventListener('click', () => {
      if (regionsState.sort === b.dataset.sort) regionsState.dir *= -1;
      else { regionsState.sort = b.dataset.sort; regionsState.dir = -1; }
      const root = document.getElementById('app');
      const q = regionsState.q;
      renderPage(root, '/regions');
      const s = document.getElementById('provSearch');
      if (s) { s.value = q; s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
    }));
    on('provSelect', 'change', (e) => {
      const p = PROVINCES.find((x) => x.name === e.target.value);
      if (p) document.getElementById('provDetail').innerHTML = provDetail(p);
    });
  }
  if (path === '/compare') {
    const redo = () => {
      const root = document.getElementById('app');
      renderPage(root, '/compare');
    };
    on('cmpA', 'change', (e) => { compareState.a = Number(e.target.value); if (compareState.a === compareState.b) compareState.b = compareState.a === 2024 ? 2019 : 2024; redo(); });
    on('cmpB', 'change', (e) => { compareState.b = Number(e.target.value); if (compareState.b === compareState.a) compareState.a = compareState.b === 2024 ? 2019 : 2024; redo(); });
  }
}
