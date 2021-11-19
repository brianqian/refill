module.exports = (api) => {
  // This caches the Babel config by environment.
  api.cache.using(() => process.env.NODE_ENV);

  return {
    // ... other options
    presets: [
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      // ... other plugins
      // Applies the react-refresh Babel plugin on non-production modes only
      ['babel-plugin-styled-components', { displayName: true }],
      '@babel/plugin-proposal-class-properties',
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
  };
};
