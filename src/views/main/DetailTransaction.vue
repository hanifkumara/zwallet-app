<template>
  <div class="content">
    <h3>Detail Transaction</h3>
    <div class="container-card">
      <div class="transaction" ref="transaction">
      <div class="card-detail">
        <h6>Transfer to</h6>
        <h4 v-if="name">{{name}}</h4>
        <h4 v-else>{{userName}}</h4>
      </div>
      <div class="card-detail">
        <h6>Amount transfer</h6>
        <h4>Rp. {{ amount | numFormat }}</h4>
      </div>
      <div class="card-detail">
        <h6>Notes</h6>
        <h4 v-if="notes">{{notes}}</h4>
        <h4 v-else>-</h4>
      </div>
      <div class="card-detail">
        <h6>Date & Time</h6>
        <h4>{{ new Date() | moment("LLLL") }}</h4>
      </div>
      </div>
      <div class="button d-flex justify-content-end align-items-center mt-3">
        <h6 v-b-modal.modal-1 class="btn btn-primary">Confirm</h6>
          <b-modal id="modal-1" title="BootstrapVue" hide-footer>
                <div slot="modal-header">
                  <div class="container-pin">
                    <div class="box-pin">
                      <input type="text" v-model="pin" maxlength="1">
                      <input type="text" v-model="pin2" maxlength="1">
                      <input type="text" v-model="pin3" maxlength="1">
                      <input type="text" v-model="pin4" maxlength="1">
                      <input type="text" v-model="pin5" maxlength="1">
                      <input type="text" v-model="pin6" maxlength="1">
                    </div>
                    <button class="d-flex align-items-center justify-content-center" @click="insertTransaction" :disabled="loading" type="submit" :class="[mergePin.length > 5 ? 'primary' : 'empty']">
                      Confirm
                      <template class="ml-3" v-if="loading">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path fill="none" stroke="#1d3f72" stroke-width="5" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.67);transform-origin:50px 50px"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg>
                      </template>
                    </button>
                  </div>
                </div>
            </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DetailTransaction',
  data () {
    return {
      notes: this.$route.query.notes,
      userReceiverId: this.$route.query.userId,
      amount: this.$route.query.amount,
      name: this.$route.query.name,
      userName: this.$route.query.userName,
      amountReceiver: this.$route.query.userBalance,
      loading: false,
      pin: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      pin6: '',
      dataReceiver: {}
    }
  },
  mounted () {
    this.getDataUserId(this.$route.query.userId)
      .then(res => {
        this.dataReceiver = res
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    ...mapActions(['addTransaction', 'updateProfile', 'updateProfileId', 'getDataUserId']),
    insertTransaction () {
      console.log('ini apa', this.mergePin)
      this.loading = true
      if (this.mergePin !== this.getUser.pin) {
        Swal.fire(
          'PIN wrong!!',
          'please try again or create new pin',
          'error'
        )
        this.pin = ''
        this.pin2 = ''
        this.pin3 = ''
        this.pin4 = ''
        this.pin5 = ''
        this.pin6 = ''
        this.loading = false
      } else if (this.amount > this.getUser.balance) {
        Swal.fire(
          'Your balance not enough',
          `Your balance Rp. ${this.getUser.balance}`,
          'error'
        )
        this.loading = false
      } else {
        this.addTransaction({ amountTransfer: this.amount, userReceiverId: this.userReceiverId, notes: this.notes })
          .then(res => {
            const payloadAmount = {
              balance: this.getUser.balance - this.amount
            }
            this.updateProfile(payloadAmount)
              .then(res => {
                this.loading = false
                const amountInt = parseInt(this.amount)
                console.log(amountInt)
                const payloadReceiver = {
                  id: this.userReceiverId,
                  balance: parseInt(this.amountReceiver) + amountInt
                }
                this.updateProfileId(payloadReceiver)
                  .then(res => {
                    console.log(res)
                  })
              })
            let name = this.name
            if (!name) {
              name = this.userName
            }
            Swal.fire(
        `Transaction to ${name}`,
        '',
        'success'
            )
            this.$router.push({ name: 'Home' })
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    mergePin () {
      const pin = this.pin + this.pin2 + this.pin3 + this.pin4 + this.pin5 + this.pin6
      return pin
    }
  }
}
</script>

<style scoped>
.card-detail{
  width: 100%;
  padding: 15px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-top: 20px;
}
.container-card{
  margin-top: 10px;
}
button.btn, h6.btn {
  padding: 8px 20px;
  border-radius: 10px;
}
.container-pin{
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 120px;
  width: 95%;
}
.box-pin {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;
}
.box-pin>input {
  text-align: center;
  font-size: 25px;
  width: 15%;
  height: 90px;
  border-radius: 10px;
  border: .5px solid rgba(169, 169, 169, 0.6);
}
.box-pin>input:focus{
  outline: none
}
.change-pin{
  color: #7A7886;
  width: 52%
}
.empty {
  width: 100%;
  background: #DADADA;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  padding: 16px 0;
  border: none;
}
.primary {
  width: 100%;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
  padding: 16px 0;
  border: none;
  background: #6379F4;
  color: white;
}
.container-pin>button:focus{
  outline: none;
}
@media screen and (max-width: 980px) {
  .container-pin{
    width: 80%;
  }
  .box-pin>input {
    height: 70px;
  }
}
@media screen and (max-width: 760px) {
  .container-pin{
    width: 90%;
  }
}
@media screen and (max-width: 540px) {
  .container-pin{
    width: 95%;
  }
  .box-pin>input {
    height: 60px;
  }
  .change-pin{
    color: #7A7886;
    width: 80%;
  }
}
</style>
