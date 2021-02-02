<template>
  <div>
    <div class="balance">
      <div class="balance-left">
        <p>Balance</p>
        <router-link :to="{name: 'Balance'}">
          <h3 style="color: white; margin: 10px 0">Rp. {{ getUser.balance | numFormat }}</h3>
        </router-link>
        <p>{{getUser.phone}}</p>
      </div>
      <div class="balance-right">
        <router-link v-if="getUser.balance == 0" :to="{name: 'Balance'}" class="balance-transfer">
          <div class="icon-balance">
            <img src="@/assets/img/arrow-up.png" alt="icon">
          </div>
          <p>Transfer</p>
        </router-link>
        <router-link v-if="getUser.balance > 0" :to="{name: 'ListUsers'}" class="balance-transfer">
          <div class="icon-balance">
            <img src="@/assets/img/arrow-up.png" alt="icon">
          </div>
          <p>Transfer</p>
        </router-link>
        <router-link :to="{name: 'Balance'}">
        <div class="balance-topup">
          <div class="icon-balance">
            <img src="@/assets/img/plus.png" alt="icon">
          </div>
          <p>Topup</p>
        </div>
        </router-link>
    </div>
    </div>
    <div class="chart-history">
      <div class="chart-container">
        <div class="arrow">
          <div class="arrow-down">
            <img src="@/assets/img/money/arrow-down.png" alt="arrow-down">
            <p>Income</p>
            <h5>Rp.2.120.000</h5>
          </div>
          <div class="arrow-up">
            <img src="@/assets/img/money/arrow-up.png" alt="arrow-up">
            <p>Expense</p>
            <h5>Rp.1.560.000</h5>
          </div>
        </div>
        <div class="chart-image">
          <img src="@/assets/img/graphic.png" alt="graphic">
        </div>
      </div>
      <div class="history-container">
        <div class="title-history d-flex justify-content-between">
          <h6>Transfer History</h6>
          <router-link :to="{name: 'AllTransaction'}">See all</router-link>
        </div>
        <h2 v-if="error" class="error-transaction">You never have make Transaction</h2>
        <div class="wrapper-contact-card" v-else>
          <div class="contact-card"  v-for="(data, index) in getDataTransaction" :key="index">
            <div class="card-left">
              <div class="wrapper-photo">
                <div class="photo" v-if="data.userReceiverId === idLogin">
                  <img :src="data.senderPhoto" alt="photo-profile" @error="imgPlaceholder">
                </div>
                <div class="photo" v-else>
                  <img :src="data.receiverPhoto" alt="photo-profile" @error="imgPlaceholder">
                </div>
              </div>
              <div class="profile">
                <h6 v-if="data.userReceiverId === idLogin">{{data.sender}}</h6>
                <h6 v-else>{{data.receiver}}</h6>
                <p v-if="data.userReceiverId === idLogin">Income</p>
                <p v-else>Transfer</p>
              </div>
            </div>
            <div class="card-right">
              <p class="text-success amount"  v-if="data.userReceiverId === idLogin">
                +Rp. {{ data.amountTransfer | numFormat }}
              </p>
              <p class="text-danger amount" v-else>
                -Rp. {{ data.amountTransfer | numFormat }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data: function () {
    return {
      error: '',
      idLogin: localStorage.getItem('id')
    }
  },
  mounted () {
    this.getDataUser()
    this.transactionSender()
  },
  methods: {
    ...mapActions(['getDataUser', 'getDataTransactionSender']),
    imgPlaceholder (e) {
      e.target.src = 'https://via.placeholder.com/300'
    },
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
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getTransactionSender']),
    getDataTransaction () {
      return this.getTransactionSender.slice(0, 4)
    }
  }
}
</script>

<style lang="scss" scoped>
.balance {
  width: 100%;
  height: fit-content;
  padding: 25px 30px;
  background: #6379F4;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
}
.balance p{
  color: #E0E0E0;
  margin: 0;
}
.balance-topup>p,.balance-transfer>p{
  align-self: center;
  margin: 0;
}
.balance-right{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.balance-right>a:hover {
  text-decoration: none;
  transform: scale(1.04);
}
.balance-topup, .balance-transfer{
  display: flex;
  justify-content: space-between;
  width: fit-content;
  height: fit-content;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 10px;
}
.balance-left a {
  text-decoration: none;
}
.balance-topup{
  width:100%
}
.icon-balance{
  margin-right: 10px;
}
.chart-history{
  display: flex;
  margin-top:20px;
  justify-content: space-between;
}
.chart-container{
  width: 58%;
  height: fit-content;
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.chart-container p {
  margin: 0;
  font-size: 16px;
}
.chart-container .arrow{
  display: flex;
  justify-content: space-between;
}
.chart-image{
  margin-top: 30px;
  width: 100%;
  height: 257px;
}
.chart-image > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.history-container{
  width: 40%;
  height: 400px;
  padding: 15px 20px;
  background-color: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.contact-card{
  margin-top: 20px;
  display: flex;
  justify-content: space-between
}
.contact-card p {
  margin: 0;
}
.wrapper-photo{
  width: fit-content;
}
.photo{
  margin-right: 10px;
  width: 60px;
  height: 60px;
  background-color: rgb(255, 226, 226);
}
.photo>img{
  object-fit: contain;
  width:100%;
  height: 100%;
}
.card-left{
  display: flex;
  align-items: center;
}
.error-transaction{
  color: grey;
  margin-top: 30%;
  text-align: center;
}
.profile{
  width: 60%;
}
.card-right{
  display: flex;
  justify-content: flex-end;
  width: 40%;
}
.card-righ > .amount {
  width: 20%;
}
@media screen and (max-width: 960px) {
  .balance {
    margin-top: 20px;
  }
@media screen and (max-width: 767px) {
  .balance {
    padding: 10px 15px;
  }
  .chart-history{
    flex-wrap: wrap;
  }
  .chart-container{
    width: 100%;
  }
  .history-container{
    margin-top: 20px;
    width: 100%;
  }
}
}
</style>
