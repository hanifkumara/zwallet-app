<template>
  <div class="content">
    <h5 class="title">Transfer Money</h5>
    <div class="receiver">
      <div class="icon-profile">
        <img :src="userId.photo" alt="photo" @error="imgPlaceholder">
      </div>
      <div class="name-phone">
        <p class="name" v-if="userId.name">{{userId.name}}</p>
        <p class="name" v-else>{{userId.username}}</p>
        <p class="phone">{{userId.phone}}</p>
      </div>
    </div>
    <div class="type-amount">Type the amount you want to transfer and then press continue to the next steps</div>
    <div class="input-amount">
      <input type="text" name="amount" v-model="dataTransaction.amountTransfer" placeholder="0.00" autocomplete="off">
      <h6>Rp. {{ getUser.balance | numFormat }} Available</h6>
      <div class="add-notes">
        <input type="text" name="notes" v-model="dataTransaction.notes" placeholder="add some notes" autocomplete="off">
      </div>
    </div>
    <div class="button">
      <h6 v-b-modal.modal-1 class="confirm" @click="toDetailTransaction(dataTransaction, dataTransaction.amountTransfer)">Confirm</h6>
        <b-modal id="modal-1" title="BootstrapVue" ok-only>
              <div slot="modal-header">
                <input class="my-4" type="text" v-model="pin" placeholder="input your PIN">
              </div>
              <button slot="modal-footer" type="submit" @click="insertTransaction(dataTransaction, dataTransaction.amountTransfer)">confirm</button>
          </b-modal>
    </div>
    <!-- <div class="button">
      <button id="show-modal" @click="showModal = true">Confirm</button>
          <Modal :user-id="userId" :my-profile="getUser" :data-transaction="dataTransaction" v-on:add-transaction="insertTransaction" v-if="showModal" @close="showModal = false" />
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Transaction',
  data: function () {
    return {
      idReceiver: this.$route.params.idreceiver,
      dataTransaction: {
        amountTransfer: '',
        notes: '',
        userReceiverId: this.$route.params.idreceiver
      },
      pin: null,
      showModal: false
    }
  },
  mounted () {
    this.getDataId()
    this.getDataUser()
  },
  props: ['get-data', 'user-id'],
  methods: {
    ...mapActions(['getDataUserId', 'addTransaction', 'getDataUser', 'updateProfile', 'updateProfileId']),
    getDataId () {
      this.getDataUserId(this.idReceiver)
    },
    toDetailTransaction (payload, amount) {
      this.$router.push({ name: 'DetailTransaction', query: { userId: this.userId.id, userBalance: this.userId.balance, name: this.userId.name, userName: this.userId.username, notes: payload.notes, amount } })
    },
    imgPlaceholder (e) {
      e.target.src = 'https://via.placeholder.com/300'
    }
  },
  computed: {
    ...mapGetters(['getUser'])
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
  height: 228px;
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
button:focus{
  outline: none;
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
.button {
  display: flex;
  justify-content: flex-end;
}
input:focus {
  outline: none
}
.button > .confirm {
  background: #6379F4;
  color: white;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  padding: 10px 60px;
  border: none;
}
.button > .confirm {
  outline: none
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
