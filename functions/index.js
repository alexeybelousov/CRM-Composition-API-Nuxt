const functions = require('firebase-functions');
const { Nuxt } = require('nuxt-start');

const nuxtConfig = require('./nuxt.config.js');

const config = {
  ...nuxtConfig,
  dev: false,
  debug: true,
  buildDir: 'nuxt',
};
const nuxt = new Nuxt(config);

exports.ssrapp = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  console.log('kek', req.headers.cookie);
  nuxt.render(req, res);
});
