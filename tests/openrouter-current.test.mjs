import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {CURRENT_OR_MODELS,CURRENT_OR_ROUTES} from '../src/openrouter-current.js';

const snapshot=JSON.parse(await readFile(new URL('../research/openrouter-2026-10-20.json',import.meta.url),'utf8'));

test('current OpenRouter models are independent, restricted snapshots with real default routes',()=>{
 assert.equal(CURRENT_OR_MODELS.length,8);
 for(const model of CURRENT_OR_MODELS){
  assert.equal(model.id,'or26-'+model.baseModelId);
  assert.equal(model.provider,'openrouter');
  assert.equal(model.gatewayOnly,true);
  assert.deepEqual(model.allowedKinds,['openrouter']);
  assert.equal(model.checked,'2026-10-20');
  assert.equal(model.defaultRoute,CURRENT_OR_ROUTES[model.id][0].id);
  assert.deepEqual(model.rates,CURRENT_OR_ROUTES[model.id][0].rates);
  assert.equal(model.glm,undefined);
  assert.equal(model.credit,undefined);
  assert.equal(model.fast,undefined);
  assert.equal(model.ultrafast,undefined);
 }
});

test('every route price matches the checked exact provider snapshot without reapplying discounts',()=>{
 let count=0;
 for(const model of CURRENT_OR_MODELS)for(const route of CURRENT_OR_ROUTES[model.id]){
  count++;
  const evidence=snapshot.selected_routes.find(r=>r.model_id===route.modelSlug&&r.provider_tag===route.id);
  assert.ok(evidence,route.id);
  assert.equal(route.source,evidence.source_url);
  assert.equal(route.providerModelId,evidence.provider_model_id);
  const prices=route.timed?evidence.conditional_prices.find(p=>p.utc_start===100):evidence.prices;
  assert.deepEqual(route.rates,[prices.prompt,prices.input_cache_write??null,prices.input_cache_read,prices.completion]);
  assert.equal(route.status,0);
  assert.equal(route.currency,'USD');
  assert.deepEqual(route.speedModes,['standard']);
 }
 assert.equal(count,14);
 const streamlake=CURRENT_OR_ROUTES['or26-flash'].find(r=>r.id==='streamlake/fp8');
 assert.equal(streamlake.rates[0],0.073845);
 assert.equal(streamlake.publishedDiscountAlreadyApplied,0.5077);
});

test('unpublished cache write prices remain unknown, never free or fabricated',()=>{
 for(const route of Object.values(CURRENT_OR_ROUTES).flat()){
  assert.equal(route.cacheWriteKnown,route.rates[1]!==null);
  if(!route.cacheWriteKnown){
   assert.equal(route.rates[1],null);
   assert.match(route.limitations.join(' '),/null must not be treated as zero/);
  }
 }
});

test('route metadata separates timed vendor prices, fixed hosts and regional surcharges',()=>{
 const pro=CURRENT_OR_ROUTES['or26-dspro'];
 assert.equal(pro[0].id,'deepseek');
 assert.deepEqual(pro[0].rates,[1.32,null,0.044,3.96]);
 assert.deepEqual(pro[0].off,[0.66,null,0.022,1.98]);
 for(const route of pro.slice(1)){
  assert.equal(route.timed,false);
  assert.equal(route.off,undefined);
 }
 assert.equal(CURRENT_OR_MODELS.find(m=>m.id==='or26-dsflash').defaultRoute,'sail-research/fp4');
 assert.equal(CURRENT_OR_ROUTES['or26-sol'][1].requiresBusiness,true);
 assert.deepEqual(CURRENT_OR_ROUTES['or26-sol'][1].rates,[2.2,2.75,0.11,11]);
 assert.equal(CURRENT_OR_ROUTES['or26-sol'][0].thresholdComparison,'gt');
 assert.equal(CURRENT_OR_ROUTES['or26-opus'][0].write1h,8);
});
