<template>
  <div class="content">
    <h5>Transfer to</h5>
    <div class="receiver">
      <div class="icon-profile">
        <img :src="data.photo" alt="photo-profile">
      </div>
      <div class="name-phone">
        <p class="name">{{data.name}}</p>
        <p class="phone">+{{data.phone}}</p>
      </div>
    </div>
    <h5>Details</h5>
    <div class="receiver detail">
      <p class="phone desc">Amount</p>
      <h5>Rp.{{transaction[0].amount}}</h5>
    </div>
<!-- <div class="receiver detail">
      <p class="phone desc">Balance Left</p>
      <h5>Rp.100.000</h5>
    </div> -->
    <div class="receiver detail">
      <p class="phone desc">Date & Time</p>
      <h5>{{transaction[0].date}}</h5>
    </div>
    <div class="receiver detail">
      <p class="phone desc">Notes</p>
      <h5>{{transaction[0].notes}}</h5>
    </div>
    <div class="button">
    <button class="btn" type="submit" @click="$emit('fire-event', transaction)" >Continue</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Confirmation',
  data: function () {
    return {
      transaction: [],
      idReceiver: this.$route.params.id,
      data: []
    }
  },
  mounted () {
    this.transaction.push(this.$store.state.data[0].value)
    this.getDataReceiver()
  },
  methods: {
    async getDataReceiver () {
      const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${this.idReceiver}`)
      const resData = result.data.result[0]
      this.data = resData
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
  padding: 11px 18px;
  margin-bottom: 20px;
}
.detail{
  flex-direction: column;
  align-items: flex-start;
}
.detail>.desc, .detail>h5{
  margin: 0;
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
.name-phone>.phone{
  font-size: 14px;
}
.button {
  display:flex;
  justify-content: flex-end;
}
button.btn{
  margin-top: 20px;
  padding: 10px 35px;
  background: #6379F4;
  color: white;
}
</style>
