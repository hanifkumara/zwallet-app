<template>
  <div class="content">
    <div class="menu-dropdown">
      <b-dropdown id="dropdown-1" :text="text" class="m-md-2">
        <b-dropdown-item @click="handleContentTransfer">My Transfer</b-dropdown-item>
        <b-dropdown-item @click="handleContentIncome">My Income</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="container-transfer" v-show="contentTransfer">
      <div class="wrapper-transfer" v-if="getTransactionSender.length > 0">
        <div class="d-flex justify-content-between">
        <h2>History Transfer</h2>
        </div>
        <div class="input-search">
          <div class="icon-seacrh">
            <img src="@/assets/img/search-bar/search.png" alt="icon-search">
          </div>
          <input type="text" placeholder="Search receiver here" v-model="inputSearch">
        </div>
        <div class="sort">
          <div class="badge badge-warning mr-1" @click="handleSearchReceiver(null, 'ASC')">Longest</div>
          <div class="badge badge-primary" @click="handleSearchReceiver(null, 'DESC')">Latest</div>
        </div>
        <div class="card-container">
          <div class="card-content">
            <div class="card-receiver" v-for="data in getTransactionSender" :key="data.id" @click="detailTransaction(data.id)">
              <div class="d-flex">
                <div class="photo-receiver">
                  <img :src="data.receiverPhoto" alt="photo-receiver" @error="imgPlaceholder">
                </div>
                <div class="name-phone">
                  <h6>{{data.receiver}}</h6>
                  <p v-if="!data.receiver">{{data.receiverUsername}}</p>
                  <p>{{data.phoneReceiver}}</p>
                </div>
              </div>
              <div class="right-card">
                <div class="data-receiver d-flex">
                  <p class="text-danger amount mr-2">
                    -Rp. {{ data.amountTransfer | numFormat }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <nav aria-label="...">
            <div v-if="getPagination.totalPage < 2"></div>
            <ul class="pagination" v-else>
              <li class="page-item" :class="[getPagination.currentPage == 1 ? 'disabled' : '']">
                <a class="page-link" @click.prevent="handleSearchReceiver(parseInt(getPagination.currentPage) - 1), null" href="#" tabindex="-1" aria-disabled="true">Previous</a>
              </li>
              <li v-for="noPage in getPagination.totalPage" class="page-item" :class="[noPage == getPagination.currentPage ? 'active' : '']" :key="noPage"><a class="page-link" @click.prevent="handleSearchReceiver(noPage, null)" href="#">{{noPage}}</a></li>
              <li class="page-item"  :class="[getPagination.currentPage == getPagination.totalPage ? 'disabled' : '']">
                <a class="page-link" @click.prevent="handleSearchReceiver(parseInt(getPagination.currentPage) + 1), null" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="transfer-empty" v-else>
        <h2>You've never made a transfer<br> Please go to transfer menu.</h2>
      </div>
    </div>
    <div class="container-transfer" v-show="contentIncome">
      <div class="wrapper-income" v-if="getDataIncome.length > 0">
        <div class="d-flex justify-content-between">
          <h2>History Income</h2>
        </div>
        <div class="input-search">
          <div class="icon-seacrh">
            <img src="@/assets/img/search-bar/search.png" alt="icon-search">
          </div>
          <input type="text" placeholder="Search sender here" v-model="inputSearchSender">
        </div>
        <div class="sort">
          <!-- <div class="badge badge-warning mr-1" @click="handleSearchReceiver(null, 'ASC')">Longest</div>
          <div class="badge badge-primary" @click="handleSearchReceiver(null, 'DESC')">Latest</div> -->
        </div>
        <div class="card-container">
          <div class="card-content">
            <div class="card-receiver" v-for="data in getDataIncome" :key="data.id" @click="detailTransactionIncome(data.id)">
              <div class="d-flex">
                <div class="photo-receiver">
                  <img :src="data.senderPhoto" alt="photo-receiver" @error="imgPlaceholder">
                </div>
                <div class="name-phone">
                  <h6>{{data.sender}}</h6>
                  <p>{{data.phoneSender}}</p>
                </div>
              </div>
              <div class="right-card">
                <div class="data-receiver d-flex">
                  <p class="text-success amount mr-2">
                    +Rp. {{ data.amountTransfer | numFormat }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <nav aria-label="...">
            <div v-if="getPaginationIncome.totalPage < 2"></div>
            <ul class="pagination" v-else>
              <li class="page-item" :class="[getPaginationIncome.currentPage == 1 ? 'disabled' : '']">
                <a class="page-link" @click.prevent="handleSearchSender(parseInt(getPaginationIncome.currentPage) - 1), null" href="#" tabindex="-1" aria-disabled="true">Previous</a>
              </li>
              <li v-for="noPage in getPaginationIncome.totalPage" class="page-item" :class="[noPage == getPaginationIncome.currentPage ? 'active' : '']" :key="noPage"><a class="page-link" @click.prevent="handleSearchSender(noPage, null)" href="#">{{noPage}}</a></li>
              <li class="page-item"  :class="[getPaginationIncome.currentPage == getPaginationIncome.totalPage ? 'disabled' : '']">
                <a class="page-link" @click.prevent="handleSearchSender(parseInt(getPaginationIncome.currentPage) + 1), null" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="transfer-empty" v-else>
        <h2>No one has transferred to your account</h2>
      </div>
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
      inputSearch: '',
      inputSearchSender: '',
      contentTransfer: true,
      contentIncome: false,
      text: 'My Transfer'
    }
  },
  mounted () {
    const payload = {
      page: 1,
      name: ''
    }
    this.getDataIncomes(payload)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
    // this.handleSearchReceiver()
    // this.handleSearchSender()
  },
  methods: {
    ...mapActions(['getDataTransactionSender', 'getDataIncomes', 'deleteTransaction', 'setDetailTransaction', 'getDataUserId']),
    coba (index) {
      console.log(index)
      const result = this.$refs.destroyCard[index]
      const result2 = this.$refs.destroyCard
      console.log(result)
      console.log(result2)
    },
    handleContentTransfer () {
      this.getDataTransactionSender()
      this.text = 'My Transfer'
      this.contentTransfer = !this.contentTransfer
      this.contentIncome = !this.contentIncome
    },
    handleContentIncome () {
      const payload = {
        page: 1,
        name: ''
      }
      this.getDataIncomes(payload)
      this.text = 'My Income'
      this.contentTransfer = !this.contentTransfer
      this.contentIncome = !this.contentIncome
    },
    handleSearchReceiver (pagination, handleSort) {
      console.log(this.sort)
      const payload = {
        pagination: pagination || 1,
        name: this.inputSearch,
        sort: handleSort || 'DESC'
      }
      this.getDataTransactionSender(payload)
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
            .then((result) => {
              this.transactionSender()
              console.log('ini result dataincome', result)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSearchSender (pagination) {
      console.log(this.sort)
      const payload = {
        page: pagination || 1,
        name: this.inputSearchSender
      }
      this.getDataIncomes(payload)
    },
    imgPlaceholder (e) {
      e.target.src = 'https://via.placeholder.com/300'
    },
    detailTransaction (id) {
      this.setDetailTransaction(id)
        .then(res => {
          this.getDataUserId(this.getDetailTransaction.userReceiverId)
            .then((result) => {
              console.og(result)
            })
            .catch((err) => {
              console.log(err)
            })
          console.log(res)
          this.$router.push({ name: 'Detail', params: { id } })
        })
        .catch(err => {
          console.log(err)
        })
    },
    detailTransactionIncome (id) {
      this.setDetailTransaction(id)
        .then(res => {
          this.getDataUserId(this.getDetailTransaction.userSenderId)
            .then((result) => {
              console.og(result)
            })
            .catch((err) => {
              console.log(err)
            })
          console.log(res)
          this.$router.push({ name: 'Detail', params: { id } })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    inputSearch: function () {
      this.handleSearchReceiver()
    },
    inputSearchSender: function () {
      this.handleSearchSender()
    }
  },
  computed: {
    ...mapGetters(['getPagination', 'getTransactionSender', 'getDataIncome', 'getPaginationIncome', 'getDetailTransaction'])
  }
}
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
.sort{
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
  margin-bottom: 10px;
}
.badge {
  cursor: pointer;
}
.badge:hover{
  transform: scale(1.05);
}
.input-search {
  margin-top: 30px;
  margin-bottom: 10px;
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
.card-receiver:hover{
  transform: scale(1.02);
}
.card-receiver{
  width: 100%;
  cursor: pointer;
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
.menu-dropdown{
  margin-left: -10px;
}
.transfer-empty{
  width: 100%;
  height: 455px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(179, 172, 172);
}
@media screen and (max-width: 360px) {
  /* .card-container{
    overflow-x: hidden;
  } */
}
</style>
