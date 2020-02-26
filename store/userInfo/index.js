import { fb } from "@/services/firebase";

export const state = () => ({
  info: null,
});

export const actions = {
  async updateUserInfo({ dispatch, commit, rootGetters, getters }, toUpdate) {
    try {
      const uid = rootGetters['auth/user'].uid;
      const updateData = { ...getters['info'], ...toUpdate };

      await fb.database().ref(`/users/${uid}/info`).update(updateData);

      commit('setUserInfo', updateData);
    // eslint-disable-next-line no-empty
    } catch (e) {
      commit('notify/setError', e, { root: true });
      throw e;
    }
  },
  async fetchUserInfo({ dispatch, commit, rootGetters }) {
    try {
      const uid = rootGetters['auth/user'].uid;
      const info = (await fb.database().ref(`/users/${uid}/info`).once('value')).val();

      commit('setUserInfo', info);
    // eslint-disable-next-line no-empty
    } catch (e) {
      commit('notify/setError', e, { root: true });
      throw e;
    }
  },
};

export const mutations = {
  setUserInfo(state, info) {
    state.info = info;
  },
  clearUserInfo(state) {
    state.info = null;
  },
};

export const getters = {
  info: (state) => state.info,
};
