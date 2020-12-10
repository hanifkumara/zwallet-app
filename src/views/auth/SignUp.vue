<template>
  <div>
    <h3>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
       <p class="small">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        <form @submit.prevent="$emit('signup-handle', dataSignup)">
          <div class="username">
            <img src="../../assets/img/icon/form/empty/person.png" alt="person">
            <input type="text" v-model="dataSignup.username" placeholder="Enter your username">
          </div>
          <div class="email">
            <img src="../../assets/img/icon/form/empty/mail.png" alt="Email">
            <input type="text" v-model="dataSignup.email" placeholder="Enter your E-mail">
          </div>
          <div class="password">
            <img src="../../assets/img/icon/form/empty/lock.png" alt="password">
            <img src="../../assets/img/icon/form/empty/eye-crossed.png" alt="eye" @click="showPassword">
            <input type="password" v-model="dataSignup.password" placeholder="Enter your E-password" id="show">
          </div>
          <a href="#" class="forgot-password">Forgot password ?</a>
          <Button title="Sign Up" type="submit"/>
        </form>
        <div class="login-signup">Already have an account? Let’s <router-link to="login" style="padding-left: 5px">Login</router-link></div>
  </div>
</template>

<script>
import Button from '../../components/base/Button.vue'
import showPass from '../../mixins/showPassword'

export default {
  name: 'SignUp',
  components: {
    Button
  },
  data: () => {
    return {
      dataSignup: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  mixins: [showPass]
}
</script>

<style scoped>
.username, .password, .email {
    margin-top: 30px;
}
</style>
