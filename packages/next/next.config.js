const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@multiple-choice/relay', '@multiple-choice/babel-next']);

module.exports = withPlugins([withTM], {
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  reactStrictMode: true,
  // experimental: {
  //   reactMode: 'concurrent',
  // },
});
