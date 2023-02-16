# Immediato

An isomorphic `setImmediate` implementation that doesn't prevent the process from exiting naturally.

This implementation requires the `MessageChannel` API, so it works the same everywhere, and the implementation is tiny.

## Install

```sh
npm install --save immediato
```

## Usage

```ts
import {setImmediate, clearImmediate} from 'immediato';

// Scheduling a function for execution

const immediateId = setImmediate ( () => {
  // Do something...
});

// Cancelling a scheduled function

clearImmediate ( immediateId );
```

## License

MIT © Fabio Spampinato
