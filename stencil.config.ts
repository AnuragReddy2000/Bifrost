import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css',
  taskQueue: 'async',
  outputTargets: [{
    type: 'www',
    serviceWorker: null,
    baseUrl:"https://anuragreddy2000.github.io/Bifrost/"
  }],
  devServer: {
    address: "0.0.0.0",
    port: 80
  }
};
