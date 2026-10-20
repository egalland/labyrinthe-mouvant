import {test} from 'node:test';
import assert from 'node:assert/strict';
import {makeMaze,initial,solve,step,target,isWon,fresh,decode} from '../dist/engine.js';
for(let level=0;level<5;level++)test(`Niveau ${level+1}: parcours complet, portes, sauvegarde et restauration`,()=>{
 const maze=makeMaze(level),path=solve(maze,initial());assert.ok(path?.length);assert.ok(maze.edges.some(e=>e.gate>=0));const p=fresh();p.level=level;
 for(const to of path){const before=p.history.at(-1),after=step(maze,before,to);assert.ok(after);assert.equal(after.phase,1-before.phase);p.history.push(after);}
 assert.ok(isWon(maze,p.history.at(-1)));assert.equal(p.history.at(-1).mask,7);
 const raw=JSON.stringify(p);assert.deepEqual(decode(raw),p);
 p.history.pop();assert.ok(!isWon(maze,p.history.at(-1)));assert.deepEqual(decode(JSON.stringify(p)),p);
});
test('Un mur, une porte fermée et une limite bloquent sans mutation',()=>{
 const maze=makeMaze(0),f=initial(),copy=JSON.stringify(f);assert.equal(step(maze,f,-1),null);
 let checked=false;for(const e of maze.edges.filter(e=>e.gate>=0)){const f={pos:e.a,mask:0,phase:1-e.gate};assert.equal(step(maze,f,e.b),null);assert.ok(step(maze,{...f,phase:e.gate},e.b));checked=true;}assert.ok(checked);assert.equal(JSON.stringify(f),copy);
 assert.equal(target(maze,0,0),-1);
});
test('La sortie seule ne suffit pas sans les fragments',()=>assert.equal(isWon(makeMaze(0),{pos:24,mask:0,phase:0}),false));
test('Sauvegardes corrompues et parcours falsifiés rejetés',()=>{
 assert.throws(()=>decode('{'));assert.throws(()=>decode('{}'));let p=fresh();p.history.push({pos:24,phase:1,mask:7});assert.throws(()=>decode(JSON.stringify(p)));
});
