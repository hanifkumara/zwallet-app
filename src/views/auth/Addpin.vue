<template>
  <div>
    <h3>Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.</h3>
    <p class="small">Create 6 digits pin to secure all your money and your data in Zwallet app. Keep it secret and don’t tell anyone about your Zwallet account password and the PIN.</p>
    <form @submit.prevent="setPin">
      <Pin/>
      <Button title="Add PIN" type="submit"/>
    </form>
  </div>
</template>

<script>
import Pin from '../../components/base/Pin.vue'
import Button from '../../components/base/Button.vue'
export default {
  name: 'Addpin',
  components: {
    Pin,
    Button
  },
  methods: {
    setPin () {
      console.log('Tes ada bos')
    }
  }
}
</script>

<style scoped>
  h3{
    margin-top: 30px;
  }
  p.small{
    margin: 30px 0;
  }
</style>
