module.exports = {
  plugins: ['relay', ['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }]],
};
