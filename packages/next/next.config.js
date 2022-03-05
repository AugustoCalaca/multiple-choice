const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@multiple-choice/relay', '@multiple-choice/babel-next']);

module.exports = withPlugins([withTM], {
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
    relay: {
      src: './',
      schema: '../server/schema/schema.graphql',
      language: 'typescript',
      include: ['**/pages/**', '**/components/**', '**/mutations/**'],
      excludes: ['**/.next/**', '**/node_modules/**', '**/test/**', '**/__generated__/**'],
    },
  },
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
  },
});
