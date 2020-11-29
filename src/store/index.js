import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    getUsers: async function () {
      try {
        const result = await Axios.get(`${process.env.VUE_APP_SERVICE_API}/users`)
        console.log(result.data.result)
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
