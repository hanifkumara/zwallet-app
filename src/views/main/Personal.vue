<template>
  <div class="content">
    <h3 class="title">Persnal Information</h3>
    <p class="we-got">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
    <div class="card-personal">
      <p>Name</p>
      <h6>{{getUser.name}}</h6>
    </div>
    <div class="card-personal">
      <p>Verifed E-Mail</p>
      <h6>{{getUser.email}}</h6>
    </div>
    <div class="card-personal phone">
      <div class="card-left">
        <p>Phone Number</p>
        <h6>{{getUser.phone}}</h6>
      </div>
      <router-link :to="{name: 'ManagePhone'}">Manage</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Personal',
  mounted () {
    this.getDataUser()
  },
  methods: {
    ...mapActions(['getDataUser'])
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>
.title{
  margin-top: 16px;
}
.we-got{
  font-size: 13px;
  margin: 40px 0;
  width: 80%;
}
.card-personal{
  margin: 20px 0;
  width: 100%;
  height: fit-content;
  padding: 15px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.card-personal.phone{
  display: flex;
  justify-content: space-between;
}
.card-personal p {
  margin: 0;
}
</style>
