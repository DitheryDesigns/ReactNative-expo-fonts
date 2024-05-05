const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add a fallback for the crypto module
  config.resolve.fallback = config.resolve.fallback || {}; //get previous state or start new
  config.resolve.fallback.crypto = require.resolve('crypto-browserify'); //add fallback for when 'crypto' is called

  return config;
};
