<template>
  <div class="content">
    <h5 class="title">Transfer Money</h5>
    <div class="receiver">
      <div class="icon-profile">
        <img :src="userId.photo" alt="photo">
      </div>
      <div class="name-phone">
        <p class="name">{{userId.name}}</p>
        <p class="phone">{{userId.phone}}</p>
      </div>
    </div>
    <div class="type-amount">Type the amount you want to transfer and then press continue to the next steps</div>
    <div class="input-amount">
      <input type="text" name="amount" v-model="dataTransaction.amountTransfer" placeholder="0.00" autocomplete="off">
      <h6>Rp. {{getData.balance}} Available</h6>
      <div class="add-notes">
        <input type="text" name="notes" v-model="dataTransaction.notes" placeholder="add some notes" autocomplete="off">
      </div>
    </div>
    <div class="button">
      <button id="show-modal" @click="showModal = true">Confirm</button>
          <Modal :user-id="userId" :my-profile="getUser" :data-transaction="dataTransaction" v-on:add-transaction="insertTransaction" v-if="showModal" @close="showModal = false" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from '../../components/base/Modal.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Transaction',
  components: {
    Modal
  },
  data: function () {
    return {
      idReceiver: this.$route.params.idreceiver,
      dataTransaction: {
        amountTransfer: '',
        notes: '',
        userReceiverId: this.$route.params.idreceiver
      },
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
    insertTransaction (payload, amount) {
      console.log(payload)
      console.log(amount)
      this.addTransaction(payload)
        .then(res => {
          const payloadAmount = {
            balance: this.getUser.balance - amount
          }
          console.log(amount)
          this.updateProfile(payloadAmount)
            .then(res => {
              const amountInt = parseInt(amount)
              const payloadReceiver = {
                id: this.userId.id,
                balance: this.userId.balance + amountInt
              }
              this.updateProfileId(payloadReceiver)
                .then(res => {
                  console.log(res)
                })
            })
          let name = this.userId.name
          if (!name) {
            name = this.userId.username
          }
          Swal.fire(
            `Transaction to ${name}`,
            '',
            'success'
          )
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
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
button#show-modal {
  background: #6379F4;
  color: white;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  padding: 10px 60px;
  border: none;
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
