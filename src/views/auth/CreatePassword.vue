<template>
  <div>
    <h4>Forgot Password</h4>
    <label for="show">New Password</label>
    <div class="wrapper-new-password">
      <input type="password" class="form-control" v-model="newPassword" placeholder="input new password" id="show">
      <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye" @click="showPassword">
    </div>
    <p class="text-danger" v-if="newPassword.length > 1 & newPassword.length <= 7">Pasword must be more than 7 characters</p>
    <label for="show2">Confirm New Password</label>
    <div class="wrapper-confirm-password">
      <input type="password" class="form-control" v-model="confirmPassword" placeholder="repeat new password" id="show2">
      <img src="@/assets/img/ic_sharp-remove-red-eye.png" alt="icon-eye" @click="showPassword2">
    </div>
    <p class="text-danger" v-if="confirmPassword.length > 1 & confirmPassword.length <= 7">Pasword must be more than 7 characters</p>
    <button class="btn btn-primary mt-2 d-flex align-items-center" @click="handleConfirm" :disabled="loading">
      confirm
      <template v-if="loading">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path fill="none" stroke="#1d3f72" stroke-width="5" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.67);transform-origin:50px 50px"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg>
      </template>
    </button>
  </div>
</template>

<script>
import showPass from '../../mixins/showPassword'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'CreatePassword',
  mixins: [showPass],
  data () {
    return {
      newPassword: '',
      confirmPassword: '',
      errorNotSame: false,
      loading: false
    }
  },
  methods: {
    async handleConfirm () {
      if (!this.newPassword || !this.confirmPassword) {
        Swal.fire('Fill required', 'please check again', 'error')
        return
      }
      if (this.newPassword !== this.confirmPassword) {
        Swal.fire('Password not same', 'please check again', 'error')
        return
      }
      if (this.newPassword.length <= 7) {
        Swal.fire('Pasword must be more than 7 characters', 'please check again', 'error')
        return
      }
      if (this.confirmPassword.length <= 7) {
        Swal.fire('Pasword must be more than 7 characters', 'please check again', 'error')
      } else {
        this.loading = true
        try {
          const token = this.$route.params.token
          const apiUrl = `${process.env.VUE_APP_SERVICE_API}`
          const authAxios = axios.create({
            baseURL: apiUrl,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          const result = await authAxios.patch('/auth/reset-password', { password: this.newPassword })
          console.log(result)
          this.loading = false
          Swal.fire('Success', 'Lets go login now', 'success')
          this.$router.push('/auth/login')
        } catch (error) {
          this.loading = false
          console.log(error.response)
        }
      }
      console.log('hello')
    }
  }
}
</script>

<style scoped>
.wrapper-new-password, .wrapper-confirm-password {
  width: 100%;
  position: relative
}
.wrapper-new-password > img, .wrapper-confirm-password > img {
  position: absolute;
  right: 5px;
  top: 8px;
}
</style>
