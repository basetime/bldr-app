module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "quotes": [
      "error",
      "double",
      {
        "allowTemplateLiterals": true,
      },
    ],
    "object-curly-spacing": 0,
    "new-cap": 0,
  },
};
