module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead, ie 11",
        useBuiltIns: "entry",
        corejs: 3
      }
    ]
  ]
};
