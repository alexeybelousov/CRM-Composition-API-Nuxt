import { fb } from "@/services/firebase"

export const state = () => ({
  records: []
})

export const actions = {
  async fetchRecords({ commit, rootGetters }) {
    try {
      const uid = rootGetters["auth/user"] && rootGetters["auth/user"].uid
      const records =
        (
          await fb
            .database()
            .ref(`/users/${uid}/records`)
            .once("value")
        ).val() || {}

      commit(
        "setRecords",
        Object.keys(records).map(key => ({ ...records[key], id: key }))
      )
    } catch (e) {
      commit("notify/setError", e, { root: true })
      throw e
    }
  },
  async fetchRecordById({ commit, rootGetters }, id) {
    try {
      const uid = rootGetters["auth/user"] && rootGetters["auth/user"].uid
      const record =
        (
          await fb
            .database()
            .ref(`/users/${uid}/records`)
            .child(id)
            .once("value")
        ).val() || {}

      return { ...record, id }
    } catch (e) {
      commit("notify/setError", e, { root: true })
      throw e
    }
  },
  async createRecord({ dispatch, commit, rootGetters }, record) {
    try {
      const uid = rootGetters["auth/user"] && rootGetters["auth/user"].uid
      await fb
        .database()
        .ref(`/users/${uid}/records`)
        .push(record)

      const bill =
        record.type === "income"
          ? rootGetters["userInfo/info"].bill + record.amount
          : rootGetters["userInfo/info"].bill - record.amount

      dispatch("userInfo/updateUserInfo", { bill }, { root: true })
    } catch (e) {
      commit("notify/setError", e, { root: true })
      throw e
    }
  }
}

export const mutations = {
  setRecords(state, records) {
    state.records = records
  }
}

export const getters = {
  records: s => s.records
}
