<template>
  <div class="content">
    <h4>Change Phone Number</h4>
    <p class="add-at">Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
    <div class="input-container">
      <div class="input-phone">
        <img src="@/assets/img/form/filled/phone.png" alt="phone-icon">
        <input type="text" v-model="phone" :placeholder="getUser.phone">
      <button class="btn" @click="handleUpdate" >Update Phone Number</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ManagePhone',
  data: function () {
    return {
      dataUser: [],
      phone: ''
    }
  },
  mounted () {
    this.getDataUser()
  },
  methods: {
    ...mapActions(['updateProfile', 'getDataUser']),
    handleUpdate () {
      const payload = {
        phone: this.phone
      }
      this.updateProfile(payload)
        .then(() => {
          Swal.fire(
            'Update Phone Success',
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
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>
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
