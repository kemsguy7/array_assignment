
import {  setTimeout, setInterval } from 'node:timers/promises';

// set 
const a = [
    setTimeout(1000, 1),
    setTimeout(1010, 2),
    setTimeout(1100, 3),
    setTimeout(1200, 4),
    setTimeout(900).then(() => {
        throw Error('Rejected');
    }),
    setTimeout(1300, 5),
];

for (let i =0; i < 10; i++) {
    a.push(setTimeout(5 * 1000, Math.random()));
}

console.log(await Promise.all(a)); 

const promiseResult = await Promise.allSettled(a);

const mapResult = promiseResult
    .map((result) => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
            return false;
        }
    })
    .filter(Boolean)

console.log(mapResult); 
