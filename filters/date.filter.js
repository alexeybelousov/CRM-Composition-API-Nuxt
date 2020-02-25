// import { state } from '../store/userInfo';
// import Vuex from 'vuex';
import _ from 'lodash';

export default function dateFilter(value, format = 'date', store) {
  const options = {};

  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }

  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  const locale = _.get(store, "getters['userInfo/info'].locale", null) || 'en-US';
  return new Intl.DateTimeFormat(locale, options).format(value);
}
