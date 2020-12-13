<template>
  <div class="content">
    <h4>Change PIN</h4>
    <p class="change-pin">Enter your current 6 digits Zwallet PIN below to continue to the next steps.</p>
    <div class="container-pin">
      <div class="box-pin">
        <input type="text" v-model="pin" maxlength="1">
        <input type="text" v-model="pin2" maxlength="1">
        <input type="text" v-model="pin3" maxlength="1">
        <input type="text" v-model="pin4" maxlength="1">
        <input type="text" v-model="pin5" maxlength="1">
        <input type="text" v-model="pin6" maxlength="1">
      </div>
      <button :class="[mergePin.length > 5 ? 'primary' : 'empty']" @click="handleUpdate">Confirm</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Pin',
  data: () => {
    return {
      pin: '',
      pin2: '',
      pin3: '',
      pin4: '',
      pin5: '',
      pin6: ''
    }
  },
  methods: {
    ...mapActions(['updateProfile']),
    handleUpdate () {
      const payload = {
        pin: this.mergePin
      }
      this.updateProfile(payload)
        .then(() => {
          Swal.fire(
            'Update PIN Success',
            '',
            'success'
          )
          this.$router.push({ name: 'Profile' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    mergePin () {
      const pin = this.pin + this.pin2 + this.pin3 + this.pin4 + this.pin5 + this.pin6
      return pin
    }
  }
}
</script>

<style scoped>
.container-pin{
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 120px;
  width: 60%;
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
