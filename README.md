# lazy-batch

Run tasks lazily in batches

- Process when the num of inputs reaches limit
- Process after max delay

## Installation

```sh
$ npm install lazy-batch
# or
$ yarn add lazy-batch
```

## Usage

```ts
import { LazyBatch } from "lazy-batch";

const batchProcess = (inputs: number[]) => {
  console.log(inputs);
}
const lazyBatch = new LazyBatch<number>(batchProcess, { maxLength: 2, maxDelay: 3000 });
lazyBatch.add(123);
lazyBatch.add(456);

// See [ 123, 456 ]
```
