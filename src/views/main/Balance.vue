<template>
  <div class="content">
    <h4>Your balance now : Rp. {{getUser.balance}}</h4>
    <p class="add-at">Fill your balance to make transaction easier</p>
    <div class="input-container">
      <div class="input-phone">
        <img src="@/assets/img/form/filled/phone.png" alt="phone-icon">
        <input type="text" v-model="balance" placeholder="enter nominal">
      <button class="btn" @click.prevent="handleTopUp" >Fill Balance</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Balance',
  data: () => {
    return {
      balance: null
    }
  },
  methods: {
    ...mapActions(['updateProfile']),
    handleTopUp () {
      if (!this.balance) {
        Swal.fire(
          'Fill required!!',
          '',
          'error'
        )
      } else {
        const payload = {
          balance: this.getUser.balance + parseInt(this.balance)
        }
        this.updateProfile(payload)
          .then(() => {
            Swal.fire(
              'TopUp Success',
              '',
              'success'
            )
            this.$router.push({ name: 'Home' })
          })
      }
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss" scoped>
.add-at{
  font-size: 13px;
  width: 50%;
  margin: 30px 0;
}
.input-container{
  margin: 130px 0;
  display:flex;
  align-items: center;
  flex-direction: column;
}
.input-phone{
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-phone>input {
  padding: 8px 60px;
  width: 100%;
  border: none;
  border-bottom: 1.5px solid #6379F4;
}
.input-phone>input:focus {
  outline: none;
}
.input-phone>img{
  position: absolute;
  left: 5px;
  top: 12px;
}
.input-phone>button{
  margin-top: 60px;
  color: #fff;
  padding: 12px 0;
  width: 100%;
  background: #6379F4;
  box-shadow: 0px 6px 75px rgba(100, 87, 87, 0.05);
  border-radius: 12px;
}
@media screen and (max-width: 767px) {
  .add-at{
    width: 80%;
    margin: 15px 0;
  }
  .input-phone{
    width: 70%;
  }
}
@media screen and (max-width: 540px) {
  .input-phone{
    width: 90%;
  }
}
</style>
