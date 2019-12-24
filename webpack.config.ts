/* eslint-disable no-console, import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';

const configCallback = (
  env: { [key: string]: string },
  argv: webpack.Configuration,
): webpack.Configuration => {
  const mode = argv.mode || 'development';
  console.log('running webpack with mode:', mode);

  const config: webpack.Configuration = {
    mode,

    entry: {
      'unlocalize-digits': './src/lib.ts',
    },
    target: 'node',
    output: {
      filename: mode === 'production' ? '[name].min.js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'umd',
      globalObject: `(typeof self !== 'undefined' ? self : this)`,
      umdNamedDefine: true,
    },

    resolve: {
      extensions: ['.ts', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.[tj]s$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.[jt]sx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };

  if (mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
};

export default configCallback;
