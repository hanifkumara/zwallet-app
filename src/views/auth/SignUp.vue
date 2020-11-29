<template>
  <div>
    <h3>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
       <p class="small">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        <form action="">
          <div class="username">
            <img src="../../assets/img/icon/form/empty/person.png" alt="person">
            <input type="text" name="username" placeholder="Enter your username">
          </div>
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
        <Button title="Sign Up"/>
        <div class="login-signup">Already have an account? Let’s <router-link to="login" style="padding-left: 5px">Login</router-link></div>
  </div>
</template>

<script>
import Button from '../../components/base/Button.vue'
export default {
  name: 'SignUp',
  components: {
    Button
  }
}
</script>

<style scoped>
.username, .password, .email {
    margin-top: 30px;
}
</style>
