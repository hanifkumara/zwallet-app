<template>
  <div id="app">
    <router-view/>
  </div>
</template >

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse', 'getListUsers', 'getAllUsers'])
  },
  created () {
    this.interceptorRequest()
    this.interceptorResponse()
    this.getListUsers()
    this.getAllUsers()
  }
}
</script>

<style lang="scss">
</style>
