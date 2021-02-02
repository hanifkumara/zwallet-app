import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: '' || localStorage.getItem('token'),
    allUsers: [],
    dataUser: [],
    getTransactionSender: [],
    dataIncome: [],
    listUsers: [],
    getUserId: [],
    pagination: {},
    paginationUser: {},
    paginationAllUsers: {},
    paginationIncome: {}
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    SET_PAGINATION (state, payload) {
      state.pagination = payload
    },
    PAGINATION_ALL_USERS (state, payload) {
      state.paginationAllUsers = payload
    },
    SET_PAGINATION_USERS (state, payload) {
      state.paginationUser = payload
    },
    GET_ALL_USERS (state, payload) {
      state.allUsers = payload
    },
    GET_DATA_USER (state, payload) {
      state.dataUser = payload
    },
    GET_DATA_USER_ID (state, payload) {
      state.getUserId = payload
    },
    GET_TRANSACTION_SENDER (state, payload) {
      state.getTransactionSender = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
    },
    GET_LIST_USERS (state, payload) {
      state.listUsers = payload
    },
    SET_DATA_INCOME (state, payload) {
      state.dataIncome = payload
    },
    SET_PAGINATION_INCOME (state, payload) {
      state.paginationIncome = payload
    }
  },
  actions: {
    getAllUsers (context, noPage = 1) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users?page=${noPage}`)
          .then(res => {
            const result = res.data.result
            context.commit('GET_ALL_USERS', result.users)
            context.commit('PAGINATION_ALL_USERS', result.pagination)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
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
    getListUsers (context, noPage = 1) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/listusers?page=${noPage}`)
          .then(res => {
            const result = res.data.result
            context.commit('GET_LIST_USERS', result.users)
            context.commit('SET_PAGINATION_USERS', result.pagination)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDataUserId (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${payload}`)
          .then(res => {
            const result = res.data.result[0]
            context.commit('GET_DATA_USER_ID', result)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDataTransactionSender (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/idSender?page=${payload.pagination}&name=${payload.name}&sort=${payload.sort}`)
          .then(res => {
            const result = res.data.result
            context.commit('GET_TRANSACTION_SENDER', result.transaction)
            context.commit('SET_PAGINATION', result.pagination)
            resolve(result)
          })
          .catch(err => {
            reject(err.response.data.err.message)
          })
      })
    },
    getDataIncomes (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/income?name=${payload.name}&page=${payload.page}`)
          .then(res => {
            const result = res.data.result
            console.log('ini data income', result)
            context.commit('SET_DATA_INCOME', result.result)
            context.commit('SET_PAGINATION_INCOME', result.pagination)
            resolve(result)
          })
          .catch(err => {
            reject(err.response.data.err.message)
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
            const error = err.response.data.err.message
            reject(error)
          })
      })
    },
    deleteUser (context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_SERVICE_API}/users/${id}`)
          .then(() => {
            Swal.fire(
              'Delete Success!!',
              '',
              'success'
            )
            context.dispatch('getAllUsers')
              .then(res => {
                resolve(res)
              })
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateProfileId (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/users/updatereceiver`, payload)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    addTransaction (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/transaction`, payload)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    deleteTransaction (context, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_SERVICE_API}/transaction/${id}`)
          .then(() => {
            Swal.fire(
              'Delete Sucess!',
              '',
              'success'
            )
            context.dispatch('getDataTransactionSender')
              .then(res => {
                resolve(res)
              })
          })
          .catch(err => {
            console.log(err)
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
            console.log(err.response.data.err)
            reject(err)
          })
      })
    },
    logout (context) {
      localStorage.clear()
      context.commit('REMOVE_TOKEN')
      Swal.fire(
        'Logout Sucess!',
        'See you again!',
        'success'
      )
      router.push({ name: 'Auth' })
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
    forgotPassword (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/auth/forgot-password`, payload)
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
    getAllUsers (state) {
      return state.allUsers
    },
    getUser (state) {
      return state.dataUser
    },
    isLogin (state) {
      return state.token !== null
    },
    getTransactionSender (state) {
      return state.getTransactionSender
    },
    listUsers (state) {
      return state.listUsers
    },
    userId (state) {
      return state.getUserId
    },
    getPagination (state) {
      return state.pagination
    },
    paginatonUsers (state) {
      return state.paginationUser
    },
    paginationAllUsers (state) {
      return state.paginationAllUsers
    },
    getPaginationIncome (state) {
      console.log('ini apa', state.paginationIncome)
      return state.paginationIncome
    },
    getDataIncome (state) {
      return state.dataIncome
    }
  },
  modules: {
  }
})
