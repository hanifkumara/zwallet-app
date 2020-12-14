<template>
  <div class="content">
    <div class="d-flex justify-content-between">
      <h5>Search Receiver</h5>
    </div>
    <div class="input-search">
      <div class="icon-seacrh">
        <img src="@/assets/img/search-bar/search.png" alt="icon-search">
      </div>
      <input type="text" placeholder="Search receiver here" v-model="inputSearch">
    </div>
    <div class="card-container">
      <div class="card-content">
        <div class="card-receiver" v-for="data in getTransactionSender" :key="data.id">
          <div class="d-flex">
            <div class="photo-receiver">
              <img :src="data.receiverPhoto" alt="photo-receiver">
            </div>
            <div class="name-phone">
              <h6>{{data.receiver}}</h6>
              <p>{{data.phoneReceiver}}</p>
            </div>
          </div>
          <div class="right-card">
            <div class="delete">
              <button class="badge badge-danger" @click.prevent="$emit('delete-transaction', data.id)">Hapus</button>
            </div>
            <div class="data-receiver">
              {{data.createdAt}}
            </div>
          </div>
        </div>
      </div>
      {{getPagination}}
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item" :class="[getPagination.currentPage == 1 ? 'disabled' : '']">
            <a class="page-link" @click.prevent="handleSearchSender(parseInt(getPagination.currentPage) - 1)" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li v-for="noPage in getPagination.totalPage" class="page-item" :class="[noPage == getPagination.currentPage ? 'active' : '']" :key="noPage"><a class="page-link" @click.prevent="handleSearchSender(noPage)" href="#">{{noPage}}</a></li>
          <li class="page-item"  :class="[getPagination.currentPage == getPagination.totalPage ? 'disabled' : '']">
            <a class="page-link" @click.prevent="handleSearchSender(parseInt(getPagination.currentPage) + 1)" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios'
// import Swal from 'sweetalert2'

export default {
  name: 'AllTransaction',
  data: function () {
    return {
      inputText: '',
      inputSearch: ''
    }
  },
  mounted () {
    this.handleSearchSender()
  },
  methods: {
    ...mapActions(['getDataTransactionSender']),
    handleSearchSender (pagination) {
      const payload = {
        pagination: pagination,
        name: this.inputSearch
      }
      this.getDataTransactionSender(payload)
    }
  },
  watch: {
    inputSearch: function (val) {
      this.handleSearchSender()
    }
  },
  computed: {
    ...mapGetters(['getPagination', 'getTransactionSender'])
  }
  // methods: {
  //   async getDataTransaction () {
  //     try {
  //       const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/idSender?page=${this.currentPages}`)
  //       const resData = result.data.result.transaction
  //       const rows = result.data.result.pagination.totalData
  //       this.dataReceiver = resData
  //       this.rows = rows
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   },
  //   async deleteTransaction (id) {
  //     try {
  //       await axios.delete(`${process.env.VUE_APP_SERVICE_API}/transaction/${id}`)
  //       Swal.fire(
  //         'Delete Sucess!',
  //         'You clicked the button!',
  //         'success'
  //       )
  //       const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/transaction/idSender`)
  //       const resData = result.data.result.transaction
  //       this.dataReceiver = resData
  //       console.log(this.dataReceiver)
  //     } catch (error) {
  //       console.log(error.message)
  //     }
  //   },
  //   longest () {
  //     this.dataReceiver.sort((a, b) => a.id > b.id ? 1 : -1)
  //   },
  //   latest () {
  //     this.dataReceiver.sort((a, b) => a.id < b.id ? 1 : -1)
  //   }
  // },
  // watch: {
  //   currentPages: function (val) {
  //     this.getDataTransaction()
  //   }
  // }
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
.card-content{
  height: 390px;
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
  height: fit-content;
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
