<template>
  <div>
    <div class="balance">
      <div class="balance-left">
        <p>Balance</p>
        <h3 style="color: white; margin: 10px 0">Rp.{{user.balance}}</h3>
        <p>+{{user.phone}}</p>
      </div>
      <div class="balance-right">
        <router-link :to="{name: 'Transaction'}" class="balance-transfer">
          <div class="icon-balance">
            <img src="@/assets/img/arrow-up.png" alt="icon">
          </div>
          <p>Transfer</p>
        </router-link>
        <div class="balance-topup">
          <div class="icon-balance">
            <img src="@/assets/img/plus.png" alt="icon">
          </div>
          <p>Topup</p>
        </div>
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
          <h6>Transaction History</h6>
          <router-link :to="{name: 'AllTransaction', params: {idUser: idSender}}">See all</router-link>
        </div>
        <div class="contact-card"  v-for="data in receiver" :key="data.id">
          <div class="card-left">
            <div class="photo">
              <img :src="data.receiverPhoto" alt="photo-profile">
            </div>
            <div class="profile">
              <h6>{{data.receiver}}</h6>
              <p>Transfer</p>
            </div>
          </div>
          <p class="amount">
            {{data.amountTransfer}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data: function () {
    return {
      idSender: 3,
      receiver: [],
      user: []
    }
  },
  mounted () {
    this.getTransactionBySender()
    this.getUser()
  },
  methods: {
    async getTransactionBySender () {
      const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/${this.idSender}`)
      const resData = result.data.result
      this.receiver = resData.slice(0, 4)
      console.log(this.idReceiver)
      console.log(resData)
    },
    async getUser () {
      try {
        const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${this.idSender}`)
        const resData = result.data.result
        this.user = resData[0]
        console.log(this.user)
      } catch (error) {
        console.log(error.message)
      }
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
