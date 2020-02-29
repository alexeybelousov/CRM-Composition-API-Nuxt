/* eslint-disable no-useless-catch */
import { fb } from "@/services/firebase"

import Cookie from "js-cookie"

export const state = () => ({
  user: null,
  loading: false
})

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async login({ commit }, { email, password }) {
    try {
      commit("setLoading", true)
      // Login the user
      await fb.auth().signInWithEmailAndPassword(email, password)

      // Get JWT from Firebase
      const token = await fb.auth().currentUser.getIdToken()
      const { uid } = fb.auth().currentUser

      // Set JWT to the cookie
      Cookie.set("__session", token)

      // Set the user locally
      commit("setUser", { email, uid, isServer: false })
    } catch (e) {
      commit("notify/setError", e, { root: true })
      throw e
    } finally {
      commit("setLoading", false)
    }
  },
  // eslint-disable-next-line no-unused-vars
  async register({ dispatch, commit }, { email, password, name }) {
    try {
      commit("setLoading", true)

      const res = await fb.auth().createUserWithEmailAndPassword(email, password)
      const uid = res.user.uid

      await fb
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          bill: 100,
          name
        })
    } catch (e) {
      commit("notify/setError", e, { root: true })
      throw e
    } finally {
      commit("setLoading", false)
    }
  },
  async logout({ commit }) {
    await fb.auth().signOut()
    await Cookie.remove("__session")

    commit("clearUser")
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearUser(state) {
    state.user = null
  },
  setLoading(state, status) {
    state.loading = status
  }
}

export const getters = {
  user: state => state.user,
  loading: state => state.loading
}
