
/* IMPORT */

import type {Callback} from './types';

/* HELPERS */

let callbacksId = 0;
let callbacksExecuting = false;
let callbacksMap = new Map<number, Callback> ();
let {port1, port2} = new MessageChannel ();

/* MAIN */

const setImmediate = ( callback: Callback ): number => {
  const callbackId = ( callbacksId += 1 );
  callbacksMap.set ( callbackId, callback );
  port1.onmessage = runImmediate;
  port2.postMessage ( callbackId );
  return callbackId;
};

const clearImmediate = ( callbackId: number ): void => {
  callbacksMap.delete ( callbackId );
  if ( callbacksMap.size ) return;
  port1.onmessage = null; // Important to reset this, as it will ~hang the process otherwise
};

const runImmediate = ( event: { data: number } ): void => {
  const callbackId = event.data;
  const callback = callbacksMap.get ( callbackId );
  if ( !callback ) return;
  if ( callbacksExecuting ) {
    setTimeout ( runImmediate, 0, callbackId );
  } else {
    try {
      callbacksExecuting = true;
      callback ();
    } finally {
      callbacksExecuting = false;
      clearImmediate ( callbackId );
    }
  }
};

/* EXPORT */

export {setImmediate, clearImmediate};
