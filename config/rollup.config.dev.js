import typescript from "rollup-plugin-typescript";

export default {
    input: "../src/serve.ts",
    output: [
      {
        format: "cjs",
        file: "../lib/uni-mock-bundle.cjs.js"
      },
    ],
    plugins: [
        typescript({
          exclude: "node_modules/**",
          typescript: require("typescript")
        }),
      ],
  };