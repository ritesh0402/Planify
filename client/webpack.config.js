const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
   entry: './src/index.ts', // Update this path to your TypeScript entry point
   resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
         "path": require.resolve("path-browserify"),
         "os": require.resolve("os-browserify/browser"),
         "crypto": require.resolve("crypto-browserify")
      }
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
      ],
   },
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
      new Dotenv()
   ]
};
