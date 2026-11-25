// charts.js — small hand-drawn canvas charts. No libraries, no network.
// Every chart draws axes, labels and values in the page's own palette.

export const INK = '#1c2b26';
export const MUTED = '#5d6f67';
export const GREEN = '#0e6b4f';
export const AMBER = '#c47f12';
export const RED = '#b3402a';
export const GRID = '#ddd6c4';

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = height || 220;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const step = n <= 1 ? 1 : n <= 1.5 ? 1.5 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 3 ? 3 : n <= 4 ? 4 : n <= 5 ? 5 : n <= 6 ? 6 : n <= 8 ? 8 : 10;
  return step * p;
}

// Width the y-axis tick labels need, so long labels (e.g. "Rp 25,000")
// are never clipped at the canvas edge.
function labelPad(ctx, min, max, format) {
  ctx.font = '11px system-ui, sans-serif';
  let w = 0;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4;
    w = Math.max(w, ctx.measureText(format(v)).width);
  }
  return Math.ceil(w) + 16;
}

function axes(ctx, x0, y0, x1, y1, min, max, format) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = y1 - ((y1 - y0) * i) / steps;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
    ctx.fillText(format(v), x0 - 8, y);
  }
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.moveTo(x0, y1);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

// Vertical bar chart. data: [{label, value}]. opts: {height, color, format, zeroLine}
export function barChart(canvas, data, opts = {}) {
  const { ctx, w, h } = setup(canvas, opts.height || 240);
  const values = data.map((d) => d.value);
  const min = Math.min(0, ...values);
  const max = niceMax(Math.max(0, ...values));
  const padL = Math.max(52, labelPad(ctx, min, max, opts.format || ((v) => String(v))));
  const padR = 10, padT = 14, padB = 28;
  const x0 = padL, x1 = w - padR, y0 = padT, y1 = h - padB;
  axes(ctx, x0, y0, x1, y1, min, max, opts.format || ((v) => String(v)));
  const slot = (x1 - x0) / data.length;
  const bw = Math.min(46, slot * 0.62);
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'center';
  data.forEach((d, i) => {
    const cx = x0 + slot * (i + 0.5);
    const yv = y1 - ((d.value - min) / (max - min)) * (y1 - y0);
    const yBase = y1 - ((0 - min) / (max - min)) * (y1 - y0);
    ctx.fillStyle = d.value < 0 ? RED : (opts.color || GREEN);
    ctx.fillRect(cx - bw / 2, Math.min(yv, yBase), bw, Math.abs(yBase - yv));
    ctx.fillStyle = INK;
    ctx.fillText(opts.format ? opts.format(d.value) : String(d.value), cx, yv - 8 < y0 ? y0 + 8 : yv - 8);
    ctx.fillStyle = MUTED;
    ctx.fillText(d.label, cx, h - 10);
  });
}

// Line chart. data: [{label, value}]. opts: {height, color, format, fill}
export function lineChart(canvas, data, opts = {}) {
  const { ctx, w, h } = setup(canvas, opts.height || 240);
  const values = data.map((d) => d.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const span = max - min || 1;
  min -= span * 0.15;
  max += span * 0.15;
  const padL = Math.max(52, labelPad(ctx, min, max, opts.format || ((v) => v.toFixed(1))));
  const padR = 14, padT = 16, padB = 28;
  const x0 = padL, x1 = w - padR, y0 = padT, y1 = h - padB;
  axes(ctx, x0, y0, x1, y1, min, max, opts.format || ((v) => v.toFixed(1)));
  const px = (i) => x0 + ((x1 - x0) * i) / (data.length - 1);
  const py = (v) => y1 - ((v - min) / (max - min)) * (y1 - y0);
  if (opts.fill) {
    ctx.beginPath();
    ctx.moveTo(px(0), y1);
    data.forEach((d, i) => ctx.lineTo(px(i), py(d.value)));
    ctx.lineTo(px(data.length - 1), y1);
    ctx.closePath();
    ctx.fillStyle = 'rgba(14, 107, 79, 0.10)';
    ctx.fill();
  }
  ctx.beginPath();
  data.forEach((d, i) => (i === 0 ? ctx.moveTo(px(i), py(d.value)) : ctx.lineTo(px(i), py(d.value))));
  ctx.strokeStyle = opts.color || GREEN;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.font = '11px system-ui, sans-serif';
  data.forEach((d, i) => {
    ctx.beginPath();
    ctx.arc(px(i), py(d.value), 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f7f4ec';
    ctx.fill();
    ctx.strokeStyle = opts.color || GREEN;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(opts.format ? opts.format(d.value) : String(d.value), px(i), py(d.value) - 11);
    ctx.fillStyle = MUTED;
    ctx.fillText(d.label, px(i), h - 10);
  });
}

// Horizontal bar chart, good for ranked lists. data: [{label, value}]
export function hbarChart(canvas, data, opts = {}) {
  const rowH = opts.rowH || 30;
  const { ctx, w, h } = setup(canvas, opts.height || data.length * rowH + 34);
  const padL = 132, padR = 56, padT = 8, padB = 8;
  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const x0 = padL, x1 = w - padR, y0 = padT, y1 = h - padB;
  ctx.font = '12px system-ui, sans-serif';
  data.forEach((d, i) => {
    const y = y0 + i * rowH + rowH / 2;
    const bw = ((x1 - x0) * d.value) / max;
    ctx.fillStyle = i === 0 ? AMBER : (opts.color || GREEN);
    ctx.fillRect(x0, y - 9, Math.max(1, bw), 18);
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(d.label, x0 - 8, y);
    ctx.textAlign = 'left';
    ctx.fillText(opts.format ? opts.format(d.value) : String(d.value), x0 + bw + 6, y);
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'left';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('0', x0, h - 2);
  ctx.fillText(opts.format ? opts.format(max) : String(max), x1 - 24, h - 2);
}

// Tiny sparkline for indicator cards. values: number[].
export function sparkline(canvas, values, opts = {}) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = 36;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const px = (i) => 2 + ((w - 4) * i) / (values.length - 1);
  const py = (v) => h - 4 - ((v - min) / span) * (h - 8);
  ctx.beginPath();
  ctx.moveTo(px(0), h - 2);
  values.forEach((v, i) => ctx.lineTo(px(i), py(v)));
  ctx.lineTo(px(values.length - 1), h - 2);
  ctx.closePath();
  ctx.fillStyle = 'rgba(14, 107, 79, 0.12)';
  ctx.fill();
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(px(i), py(v)) : ctx.lineTo(px(i), py(v))));
  ctx.strokeStyle = opts.color || GREEN;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px(values.length - 1), py(values[values.length - 1]), 3, 0, Math.PI * 2);
  ctx.fillStyle = opts.color || GREEN;
  ctx.fill();
}
