<template>
    <div>
       <h3 class="auth">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
        <p class="small">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        <form @submit.prevent="$emit('login-handle', dataLogin)">
          <div class="email">
              <img src="../../assets/img/icon/form/empty/mail.png" alt="Email">
              <input type="text" v-model="dataLogin.email" placeholder="Enter your E-mail">
          </div>
          <p class="text-danger" v-if="dataLogin.email.length >=1 && !dataLogin.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)">Format email invalid</p>
          <div class="password">
              <img src="../../assets/img/icon/form/empty/lock.png" alt="password">
              <img src="../../assets/img/icon/form/empty/eye-crossed.png" alt="eye" @click="showPassword">
              <input type="password" v-model="dataLogin.password" placeholder="Enter your password" id="show">
          </div>
          <p class="text-danger" v-if="dataLogin.password.length >= 1 && dataLogin.password.length <= 5">length password must be more than 5 char</p>
          <a href="#" class="forgot-password">Forgot password ?</a>
          <Button title="Login" type="submit" :class="[dataLogin.password.length > 5 ? 'primary' : '']" />
        </form>
        <div class="login-signup">Don’t have an account? Let’s <router-link to="signup" style="padding-left: 10px"> Sign Up</router-link></div>
    </div>
</template>

<script>
import Button from '../../components/base/Button.vue'
import showPass from '../../mixins/showPassword'

export default {
  name: 'Login',
  components: {
    Button
  },
  mixins: [showPass],
  data: function () {
    return {
      dataLogin: {
        email: '',
        password: ''
      }
    }
  }

}
</script>

<style scoped>
  h3.auth{
     margin-top: 30px;
  }
</style>
