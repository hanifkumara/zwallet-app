import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '' || localStorage.getItem('token'),
    dataUser: [],
    getTransactionSender: []
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    GET_DATA_USER (state, payload) {
      state.dataUser = payload
    },
    GET_TRANSACTION_SENDER (state, payload) {
      state.getTransactionSender = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
    }
  },
  actions: {
    getDataUser (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/myprofile`)
          .then(res => {
            const result = res.data.result[0]
            context.commit('GET_DATA_USER', result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDataTransactionSender (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/idSender`)
          .then(res => {
            const result = res.data.result.transaction
            context.commit('GET_TRANSACTION_SENDER', result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateProfile (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/users`, payload)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/auth/login`, payload)
          .then(res => {
            const { result } = res.data
            context.commit('SET_USER', result)
            localStorage.setItem('id', result.id)
            localStorage.setItem('token', result.token)
            context.dispatch('interceptorRequest')
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    signup (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/auth/register`, payload)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response.data.err.message)
        if (error.response.status === 401) {
          if (error.response.data.err.message === 'Invalid Token') {
            localStorage.clear()
            context.commit('REMOVE_TOKEN')
            router.push({ name: 'Login' })
          } else if (error.response.data.err.message === 'Token Expired') {
            localStorage.clear()
            context.commit('REMOVE_TOKEN')
            router.push({ name: 'Login' })
          }
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getUser (state) {
      return state.dataUser
    },
    isLogin (state) {
      return state.token !== null
    },
    getTransactionSender (state) {
      return state.getTransactionSender
    }
  },
  modules: {
  }
})
