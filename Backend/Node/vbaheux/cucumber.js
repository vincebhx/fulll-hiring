const common = [
  "features/**/*.feature",
  "--require-module ts-node/register",
  "--require features/step_definitions/**/*.ts",
  '--format-options \'{"snippetInterface": "synchronous"}\'',
].join(" ");

// eslint-disable-next-line no-undef
module.exports = {
  default: common,
};
