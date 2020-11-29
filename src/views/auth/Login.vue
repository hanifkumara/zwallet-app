<template>
    <div>
       <h3 class="auth">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
        <p class="small">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        <form action="">
            <div class="email">
                <img src="../../assets/img/icon/form/empty/mail.png" alt="Email">
                <input type="text" name="email" placeholder="Enter your E-mail">
            </div>
            <div class="password">
                <img src="../../assets/img/icon/form/empty/lock.png" alt="password">
                <img src="../../assets/img/icon/form/empty/eye-crossed.png" alt="eye">
                <input type="password" name="password" placeholder="Enter your E-password">
            </div>
        </form>
        <a href="#" class="forgot-password">Forgot password ?</a>
        <Button title="Login"/>
        <div class="login-signup">Don’t have an account? Let’s <router-link to="signup" style="padding-left: 10px"> Sign Up</router-link></div>
    </div>
</template>

<script>
import axios from 'axios'
import Button from '../../components/base/Button.vue'
export default {
  name: 'Login',
  components: {
    Button
  },
  data: function () {
    return {
      data: []
    }
  },
  mounted () {
    axios.get('http://localhost:5000/users')
      .then(res => {
        this.data = res.data.result
        console.log(res)
      })
      .catch(e => {
        console.log(e.message)
      })
  }
}
</script>

<style scoped>
  h3.auth{
     margin-top: 30px;
  }
</style>
