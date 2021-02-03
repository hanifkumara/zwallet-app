<template>
  <div class="content">
    <div class="wrapper-content">
      <h2>Detail Transaction</h2>
      <div class="container-photo">
        <div class="wrapper-photo">
          <img :src="userId.photo" alt="Photo User">
        </div>
      </div>
      <div class="card-list mt-3" v-if="getDetailTransaction.userReceiverId !== idLogin">
        <h6>Name Receiver</h6>
        <h4>{{userId.name}}</h4>
      </div>
      <div class="card-list mt-3" v-else>
        <h6>Name Sender</h6>
        <h4>{{userId.name}}</h4>
      </div>
      <div class="card-list mt-3">
        <h6>Phone</h6>
        <h4>{{userId.phone}}</h4>
      </div>
      <div class="card-list mt-3">
        <h6>Email</h6>
        <h4>{{userId.email}}</h4>
      </div>
      <div class="card-list mt-3">
        <h6>Amount Transfer</h6>
        <h4>Rp.{{getDetailTransaction.amountTransfer | numFormat}}</h4>
      </div>
      <div class="card-list mt-3">
        <h6>Notes</h6>
        <h4 v-if="getDetailTransaction.notes">{{getDetailTransaction.notes}}</h4>
        <h4 v-else>-</h4>
      </div>
      <div class="card-list mt-3">
        <h6>Created At</h6>
        <h4>{{getDetailTransaction.createdAt | moment('LLL')}}</h4>
      </div>
      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-primary" @click="createPDF">
          Print PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { jsPDF as PDF } from 'jspdf'
import moment from 'moment'

export default {
  name: 'Detail',
  data: function () {
    return {
      id: this.$route.params.id,
      idLogin: localStorage.getItem('id')
    }
  },
  methods: {
    ...mapActions(['getDataUserId']),
    createPDF () {
      const doc = new PDF()
      doc.text('Transaction Detail', 80, 10)
      if (this.getDetailTransaction.userReceiverId !== this.idLogin) {
        doc.text('Name Receiver', 10, 20)
        if (this.userId.name) {
          doc.text(this.userId.name, 10, 30)
        } else {
          doc.text(this.userId.userName, 10, 30)
        }
      } else {
        doc.text('Name Sender', 10, 20)
        if (this.userId.name) {
          doc.text(this.userId.name, 10, 30)
        } else {
          doc.text(this.userId.userName, 10, 30)
        }
      }
      doc.text('Phone', 10, 40)
      doc.text(this.userId.phone, 10, 50)
      doc.text('Email', 10, 60)
      doc.text(this.userId.email, 10, 70)
      doc.text('Amount Transfer', 10, 80)
      doc.text(`Rp.${this.getDetailTransaction.amountTransfer}`, 10, 90)
      doc.text('Notes', 10, 100)
      if (!this.getDetailTransaction.notes) {
        doc.text('-', 10, 110)
      } else {
        doc.text(this.getDetailTransaction.notes, 10, 110)
      }
      doc.text('Date & Time', 10, 120)
      doc.text(`${moment(this.getDetailTransaction.createdAt).format('LLL')}`, 10, 130)
      doc.save('detail-transaction.pdf')
    }
  },
  computed: {
    ...mapGetters(['getDetailTransaction', 'userId'])
  }
}
</script>

<style scoped>
.container-photo{
  display: flex;
  justify-content: center;
}
.wrapper-content{
  width: 100%;
}
.wrapper-photo{
  width: 80px;
  height: 80px;
}
.wrapper-photo>img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.card-list{
  width: 100%;
  padding: 10px 20px;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
</style>
