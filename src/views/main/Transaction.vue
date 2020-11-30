<template>
  <div class="content">
    <h5 class="title">Transfer Money</h5>
    <div class="receiver">
      <div class="icon-profile">
        <img :src="dataReceiver.photo" alt="">
      </div>
      <div class="name-phone">
        <p class="name">{{dataReceiver.name}}</p>
        <p class="phone">+{{dataReceiver.phone}}</p>
      </div>
    </div>
    <div class="type-amount">Type the amount you want to transfer and then press continue to the next steps</div>
    <div class="input-amount">
      <input type="text" name="amount" placeholder="0.00" v-model="data.amount" autocomplete="off">
      <h6>Rp. {{dataSender.balance}} Available</h6>
      <div class="add-notes">
        <input type="text" name="notes" placeholder="add some notes" v-model="data.notes" autocomplete="off">
      </div>
      <router-link :to="{name: 'Confirmation', params: {id: data.userReceiverId}}">
        <button class="btn" @click="$emit('save-data', data)" >Continue</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Transaction',
  data: function () {
    return {
      dataReceiver: [],
      dataSender: [],
      data: {
        amount: '',
        notes: '',
        userSenderId: 3,
        userReceiverId: 7,
        date: ''
      }
    }
  },
  mounted () {
    this.getDate()
    this.getUser()
    this.getDataSender()
  },
  methods: {
    getDate () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.data.date = dateTime
    },
    async getUser () {
      const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${this.data.userReceiverId}`)
      const resData = result.data.result[0]
      this.dataReceiver = resData
    },
    async getDataSender () {
      try {
        const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${this.data.userSenderId}`)
        const resData = result.data.result
        this.dataSender = resData[0]
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped>
.receiver{
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 25px;
  margin: 30px 0;
}
.icon-profile{
  width: 70px;
  height:70px;
  margin-right:20px;
}
.icon-profile>img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.name-phone>p{
  margin: 0;
}
.name-phone>.name{
  font-size: 18px;
  font-weight: 600;
}
.type-amount,.name-phone>.phone{
  font-size: 14px;
  font-weight: 400;
  color: #7A7886;

}
.type-amount{
  width: 47%;
}
.input-amount{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 275px;
}
.input-amount>a {
  align-self: flex-end;
}
a>button{
  margin-top: 20px;
  padding: 10px 35px;
  background: #6379F4;
  color: white;
}
.input-amount input:focus{
  outline: none;
}
.input-amount > [name="amount"] {
  height: 60px;
  font-size: 40px;
  border: none;
  text-align: center;
  margin: 20px 0;
  width: 100%;
}
.add-notes{
  position: relative;
}
.add-notes > input{
  border: 0;
  border-bottom: 1.5px solid rgba(169, 169, 169, 0.6);
  margin-top: 10px;
}

@media screen and (max-width: 767px) {
  .type-amount{
    width: 90%;
  }
  a>button{
    margin-top: 30px;
    padding: 4px 15px;
  }
  .title{
    margin-top: 20px;
  }
}
</style>
