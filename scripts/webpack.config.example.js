const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../examples'),
  entry: makeEntries([
    'basic'
  ]),
  output: {
    path: path.resolve(__dirname, '../examples'),
    filename: '[name]/__build__.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.vue'],
    alias: {
          vue: 'vue/dist/vue.esm.js',
          root: path.join(__dirname, '../client'),
          '@': resolve('src')
    },
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'awesome-typescript-loader',
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        },
        {
            test: /\.js$/,
            loaders: ['babel-loader'],
            include: [
                resolve('src'),
                resolve('test')
            ],
            exclude: [/node_modules/]
        },
    ]
  },
  devtool: 'inline-source-map'
}

function makeEntries (names) {
  const res = {}
  names.forEach(name => {
    res[name] = `./${name}/main.js`
  })
  return res
}
