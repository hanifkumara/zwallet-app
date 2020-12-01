import Vue from 'vue'
import VueRouter from 'vue-router'
import Learn from '../views/Learn.vue'
import Auth from '../views/auth/Auth.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'
import Addpin from '../views/auth/Addpin.vue'
import Main from '../views/main/Main.vue'
import Transaction from '../views/main/Transaction.vue'
import Home from '../views/main/Home.vue'
import Profile from '../views/main/Profile.vue'
import Receiver from '../views/main/Receiver.vue'
import Personal from '../views/main/Personal.vue'
import ManagePhone from '../views/main/ManagePhone.vue'
import AllTransaction from '../views/main/AllTransaction.vue'
import Detail from '../views/main/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    component: 404
    },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/',
    name: 'Auth',
    redirect: 'login',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: 'addpin',
        name: 'Addpin',
        component: Addpin
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: 'main/home',
    children: [
      {
        path: 'transaction',
        name: 'Transaction',
        component: Transaction
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'receiver',
        name: 'Receiver',
        component: Receiver
      },
      {
        path: 'alltransaction/:idUser/history',
        name: 'AllTransaction',
        component: AllTransaction
      },
      {
        path: 'personal/:idUser',
        name: 'Personal',
        component: Personal
      },
      {
        path: 'manage/:idUser/phone',
        name: 'ManagePhone',
        component: ManagePhone
      },
      {
        path: 'detail/:idUser/transfer',
        name: 'Detail',
        component: Detail
      }
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
