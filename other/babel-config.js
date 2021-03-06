// we don't want to use babel-macros inside babel-macros...
// and until kcd-scripts gets upgraded to babel-plugin-macros
// we'll have both of those referenced here...
const getBabelConfig = require('kcd-scripts/babel')

module.exports = (...args) => {
  const babelConfig = getBabelConfig(...args)
  babelConfig.plugins = babelConfig.plugins.filter(
    pluginPath =>
      !pluginPath.includes('babel-macros/') &&
      !pluginPath.includes('babel-plugin-macros/'),
  )
  const envPreset = babelConfig.presets.find(
    p => p[0] && p[0].includes('preset-env'),
  )
  envPreset[1].modules = 'commonjs'
  return babelConfig
}
