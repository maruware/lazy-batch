import { LazyBatch } from "./lazy_batch";

test("processed on full inputs", () => {
  jest.useFakeTimers();

  const cb = jest.fn();
  const len = 10;
  const delay = 1000;
  const lb = new LazyBatch<number>(cb, { maxLength: len, maxDelay: delay });

  for (let i = 0; i < len; i++) {
    lb.add(i);
  }

  expect(cb.mock.calls.length).toBe(1);
  expect(cb.mock.calls[0][0]).toStrictEqual([...Array(len)].map((_, i) => i));

  jest.advanceTimersByTime(delay);
  // no call
  expect(cb.mock.calls.length).toBe(1);
});

test("2 times processed on full inputs ", () => {
  jest.useFakeTimers();

  const cb = jest.fn();
  const len = 10;
  const delay = 1000;
  const lb = new LazyBatch<number>(cb, { maxLength: len, maxDelay: delay });

  for (let i = 0; i < len * 2; i++) {
    lb.add(i);
  }

  expect(cb.mock.calls.length).toBe(2);
  expect(cb.mock.calls[0][0]).toStrictEqual([...Array(len)].map((_, i) => i));

  jest.advanceTimersByTime(delay);
  // no call
  expect(cb.mock.calls.length).toBe(2);
});

test("processed after max delay", () => {
  jest.useFakeTimers();

  const cb = jest.fn();
  const len = 10;
  const delay = 1000;
  const lb = new LazyBatch<number>(cb, { maxLength: len, maxDelay: delay });

  lb.add(0);
  lb.add(1);

  expect(cb.mock.calls.length).toBe(0);

  jest.advanceTimersByTime(delay);
  expect(cb.mock.calls.length).toBe(1);
  expect(cb.mock.calls[0][0]).toStrictEqual([0, 1]);
});
