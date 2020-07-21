const babelNext = require('@multiple-choice/babel-next');

module.exports = {
  presets: ['next/babel'],
  plugins: [...babelNext.plugins],
};
