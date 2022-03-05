module.exports = {
  src: './',
  schema: '../server/schema/schema.graphql',
  language: 'typescript',
  include: ['**/pages/**', '**/components/**', '**/mutations/**'],
  excludes: ['**/.next/**', '**/node_modules/**', '**/test/**', '**/__generated__/**'],
};
