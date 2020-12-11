<template>
  <div class="content">
    <div class="card-content">
        <div class="card-receiver" v-for="data in listUsers" :key="data.id">
          <router-link :to="{name: 'Transaction', params: {idreceiver: data.id}}">
            <div class="d-flex">
              <div class="photo-receiver">
                <img :src="data.photo" alt="photo-receiver">
              </div>
              <div class="name-phone">
                <h6 v-if="!data.name">{{data.username}}</h6>
                <h6 v-else>{{data.name}}</h6>
                <p>{{data.phone}}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListUsers',
  mounted () {
    this.getListUsers()
  },
  methods: {
    ...mapActions(['getListUsers'])
  },
  computed: {
    ...mapGetters(['listUsers'])
  }
}
</script>

<style scoped>
.card-content{
  height: 390px;
}
.card-receiver{
  width: 100%;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
}
.photo-receiver{
  height: 60px;
  width: 60px;
  border-radius: 10px;
}
.photo-receiver>img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.name-phone{
  margin-left: 20px;
}
.name-phone > p {
  margin: 0;
  color: black !important;
  font-size: 14px;
}.name-phone> h6{
  color: black !important;
}
.data-receiver{
  color: black !important;
}
</style>
