# Immediato

An isomorphic `setImmediate` implementation that doesn't prevent the process from exiting naturally.

This implementation requires the `MessageChannel` API, so it works the same everywhere, and the implementation is tiny.

## Install

```sh
npm install immediato
```

## Usage

```ts
import {setImmediate, clearImmediate} from 'immediato';

// Let's scheduling a function for execution

const immediateId = setImmediate ( () => {
  // Do something...
});

// Let's cancel a scheduled function

clearImmediate ( immediateId );
```

## License

MIT © Fabio Spampinato
