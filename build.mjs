import {stripTypeScriptTypes} from 'node:module';
import {readFileSync,writeFileSync} from 'node:fs';
for(const name of ['engine','app']) writeFileSync(`dist/${name}.js`,stripTypeScriptTypes(readFileSync(`src/${name}.ts`,'utf8')).replaceAll("'./engine.ts'","'./engine.js'"));
