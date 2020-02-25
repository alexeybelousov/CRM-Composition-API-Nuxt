/* eslint-disable no-useless-catch */
// import firebase from 'firebase/app';
import { fb } from "@/services/firebase";

// import { auth } from "@/services/firebase";
import Cookie from "js-cookie";

export const state = () => ({
  user: null,
})

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async login({ dispatch, commit }, { email, password }) {
    try {
      // Login the user
      await fb.auth().signInWithEmailAndPassword(email, password);

      // Get JWT from Firebase
      const token = await fb.auth().currentUser.getIdToken();
      const { uid } = fb.auth().currentUser;

      // Set JWT to the cookie
      Cookie.set('access_token', token);

      // Set the user locally
      commit('setUser', { email, uid, isServer: false }); // SET_USER
    } catch (e) {
      commit('setError', e);
      throw e;
    }
  },
  // eslint-disable-next-line no-unused-vars
  async register({ dispatch, commit }, { email, password, name }) {
    try {
      await fb.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch('getUid');
      await fb.database().ref(`/users/${uid}/info`).set({
        bill: 100,
        name,
      });
    } catch (e) {
      commit('setError', e);
      throw e;
    }
  },
  getUid() {
    const user = fb.auth().currentUser;
    return user ? user.uid : null;
  },
  async logout({ commit }) {
    await fb.auth().signOut();
    await Cookie.remove("access_token");

    commit('clearUser');
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
};

export const getters = {
  user: (state) => state.user,
};

// export default {
//   state: {
//     user: null,
//   },
//   actions: {
//     // eslint-disable-next-line no-unused-vars
//     async login({ dispatch, commit }, { email, password }) {
//       try {
//         // Login the user
//         await fb.auth().signInWithEmailAndPassword(email, password);

//         // Get JWT from Firebase
//         const token = await fb.auth().currentUser.getIdToken();
//         const { uid } = fb.auth().currentUser;

//         // Set JWT to the cookie
//         Cookie.set('access_token', token);

//         // Set the user locally
//         commit('setUser', { email, uid, isServer: false }); // SET_USER
//       } catch (e) {
//         commit('setError', e);
//         throw e;
//       }
//     },
//     // eslint-disable-next-line no-unused-vars
//     async register({ dispatch, commit }, { email, password, name }) {
//       try {
//         await fb.auth().createUserWithEmailAndPassword(email, password);
//         const uid = await dispatch('getUid');
//         await fb.database().ref(`/users/${uid}/info`).set({
//           bill: 100,
//           name,
//         });
//       } catch (e) {
//         commit('setError', e);
//         throw e;
//       }
//     },
//     getUid() {
//       const user = fb.auth().currentUser;
//       return user ? user.uid : null;
//     },
//     async logout({ commit }) {
//       await fb.auth().signOut();
//       await Cookie.remove("access_token");

//       commit('clearUser');
//     },
//   },
//   mutations: {
//     setUser(state, user) {
//       state.user = user;
//     },
//     clearUser(state) {
//       state.user = null;
//     },
//   },
//   getters: {
//     user: (s) => s.user,
//   },
// };
