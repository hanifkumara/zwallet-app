<template>
  <div>
    <h3>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
       <p class="small">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        <form @submit.prevent="$emit('forgot-handle', email)">
          <div class="email">
            <img src="../../assets/img/icon/form/empty/mail.png" alt="Email">
            <input type="text" v-model="email" placeholder="Enter your E-mail">
          </div>
          <p class="text-danger" v-if="email.length >=1 && !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)">Format email invalid</p>
          <Button title="Forgot Password" type="submit" :class="[email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? 'primary' : '']"/>
        </form>
        <div class="login-signup">Already have an account? Let’s <router-link to="login" style="padding-left: 5px">Login</router-link></div>
  </div>
</template>

<script>
import Button from '../../components/base/Button.vue'

export default {
  name: 'SignUp',
  components: {
    Button
  },
  data: () => {
    return {
      email: ''
    }
  }
}
</script>

<style scoped>
.username, .password, .email {
    margin-top: 30px;
}
</style>
