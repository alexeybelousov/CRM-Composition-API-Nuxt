import Vue from 'vue';

if (process.client) {
  const Paginate = require('vuejs-paginate');

  Vue.component('Paginate', Paginate);
}
