const common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require features/step_definitions/**/*.ts',
  `--format-options '{"snippetInterface": "synchronous"}'`
].join(' ');

module.exports = {
  default: common
}
