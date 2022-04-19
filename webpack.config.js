module.exports = {
  resolve: {
    extensions: ['.jsx', '.js', '.ts', 'tsx'],
    alias: {
      '@': require('path').resolve(__dirname, 'app'),
    },
  },
};
