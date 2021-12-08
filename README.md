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
const cb = (inputs: number[]) => {
  console.log(inputs);
}
const lb = new LazyBatch<number>(cb, { maxLength: 2, maxDelay: 3000 });
lb.add(123);
lb.add(456);

// See [123, 456]
```
