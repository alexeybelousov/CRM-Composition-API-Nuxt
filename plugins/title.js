/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import Vue from 'vue';
import localizeFilter from '@/filters/localize.filter';

export default function ({ store }) {
  Vue.use({
    install(Vue, options) {
      Vue.prototype.$title = function (titleKey) {
        const appName = process.env.VUE_APP_TITLE;

        return `${localizeFilter(titleKey, store)} | ${appName}`;
      };
    },
  });
}



