import { build } from 'esbuild';
import { mkdir, writeFile, copyFile, cp } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import katex from 'katex';
await mkdir('.cache', { recursive: true });
await build({
  entryPoints: ['src/content/index.ts'],
  outfile: '.cache/content.mjs',
  bundle: true,
  format: 'esm',
  platform: 'node',
});
const { exercises } = await import(
  pathToFileURL(resolve('.cache/content.mjs')).href + '?v=' + Date.now()
);
const esc = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const math = (tex) =>
  katex.renderToString(tex, {
    displayMode: true,
    throwOnError: true,
    trust: false,
    strict: 'ignore',
  });
let md =
  '# Corrigé intégral — TD 2\n\nMathématiques pour les Sciences Naturelles · La Rochelle Université. Adaptation pédagogique de la fiche fournie.\n\n92 activités ; les domaines sont traités séparément. Les notations et ambiguïtés sont commentées au fil des activités.\n\n';
let body = '';
for (const e of exercises) {
  md += `## Exercice ${e.id} — ${e.title}\n\n${e.description}\n\n`;
  body += `<section id="ex${e.id}"><h2><small>EXERCICE ${e.id}</small>${esc(e.title)}</h2><p>${esc(e.description)}</p>`;
  for (const a of e.activities) {
    md += `### ${a.label}\n\n${a.prompt}\n\n$$${a.tex}$$\n\n`;
    body += `<article><h3>${esc(a.label)}</h3><p>${esc(a.prompt)}</p><div class="equation">${math(a.tex)}</div>`;
    if (a.note) {
      md += `**Lecture de l’énoncé.** ${a.note}\n\n`;
      body += `<aside>${esc(a.note)}</aside>`;
    }
    body += '<details open><summary>Raisonnement détaillé</summary>';
    for (const [i, s] of a.steps.entries()) {
      md += `${i + 1}. **${s.title}.** ${s.why}\n\n$$${s.tex}$$\n\n`;
      body += `<div class="step"><span>${i + 1}</span><div><h4>${esc(s.title)}</h4><div class="equation">${math(s.tex)}</div><p>${esc(s.why)}</p></div></div>`;
    }
    md += `**Résultat :** $${a.result}$.\n\n`;
    body += `<div class="result"><strong>Résultat</strong>${math(a.result)}</div></details></article>`;
  }
  body += '</section>';
}
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Corrigé intégral — Atelier Fonctions</title><link rel="stylesheet" href="assets/katex.min.css"><style>body{margin:0;background:#f6f8f1;color:#283b2c;font-family:system-ui,sans-serif;font-size:15px;line-height:1.65}main{max-width:950px;margin:auto;padding:45px 30px}h1,h2{font-family:Georgia,serif;font-weight:400}h1{font-size:43px;line-height:1.15}h2{font-size:32px;margin-top:60px;border-bottom:1px solid #d3ddc8;padding-bottom:18px}h2 small{display:block;font-family:system-ui,sans-serif;letter-spacing:2px;font-size:11px;margin-bottom:12px;color:#798c65}nav{display:flex;gap:12px;flex-wrap:wrap}nav a{color:#38613d}article{background:#fffefa;border:1px solid #dfe5d5;border-radius:7px;padding:25px;margin:22px 0;break-inside:avoid}h3{font-size:19px}h4{font-size:15px;margin:0}.step{display:flex;gap:18px;margin:20px 0}.step>span{background:#edf3e4;border-radius:50%;width:28px;height:28px;display:grid;place-items:center;flex-shrink:0}.step>div{min-width:0;flex:1}.step p{color:#536a49}.equation{overflow:auto;padding:8px 0}.result{border-top:1px solid #d8e1cd;margin-top:25px;padding-top:15px;color:#345c35;overflow:auto}.result strong{font-size:12px;text-transform:uppercase;letter-spacing:1px}aside{background:#f7efdc;padding:16px;font-size:13px;color:#816436}summary{cursor:pointer;font-size:13px;color:#738b5d}button{border:1px solid #879d73;background:#fffefa;color:#416538;border-radius:4px;padding:9px 15px;cursor:pointer;margin:20px 8px 0 0}@media print{body{background:white}main{padding:0}button,nav,summary{display:none}details>*{display:block!important}article{border:0;box-shadow:none}h2{break-before:page}.step{break-inside:avoid}.equation{overflow:visible;font-size:13px}}@media(max-width:600px){main{padding:25px 15px}article{padding:18px}.equation{font-size:12px}h1{font-size:34px}}</style></head><body><main><p>ATELIER FONCTIONS · TD 02</p><h1>Le corrigé, avec toutes les justifications.</h1><p>12 exercices · 92 activités. D’après la fiche de Mathématiques pour les Sciences Naturelles de La Rochelle Université fournie par l’utilisateur.</p><nav>${exercises.map((e) => `<a href="#ex${e.id}">${e.id}. ${esc(e.short)}</a>`).join('')}</nav><button onclick="document.querySelectorAll('details').forEach(d=>d.open=true)">Tout ouvrir</button><button onclick="document.querySelectorAll('details').forEach(d=>d.open=false)">Tout replier</button><button onclick="window.print()">Imprimer</button>${body}<p>Les constantes écrites en fractions, logarithmes ou radicaux sont exactes. Les horaires de l’exercice 12 relèvent uniquement du modèle explicité.</p></main></body></html>`;
await mkdir('docs/assets', { recursive: true });
await copyFile('node_modules/katex/dist/katex.min.css', 'docs/assets/katex.min.css');
await cp('node_modules/katex/dist/fonts', 'docs/assets/fonts', { recursive: true });
await writeFile('docs/CORRIGE.md', md);
await writeFile('docs/CORRIGE.html', html);
console.log(
  `Exported ${exercises.length} exercises and ${exercises.reduce((s, e) => s + e.activities.length, 0)} corrected activities.`,
);
