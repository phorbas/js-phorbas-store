import path from 'node:path'

export default ({
  appType: 'mpa',
  define: {},

  resolve: {
    alias: {
      "node:test": path.resolve("./test/web_bdd_mocha.js"),
    },
  },

  build: {
    target: 'esnext',
    modulePreload: { polyfill: false },
    watch: { buildDelay: 100 }
  },
})

