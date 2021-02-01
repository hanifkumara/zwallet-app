import Vue from 'vue'
import VueRouter from 'vue-router'
import Learn from '../views/Learn.vue'
import Confirmation from '../views/auth/Confirmation.vue'
import Auth from '../views/auth/Auth.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'
import ForgotPassword from '../views/auth/ForgotPassword.vue'
import CreatePassword from '../views/auth/CreatePassword.vue'
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
import Balance from '../views/main/Balance.vue'
import ListUsers from '../views/main/ListUsers.vue'
import AddPHone from '../views/main/AddPhone.vue'
import Admin from '../views/main/Admin.vue'
import Pin from '../views/main/Pin.vue'
import DetailTransaction from '../views/main/DetailTransaction.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: 404,
    redirect: '/auth/login'
  },
  {
    path: '/learn',
    name: 'Learn',
    component: Learn
  },
  {
    path: '/confirmation/:token',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { requiresVisitor: true }
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresVisitor: true }
      },
      {
        path: 'addpin',
        name: 'Addpin',
        component: Addpin
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
      },
      {
        path: 'create-password/:token',
        name: 'CreatePassword',
        component: CreatePassword
      }
    ]
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    redirect: 'main/home',
    meta: { requiresAuth: true },
    children: [
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
        path: 'alltransaction',
        name: 'AllTransaction',
        component: AllTransaction
      },
      {
        path: 'personal',
        name: 'Personal',
        component: Personal
      },
      {
        path: 'manage',
        name: 'ManagePhone',
        component: ManagePhone
      },
      {
        path: 'detail',
        name: 'Detail',
        component: Detail
      },
      {
        path: 'balance',
        name: 'Balance',
        component: Balance
      },
      {
        path: 'listusers',
        name: 'ListUsers',
        component: ListUsers
      },
      {
        path: 'admin',
        name: 'Admin',
        component: Admin
      },
      {
        path: 'pin',
        name: 'Pin',
        component: Pin
      },
      {
        path: '/detail-transaction',
        name: 'DetailTransaction',
        component: DetailTransaction
      },
      {
        path: 'addphone/:phone',
        name: 'AddPhone',
        component: AddPHone
      },
      {
        path: 'transaction/:idreceiver',
        name: 'Transaction',
        component: Transaction
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/main/home'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
