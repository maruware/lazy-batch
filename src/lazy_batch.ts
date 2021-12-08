import debounce from "just-debounce-it";

const DEFAULT_MAX_DELAY = 5000;
const DEFAULT_MAX_LENGTH = 10;

export type LazyBatchOptions = {
  maxDelay?: number;
  maxLength?: number;
};

export type LazyBatchCallback<T> = (inputs: T[]) => void;

export class LazyBatch<T> {
  private inputs: T[];
  private maxLength: number;
  private cb: LazyBatchCallback<T>;

  private debouncedProcess: () => void;

  constructor(cb: LazyBatchCallback<T>, opts?: LazyBatchOptions) {
    this.cb = cb;
    this.inputs = [];
    this.maxLength = opts?.maxLength ?? DEFAULT_MAX_LENGTH;

    const maxDelay = opts?.maxDelay ?? DEFAULT_MAX_DELAY;
    this.debouncedProcess = debounce(this.process, maxDelay);
  }

  add(input: T) {
    this.inputs.push(input);

    if (this.inputs.length >= this.maxLength) {
      this.process();
    }
    this.debouncedProcess();
  }

  private process() {
    const inputs: T[] = [];
    let count = 0;
    while (true) {
      const i = this.inputs.shift();
      if (i === undefined) break;

      inputs.push(i);
      if (++count >= this.maxLength) {
        break;
      }
    }

    if (inputs.length > 0) {
      this.cb(inputs);
    }
  }
}
