import {readFile,writeFile,mkdir} from 'node:fs/promises';
const read=name=>readFile(new URL('../'+name,import.meta.url),'utf8');
const template=await read('src/index.html'),css=await read('src/styles.css');
const parts=await Promise.all(['catalog','engine','automation','recommendations','analytics','plan-builder','research-i18n','i18n','analytics-ui','journey','plans-ui','app'].map(name=>read('src/'+name+'.js')));
const js='(()=>{\n"use strict";\n'+parts.map(s=>s.replace(/^import .*;\n/gm,'').replace(/^export /gm,'')).join('\n')+'\n})();';
if(/<\/script/i.test(js)||/<\/style/i.test(css))throw new Error('Unsafe inline closing tag');
new Function(js); // Reject invalid combined JavaScript before replacing the deployable artifact.
await mkdir(new URL('../dist/',import.meta.url),{recursive:true});
const html=template.replace('/* INLINE_CSS */',()=>css).replace('/* INLINE_JS */',()=>js);
await writeFile(new URL('../dist/index.html',import.meta.url),html);
console.log('Built standalone dist/index.html ('+Buffer.byteLength(html)+' bytes)');
