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
        <h4>{{notes}}</h4>
      </div>
      <div class="card-detail">
        <h6>Date & Time</h6>
        <h4>{{ new Date() | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</h4>
      </div>
      </div>
      <div class="button d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-success" @click="createPDF">
        Print PDF
      </button>
        <h6 v-b-modal.modal-1 class="btn btn-primary">Confirm</h6>
          <b-modal id="modal-1" title="BootstrapVue" ok-only>
                <div slot="modal-header">
                  <input class="my-4" type="text" v-model="pin" placeholder="input your PIN">
                </div>
                <button slot="modal-footer" type="submit" :disabled="loading" @click="insertTransaction">
                  <div class="d-flex align-items-center">
                    confirm
                    <template v-if="loading">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path fill="none" stroke="#1d3f72" stroke-width="5" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.67);transform-origin:50px 50px"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg>
                    </template>
                  </div>
                </button>
            </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions, mapGetters } from 'vuex'
import { jsPDF as PDF } from 'jspdf'

export default {
  name: 'DetailTransaction',
  data () {
    return {
      notes: this.$route.query.notes,
      userReceiverId: this.$route.query.userId,
      amount: this.$route.query.amount,
      name: this.$route.query.name,
      userName: this.$route.query.userName,
      pin: null,
      amountReceiver: this.$route.query.userBalance,
      loading: false
    }
  },
  methods: {
    ...mapActions(['addTransaction', 'updateProfile', 'updateProfileId']),
    insertTransaction () {
      this.loading = true
      if (this.pin !== this.getUser.pin) {
        Swal.fire(
          'PIN wrong!!',
          '',
          'error'
        )
        this.loading = false
      } else if (this.amount > this.getUser.balance) {
        Swal.fire(
          'Your balance not enough',
          `Your balance Rp. ${this.getUser.balance}`,
          'error'
        )
        this.loading = false
      } else {
        setTimeout(() => {
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
        }, 3000)
      }
    },
    createPDF () {
      const doc = new PDF()
      doc.text('Transaction Detail', 80, 10)
      doc.text('Trasnfer To', 10, 20)
      if (this.name) {
        doc.text(this.name, 10, 30)
      } else {
        doc.text(this.userName, 10, 30)
      }
      doc.text('Amount Transfer', 10, 40)
      doc.text(this.amount, 10, 50)
      doc.text('Notes', 10, 60)
      doc.text(this.notes, 10, 70)
      doc.text('Date & Time', 10, 80)
      doc.text(`${new Date()}`, 10, 90)
      doc.save('transaction.pdf')
    }
  },
  computed: {
    ...mapGetters(['getUser'])
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
</style>
