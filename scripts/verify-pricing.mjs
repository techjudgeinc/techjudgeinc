import assert from 'node:assert/strict';
import {createPlan} from '../src/lib/it-plan.ts';
const params=new URLSearchParams('users=18&management=managed&security=core&cloud=microsoft&coverage=business&network=basic');
let result=createPlan(params);
assert.equal(result.perUser,157);assert.equal(result.low,2500);assert.equal(result.high,3500);
// Known prototype group representatives exercise each volume factor.
for(const [users,factor] of [[7,1.16],[18,1],[38,.94],[75,.89],[165,.84],[300,.78]]){
 params.set('users',String(users));result=createPlan(params);assert.equal(result.perUser,157*factor);
}
for(const [users,factor] of [[10,1.16],[11,1],[25,1],[26,.94],[50,.94],[51,.89],[100,.89],[101,.84],[250,.84],[251,.78]]){
 params.set('users',String(users));assert.equal(createPlan(params).perUser,157*factor);
}
const full=createPlan(new URLSearchParams('users=18&management=strategy&security=complete&cloud=hybrid&coverage=continuous&network=advanced'));
assert.equal(full.perUser,336);assert.equal(full.low,5300);assert.equal(full.high,7500);
for(const users of ['0','-1','1.5','10001','bad']){params.set('users',users);assert.equal(createPlan(params),null);}
params.set('users','18');params.set('network','unrecognized');assert.equal(createPlan(params),null);
console.log('Pricing checks passed: prototype examples, every volume boundary, all maximum add-ons and invalid input.');
