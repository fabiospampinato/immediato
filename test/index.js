
/* IMPORT */

import {describe} from 'fava';
import {setTimeout as delay} from 'node:timers/promises';
import {setImmediate, clearImmediate} from '../dist/index.js';

/* MAIN */

describe ( 'Immediato', it => {

  it ( 'works', async t => {

    let calls = '';

    const i1 = setImmediate ( () => {
      calls += 'i1';
    });

    const i2 = setImmediate ( () => {
      calls += 'i2';
    });

    setTimeout ( () => {
      calls += 't1';
    }, 0 );

    queueMicrotask ( () => {
      calls += 'm1';
    });

    setTimeout ( () => {
      calls += 't2';
    }, 0 );

    queueMicrotask ( () => {
      calls += 'm2';
    });

    const i3 = setImmediate ( () => {
      calls += 'i3';
    });

    const i4 = setImmediate ( () => {
      calls += 'i4';
    });

    clearImmediate ( i2 );
    clearImmediate ( i4 );

    await delay ( 10 );

    t.is ( calls, 'm1m2i1i3t1t2' );

  });

});
