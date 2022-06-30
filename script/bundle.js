const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const snap = new webpack.DefinePlugin({
  'isGeneratingSnapshot': false
})

let nodeModules = {
  semver: "commonjs semver",
  atom: "commonjs atom",
  github: "commonjs github",
  'nslog': 'commonjs nslog',
  'fswin': 'commonjs fswin',
  '@atom/nsfw': "commonjs @atom/nsfw",
  '@atom/watcher': 'commonjs @atom/watcher',
  "electron": "commonjs electron",
  "pathwatcher": "commonjs pathwatcher",
  "@atom/nsfw": "commonjs @atom/nsfw",
  "@atom/watcher": "commonjs @atom/watcher",
  "fs-admin": "commonjs fs-admin",
  "git-utils": "commonjs git-utils",
  "oniguruma": "commonjs oniguruma",
  "superstring": "commonjs superstring",
  "keybinding-resolver": "commonjs keybinding-resolver",
  "keytar": "commonjs keytar",
  "loophole": "commonjs loophole",
  "pegjs": "commonjs pegjs",
  "@atom/fuzzy-native": "commonjs @atom/fuzzy-native",
  "scrollbar-style": "commonjs scrollbar-style",
  "spellchecker": "commonjs spellchecker",
  "ctags": "commonjs ctags",
  "keyboard-layout": "commonjs keyboard-layout",
  "open-on-github": "commonjs open-on-github",
  "babel-core": "commonjs babel-core",
  "natural": "commonjs natural",
  "xregexp": "commonjs xregexp",
  "dugite": "commonjs dugite",
  "yaml-front-matter": "commonjs yaml-front-matter",
  "cheerio": "commonjs cheerio",
  "marked": "commonjs marked",
  // "typescript-simple": "commonjs typescript-simple",
  // "typescript": "commonjs typescript",
  // "coffee-script": "commonjs coffee-script",
  "fs-extra": "commonjs fs-extra",
  "graceful-fs": "commonjs graceful-fs",
  "htmlparser2": "commonjs htmlparser2",
  "minimatch": "commonjs minimatch",
  "request": "commonjs request",
  "temp": "commonjs temp",
  "parse5": "commonjs parse5",
  "atom-keymap": "commonjs atom-keymap",
  "debug": "commonjs debug",
  "glob": "commonjs glob",
  "iconv-lite": "commonjs iconv-lite",
  "less": "commonjs less",
  "less-node": "commonjs less-node",
  "lodash.isequal": "commonjs lodash.isequal",
  "node-fetch": "commonjs node-fetch",
  "resolve": "commonjs resolve",
  "tar": "commonjs tar",
  "tmp": "commonjs tmp",
  "tree_sitter": "commonjs tree_sitter",
  "yauzl": "commonjs yauzl",
  "util-deprecate": "commonjs util-deprecate",
  "winreg": "commonjs winreg",
  "scandal": "commonjs scandal",
  "vscode-ripgrep": "commonjs vscode-ripgrep",
  'tree-sitter': 'commonjs tree-sitter',
  '@atom/source-map-support': 'commonjs @atom/source-map-support',
  "./snippet-body.pegjs": "commonjs ./snippet-body.pegjs"
};

const modules = {
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
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', 'babel-preset-atomic']
        }
      }
    },
  ]
}

const template = {
  devtool: false,
  mode: 'development',
  target: 'electron-main',

  resolve: {
    extensions: ['.js', '.jsx', '.coffee', '.json', 'pegjs']
  },

  plugins: [snap],

  module: {...modules},
  externals: {...nodeModules}
}

function genConfig(config) {
  return {...template, ...config}
}

function compile(config) {
  webpack(config, (err, stats) => {
    if(err) {
      console.log("Error compiling", config.entry, "\nErrors:", err)
      process.exit(1)
    } else if(stats.hasErrors()) {
      console.log("Error compiling", config.entry, "\nErrors:", stats.toString())
      process.exit(1)
    }
    console.log("Done compiling", config.entry)
  });
}
let config = genConfig({
  entry: './src/main-process/main.js',
  target: 'electron-main',
  output: {
    path: path.resolve('app', 'src', 'main-process'),
    filename: 'main.js',
  },
})
config.externals['./start'] = 'commonjs ./start'
compile(config)


config = genConfig({
  entry: './src/main-process/start.js',
  target: 'electron-main',
  output: {
    path: path.resolve('app', 'src', 'main-process'),
    filename: 'start.js',
    library: { type: 'commonjs2' }
  },
})
config.externals['./atom-application'] = 'commonjs ./atom-application'
compile(config)

config = genConfig({
  entry: './src/main-process/atom-application.js',
  target: 'node',
  output: {
    path: path.resolve('app', 'src', 'main-process'),
    filename: 'atom-application.js',
    library: { type: 'commonjs2' }
  },
})
config.externals['../initialize-application-window'] = 'commonjs ../initialize-application-window'
compile(config)


config = genConfig({
  entry: './static/index.js',
  target: 'node',
  output: {
    path: path.resolve('app', 'static'),
    filename: 'index.js',
    library: { type: 'commonjs2' }
  },
})
compile(config)

config = genConfig({
  entry: './exports/atom.js',
  target: 'electron-renderer',
  output: {
    path: path.resolve('app', 'exports'),
    filename: 'atom.js',
    library: { type: 'commonjs2' }
  },
})
compile(config)

const files = [
  'initialize-application-window.js',
  'get-window-load-settings.js',
  'get-release-channel.js',
  'startup-time.js',
  'file-system-blob-store.js',
  'native-compile-cache.js',
  'compile-cache.js',
  'module-cache',
  'crash-reporter-start',
]

files.forEach(f => {
  const fileConfig = genConfig({
    entry: `./src/${f}`,
    target: 'electron-renderer',
    output: {
      path: path.resolve('app', 'src'),
      filename: f,
      library: { type: 'commonjs2' }
    },
  })
  compile(fileConfig)
})
