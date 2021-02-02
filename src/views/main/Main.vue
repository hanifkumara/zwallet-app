<template>
<div>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-md-12 wrapper-nav">
          <router-link :to="{name: 'Home'}">
            <h3>Zwallet</h3>
          </router-link>
            <div class="profile-nav">
              <router-link :to="{name: 'Profile'}">
                <div class="icon-profile">
                <img :src='getUser.photo' alt="photo" @error="imgPlaceholder">
              </div>
              </router-link>
              <div class="name-phone">
                <h5 v-if="!getUser.name">Hii, {{getUser.username}}</h5>
                <h5 v-else>{{getUser.name}}</h5>
                <router-link :to="{name: 'Admin'}" v-if="getUser.roleId == '1'" class="admin">
                  <p class="role-admin">Admin</p>
                </router-link>
                <p v-if="getUser.roleId == '2'" class="text-small">{{getUser.phone}}</p>
              </div>
            <div class="icon-bell">
              <img src="../../../src/assets/img/icon/bell.png" alt="bell">
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <div class="container">
      <div class="row mt-3">
        <div class="col-lg-3">
          <div class="dashboard">
            <div class="icon" @click="toHome">
              <img src="../../../src/assets/img/icon/grid.png" alt="icon-dashbord">
              <h6 >Dashboard</h6>
            </div>
            <router-link :to="{name: 'ListUsers'}">
              <div class="icon">
                <img src="../../../src/assets/img/icon/arrow-up.png" alt="icon-transfer">
                <h6>Transfer</h6>
              </div>
            </router-link>
            <router-link :to="{name: 'Balance'}">
              <div class="icon">
                <img src="../../../src/assets/img/icon/plus.png" alt="icon-topup">
                <h6>TopUp</h6>
              </div>
            </router-link>
            <router-link :to="{name: 'Profile'}">
              <div class="icon">
                <img src="../../../src/assets/img/icon/user.png" alt="icon-user">
                <h6>Profile</h6>
              </div>
            </router-link>
            <div class="icon-logout" @click.prevent="logout">
              <img src="../../../src/assets/img/icon/log-out.png" alt="icon-logout">
              <h6>Logout</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <router-view v-on:update-profile="hanldeUpdate" v-on:delete-transaction="handleDelete" v-on:add-transaction="insertTransaction" v-on:search-transaction="handleSearch" :get-data="getUser" :user-id="userId" :data-transaction="dataTransactionSender"/>
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="footer">
            <p class="copyright">2020 Zwallet. All right reserved. </p>
            <div class="right-footer">
              <p class="footer-phone">+62 5637 8882 9901</p>
              <p>contact@zwallet.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Main',
  data () {
    return {
      dataTransactionSender: []
    }
  },
  mounted () {
    this.getDataUser()
    this.getListUsers()
    this.getAllUsers()
    this.transactionSender()
  },
  methods: {
    ...mapActions(['getDataUser', 'getAllUsers', 'updateProfile', 'getListUsers', 'addTransaction', 'deleteTransaction', 'searchTransaction', 'getDataTransactionSender', 'getDataIncomes', 'logout']),
    transactionSender () {
      const payload = {
        pagination: 1,
        name: '',
        sort: 'DESC'
      }
      this.getDataTransactionSender(payload)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          this.error = err
          console.log(err)
        })
    },
    insertTransaction (payload) {
      console.log(payload)
      this.addTransaction(payload)
        .then(res => {
          let name = this.userId.name
          if (!name) {
            name = this.userId.username
          }
          Swal.fire(
            `Transaction to ${name}`,
            'See you again!',
            'success'
          )
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleDelete (payload) {
      console.log('hallo', payload)
      this.deleteTransaction(payload)
        .then(res => {
          console.log(res)
          const payload = {
            page: 1,
            name: ''
          }
          this.getDataIncomes(payload)
          this.transactionSender()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSearch (payload) {
      this.searchTransaction(payload)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleLogout () {
      this.getDataUser()
        .then(() => {
          localStorage.clear()
          Swal.fire(
            'Logout Success',
            'See you again!',
            'success'
          )
          this.$router.go(-1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    hanldeUpdate (payload) {
      this.updateProfile(payload)
        .then(res => {
          Swal.fire(
            'Fill balance success',
            '',
            'success'
          )
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    imgPlaceholder (e) {
      e.target.src = 'https://via.placeholder.com/300'
    },
    toHome () {
      this.transactionSender()
      this.$router.push({ name: 'Home' })
    }
  },
  computed: {
    ...mapGetters(['getUser', 'userId', 'getTransactionSender'])
  }
}
</script>

<style >
/* Nav */
#app {
  background-color: #f6f9ff;
  height: 100%;
}
a:hover{
  text-decoration: none;
}
nav {
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.wrapper-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  color: #6379F4;
}
.role-admin{
  margin: 0;
}
.profile-nav{
  display: flex;
  height: 80px;
}
.profile-nav>a{
  display: flex;
  align-items:center;
}
.icon-profile{
  align-self: center;
  margin-right: 20px;
  width: 50px;
  height: 50px;
}
.icon-profile>img{
  object-fit: contain;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
p.text-small {
  margin: 0;
  font-size: 14px;
}
.name-phone{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.name-phone > h5{
  margin: 0;
}
.icon-bell{
  align-self: center;
  width: 21px;
  height: 21px;
  margin: 0 30px;
}
.icon-bell>img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
/* End Nav */

/* main */
.dashboard {
  width: 100%;
  padding: 30px 25px;
  height: 570px;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
}
.icon-logout>h6,.icon >h6{
  font-weight: 400;
  margin-left: 20px;
  cursor: pointer;
}
.icon-logout>img,.icon>img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.icon, .icon-logout{
  width: 20px;
  height: 20px;
  margin-bottom: 30px;
  display: flex;
}
.icon-logout{
  margin-top: 320px
}
.icon h6{
  color: black !important;
}
.dashboard>a:hover{
  text-decoration: none;
}
/* End main */
.content{
  padding: 30px 25px;
  width: 100%;
  height: fit-content;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
}
/* Footer */
footer{
  background: #6379F4;
  width: 100%;
  height: fit-content;
  margin-top: 28px;
}
.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}
.footer p {
  margin: 0;
  color: white;
  font-size: 14px;
}
.right-footer{
  display: flex;
}
.footer-phone{
  padding-right: 30px;
}
/* End Footer */

/* Responsive */
@media screen and (max-width: 991px) {
  .content{
    margin-top: 20px;
  }
  .dashboard {
    position: relative;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    height: 40px;
  }
  .icon-logout>h6,.icon >h6{
    display: none;
  }
  .icon, .icon-logout{
    width: 20px;
    height: 20px;
  }
  .icon-logout{
    margin-top: 0;
    margin-bottom: 0;
  }
}
@media screen and (max-width: 780px) {
  .footer-phone{
    padding-right: 10px;
  }
}
@media screen and (max-width: 540px) {
  .icon-profile{
    margin-right: 10px;
  }
  .name-phone h5{
    font-size: 15px;
    margin: 0;
  }
  p.text-small {
    font-size: 12px;
  }
  .icon-bell{
    margin: 0 10px;
  }
  .footer p {
    margin: 0;
    color: white;
    font-size: 12px;
  }
  .content{
    padding: 14px 22px;
  }
}
@media screen and (max-width: 470px) {
  .footer{
    flex-direction: column;
  }
  .copyright{
    order: 2;
    padding-top: 10px;
  }
  .right-footer{
    order: 1;
  }
}
</style>
