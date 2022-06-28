var fs = require('fs');
var nodeModules = {
  atom: "commonjs atom",
  github: "commonjs github",
  '@atom/nsfw': "commonjs @atom/nsfw",
  '@atom/watcher': 'commonjs @atom/watcher',
};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin', 'build'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  nodeModules: nodeModules,
  modules: {
    rules: [
      {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        options: {
          bare: false,
          transpile: {
            presets: ["@babel/env"],
          }
        }
      }, {
        test: /\.jsx$/,
        loader: 'coffee-loader',
        options: {
          transpile: {
            presets: ["@babel/env"],
          }
        }
      }
    ]
  }
}
