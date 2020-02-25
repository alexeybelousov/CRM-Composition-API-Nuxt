import { fb } from "@/services/firebase";

export const state = () => ({
  categories: [],
});

export const actions = {
  async fetchCategories({ dispatch, commit, rootGetters }) {
    try {
      const uid = rootGetters['auth/user'].uid;
      const categories = (await fb.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

      commit('setCategories', Object.keys(categories).map((key) => ({ ...categories[key], id: key })));
    } catch (e) {
      commit('notify/setError', e, { root: true });
      throw e;
    }
  },
  async fetchCategoryById({ dispatch, commit, rootGetters }, id) {
    try {
      const uid = rootGetters['auth/user'].uid;
      const category = (await fb.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};

      return { ...category, id };
    } catch (e) {
      commit('notify/setError', e, { root: true });
      throw e;
    }
  },
  async createCategory({ dispatch, commit, rootGetters }, { title, limit }) {
    try {
      const uid = rootGetters['auth/user'].uid;
      const category = await fb.database().ref(`/users/${uid}/categories`).push({ title, limit });

      commit('addCategory', { title, limit, id: category.key });
    } catch (e) {
      commit('notify/setError', e, { root: true });
      throw e;
    }
  },
  async updateCategory({ dispatch, commit, rootGetters }, { title, limit, id }) {
    try {
      const uid = rootGetters['auth/user'].uid;
      await fb.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit });

      commit('updateCategory', { title, limit, id });
    } catch (e) {
      commit('notify/setError', e, { root: true });
      throw e;
    }
  },
};

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  addCategory(state, category) {
    state.categories = [
      ...state.categories,
      category,
    ];
  },
  updateCategory(state, category) {
    state.categories = state.categories.map((cat) => {
      if (cat.id === category.id) {
        return category;
      }

      return cat;
    });
  },
};

export const getters = {
  categories: (s) => s.categories,
};
