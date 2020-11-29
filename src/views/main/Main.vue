<template>
<div>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-md-12 wrapper-nav">
          <h3>Zwallet</h3>
          <div class="profile-nav">
            <div class="icon-profile">
              <img :src='photo' alt="photo">
            </div>
            <div class="name-phone">
              <h5>{{name}}</h5>
              <p class="text-small">+{{phone}}</p>
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
            <router-link :to="{name: 'Home'}">
              <div class="icon">
                <img src="../../../src/assets/img/icon/grid.png" alt="icon-dashbord">
                <h6>Dashboard</h6>
              </div>
            </router-link>
            <router-link :to="{name: 'Transaction'}">
              <div class="icon">
                <img src="../../../src/assets/img/icon/arrow-up.png" alt="icon-transfer">
                <h6>Transfer</h6>
              </div>
            </router-link>
            <div class="icon">
              <img src="../../../src/assets/img/icon/plus.png" alt="icon-topup">
              <h6>TopUp</h6>
            </div>
            <router-link :to="{name: 'Profile'}">
              <div class="icon">
                <img src="../../../src/assets/img/icon/user.png" alt="icon-user">
                <h6>Profile</h6>
              </div>
            </router-link>
            <div class="icon-logout">
              <img src="../../../src/assets/img/icon/log-out.png" alt="icon-logout">
              <h6>Logout</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <router-view v-on:fire-event="addTransaction" v-on:save-data="saveData" v-on:update-data="updateData"/>
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
import axios from 'axios'
export default {
  name: 'Main',
  data: function () {
    return {
      name: '',
      phone: '',
      photo: '',
      idUser: 3
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      try {
        const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${this.idUser}`)
        const resUser = result.data.result[0]
        this.name = resUser.name
        this.phone = resUser.phone
        this.photo = resUser.photo
      } catch (e) {
        console.log(e.message)
      }
    },
    async addTransaction (data) {
      try {
        const detailTransaction = this.$store.state.data[0].value
        const dataTransaction = {
          amountTransfer: detailTransaction.amount,
          notes: detailTransaction.notes,
          userSenderId: detailTransaction.userSenderId,
          userReceiverId: detailTransaction.userReceiverId
        }
        await axios.post(`${process.env.VUE_APP_SERVICE_API}/transaction`, dataTransaction)
        alert('Transaction Success')
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.log(error.message)
      }
    },
    async updateData (data) {
      try {
        const dataUpdate = {
          phone: data.phone
        }
        await axios.patch(`${process.env.VUE_APP_SERVICE_API}/users/${data.idUser}`, dataUpdate)
        alert('Update Sucess')
        this.$router.go(-1)
      } catch (error) {
        console.log(error.message)
      }
    },
    saveData (value) {
      this.$store.state.data.push({ value })
    }
  }
}
</script>

<style >
/* Nav */
#app {
  background-color: #f6f9ff;
  height: 100%;
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
.profile-nav{
  display: flex;
  height: 80px;
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
  margin-top: 320px;
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
@media screen and (max-width: 980px) {
  .content{
    margin-top: 20px;
  }
  .dashboard {
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
