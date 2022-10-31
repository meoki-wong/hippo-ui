
module.exports = {
    plugins: [
        [
          '@babel/plugin-transform-typescript',
          {
            allowDeclareFields: true,
          },
        ],
        '@babel/plugin-syntax-dynamic-import',
    ],
}