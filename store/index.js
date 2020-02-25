import axios from 'axios';
import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";

export const state = () => ({
  currency: null,
});

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;

    if (!accessTokenCookie) return;

    const decoded = JWTDecode(accessTokenCookie);

    if (decoded) {
      commit('auth/setUser', {
        uid: decoded.user_id,
        email: decoded.email,
        isServer: true,
      });
    }
  },
  async fetchCurrency({ commit }) {
    const key = process.env.VUE_APP_FIXER;
    const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`);

    commit('setCurrency', res.data);
  },
};

export const mutations = {
  setCurrency(state, currency) {
    state.currency = currency;
  },
};

export const getters = {
  currency: (state) => state.currency,
};
