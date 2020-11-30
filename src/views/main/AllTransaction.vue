<template>
  <div class="content">
    <div class="d-flex justify-content-between">
      <h5>Search Receiver</h5>
      <div class="sorting">
        <button class="badge badge-primary" @click="longest">Longest</button>
        <button class="badge  badge-primary" @click="latest">Latest</button>
      </div>
    </div>
    <div class="input-search">
      <div class="icon-seacrh">
        <img src="@/assets/img/search-bar/search.png" alt="icon-search">
      </div>
      <input type="text" placeholder="Search receiver here" v-model="inputText">
    </div>
    <div class="card-container">
      <div class="card-receiver" v-for="data in filteredTransaction" :key="data.id">
        <div class="d-flex">
          <div class="photo-receiver">
            <img :src="data.receiverPhoto" alt="photo-receiver">
          </div>
          <div class="name-phone">
            <h6>{{data.receiver}}</h6>
            <p>+{{data.phoneReceiver}}</p>
          </div>
        </div>
        <div class="right-card">
          <div class="delete">
            <button class="badge badge-danger" ref="deleteCard" @click="deleteTransaction(data.id)">Hapus</button>
          </div>
          <div class="data-receiver">
            {{data.createdAt}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AllTransaction',
  data: function () {
    return {
      idSender: this.$route.params.idUser,
      dataReceiver: [],
      inputText: ''
    }
  },
  computed: {
    filteredTransaction () {
      const result = new RegExp(this.inputText, 'i')
      return this.dataReceiver.filter(value => value.receiver.match(result))
    }
  },
  mounted () {
    this.getDataTransaction()
  },
  methods: {
    async getDataTransaction () {
      const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/${this.idSender}`)
      const resData = result.data.result
      this.dataReceiver = resData
      console.log(this.dataReceiver[0].id)
    },
    async deleteTransaction (id) {
      const confirm = window.confirm('Are you sure??')
      if (confirm === true) {
        await axios.delete(`${process.env.VUE_APP_SERVICE_API}/transaction/${id}`)
      } else {
        console.log('Not Delete')
      }
    },
    longest () {
      this.dataReceiver.sort((a, b) => a.id > b.id ? 1 : -1)
    },
    latest () {
      this.dataReceiver.sort((a, b) => a.id < b.id ? 1 : -1)
    }
  }
}
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
.input-search {
  margin: 30px 0;
  width: 100%;
  display: flex;
  position: relative;
}
.input-search>input {
  width: 100%;
  padding: 10px 40px;
  border: none;
  background: rgba(58, 61, 66, 0.1);
  border-radius: 12px;
  margin-left: -30px;
}
.input-search>input:focus {
  outline: none;
}
.icon-search{
  width: 40px;
  height: 40px;
}
.icon-seacrh>img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.card-receiver{
  width: 100%;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
}
.photo-receiver{
  height: 60px;
  width: 60px;
  border-radius: 10px;
}
.photo-receiver>img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.name-phone{
  margin-left: 20px;
}
.name-phone > p {
  margin: 0;
  color: black !important;
  font-size: 14px;
}.name-phone> h6{
  color: black !important;
}
.data-receiver{
  color: black !important;
}
.card-container{
  height: 372px;
  overflow: auto;
}
.sorting > button.badge {
  border: none;
  margin-right: 10px;
}
button.badge:hover {
  transform: scale(1.1);
}
button.badge:focus {
  outline: none;
}
button.badge-danger{
  border: none;
}
.delete{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 360px) {
  /* .card-container{
    overflow-x: hidden;
  } */
}
</style>
