import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as engine from '../dist/engine.js';
const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const code=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8').replace(/^import .*?;\s*$/mg,'');
function boot(saved=null,fail=false){
 class Element{constructor(){this.textContent='';this.innerHTML='';this.hidden=false;this.disabled=false;this.dataset={};this.attrs={};this.listeners={};this.classList={toggle(){}};}setAttribute(k,v){this.attrs[k]=v;}getAttribute(k){return this.attrs[k];}addEventListener(k,f){this.listeners[k]=f;}click(e={}){if(!this.disabled)this.listeners.click?.(e);}showModal(){this.open=true;}close(){this.open=false;}}
 const elements=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));
 const dirs=Array.from({length:4},(_,i)=>{const e=new Element();e.dataset.dir=String(i);return e;});
 const copper=new Element(),lilac=new Element(),events={};let raw=saved;
 const document={getElementById:id=>elements.get(id),querySelectorAll:()=>dirs,querySelector:s=>s==='.copper'?copper:s==='.lilac'?lilac:null,addEventListener:(k,f)=>events[k]=f};
 const localStorage={getItem:()=>raw,setItem:(k,v)=>{if(fail)throw new Error('Quota exceeded');raw=v;}};
 vm.runInNewContext(code,{...engine,document,localStorage,console});
 return {els:elements,dirs,raw:()=>raw,events};
}
test('Interface : jouer, indice, annuler, recharger, victoire et niveau suivant',()=>{
 let ui=boot();assert.equal(ui.els.get('moves').textContent,'00');assert.equal(ui.els.get('win').hidden,true);
 ui.els.get('hint').click();assert.equal(ui.els.get('hint-detail').hidden,false);assert.match(ui.els.get('hint-detail').innerHTML,/poids 100 %/);
 let p=engine.decode(ui.raw()),maze=engine.makeMaze(0),route=engine.solve(maze,engine.initial());
 const go=to=>{const pos=engine.decode(ui.raw()).history.at(-1).pos;const dir=[0,1,2,3].find(i=>engine.target(maze,pos,i)===to);ui.dirs[dir].click();};
 go(route[0]);assert.equal(ui.els.get('moves').textContent,'01');ui.els.get('undo').click();assert.equal(ui.els.get('moves').textContent,'00');
 go(route[0]);const saved=ui.raw();ui=boot(saved);assert.equal(ui.els.get('moves').textContent,'01');assert.match(ui.els.get('status').textContent,/repris/);
 for(const to of route.slice(1))go(to);
 assert.equal(ui.els.get('win').hidden,false);assert.match(ui.els.get('completed').textContent,/1 \/ 5/);
 ui=boot(ui.raw());assert.equal(ui.els.get('win').hidden,false);ui.els.get('next').click();assert.match(ui.els.get('level-number').textContent,/02/);
});
test('Interface : blocage sans déplacement et sauvegarde indisponible',()=>{
 const ui=boot(null,true);ui.dirs[0].click();assert.equal(ui.els.get('moves').textContent,'00');assert.match(ui.els.get('status').textContent,/bloqué/);assert.match(ui.els.get('save-status').textContent,/non conservée/);
});
test('Interface : sauvegarde corrompue, récupération et annulation du redémarrage',()=>{
 const ui=boot('{invalid');assert.match(ui.els.get('status').textContent,/illisible/);assert.doesNotThrow(()=>engine.decode(ui.raw()));ui.els.get('restart').click();assert.equal(ui.els.get('restart-dialog').open,true);ui.els.get('cancel-restart').click();assert.equal(ui.els.get('restart-dialog').open,false);
});
