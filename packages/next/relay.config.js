module.exports = {
  watchman: false,
  src: './',
  schema: '../server/schema/schema.graphql',
  language: 'typescript',
  include: [`**/pages/**`, `**/components/**`, `**/mutations/**`],
  exclude: ['**/.next/**', '**/node_modules/**', '**/test/**', '**/__generated__/**'],
};
