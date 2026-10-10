// Turns dist-prototype/index.html into a page body for a Claude artifact preview.
// Usage: npm run build:prototype && node scripts/make-preview.mjs <out.html>
import fs from 'node:fs';
const src = fs.readFileSync('dist-prototype/index.html', 'utf8');
const head = src.slice(src.indexOf('<head>') + 6, src.indexOf('</head>'));
let body = src.slice(src.indexOf('<body>') + 6, src.indexOf('</body>'));
const styles = (head.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join('');
const scripts = (head.match(/<script[^>]*>[\s\S]*?<\/script>/g) || []).join('');
body = body.replace(/<!-- Netlify[\s\S]*?<\/form>/, '');
const out = `<title>Fund Fluent v1</title>\n${styles}\n${body}\n${scripts}`.replace(/�/g, '\\uFFFD');
fs.writeFileSync(process.argv[2] || 'dist-prototype/preview.html', out);
console.log('preview written', out.length, 'bytes');
