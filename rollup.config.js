import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

export default [
  {
    input: "dist-tsc/lazy_batch.js",
    output: {
      name: "lazyBatch",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [resolve(), commonjs()],
  },
  {
    input: "dist-tsc/lazy_batch.js",
    external: ["just-debounce-it"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
