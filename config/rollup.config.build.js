import * as path from "path";
import typescript from "rollup-plugin-typescript";

export default {
    input: path.resolve(__dirname, "../src/entry.ts"),
    output: [
      {
        format: "cjs",
        banner: '#!/usr/bin/env node',
        file: path.resolve(__dirname, "../lib/uni-mock-bundle.cjs.js")
      },
    ],
    plugins: [
        typescript({
          exclude: "node_modules/**",
          typescript: require("typescript")
        }),
      ],
  };