[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![make.fun · best-national-statistics-site-20261126-0539 · rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/yansz54/national-stats-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![make.fun · best-national-statistics-site-20261126-0539 · reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/yansz54/national-stats-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# STATISTIKA — Indonesia in Numbers

A national statistics site for Indonesia, built from published BPS (Statistics Indonesia) figures — one country, one page per question. Overview dashboard, Population, Economy, Jobs, Prices, Trade, Regions (sortable, searchable province table) and a Compare-years tool. Every figure carries its source and year; every control does what it says. Static files only: no build step, no network requests, works on desktop and on a phone.

## Run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib only) copies `app/` and `screenshots/` to `/output` and writes `/output/dossier.json` with the vendored `vendor/makefun-frontend.ts`.

## Layout

- `app/index.html` — the shell (masthead, nav, footer)
- `app/main.js` — the hash router
- `app/views.js` — one renderer per page, plus every page's controls
- `app/charts.js` — hand-drawn canvas charts (bar, line, horizontal bar, sparkline)
- `app/data.js` — all figures, each labelled with source and year
- `app/style.css` — the whole look, system fonts only
- `screenshots/` — 4 real renders of the site (desktop ×3, phone ×1)
- `vendor/makefun-frontend.ts` — the kit's copy, unchanged
