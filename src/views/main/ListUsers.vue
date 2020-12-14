<template>
  <div class="content">
    <h4>List Users</h4>
    <p>Choose one user for transfer</p>
    <div class="card-content">
      <div class="all-card">
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
        <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item" :class="[paginatonUsers.currentPage == 1 ? 'disabled' : '']">
            <a class="page-link" @click.prevent="getListUsers(parseInt(paginatonUsers.currentPage) - 1)" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li v-for="noPage in paginatonUsers.totalPage" class="page-item" :class="[noPage == paginatonUsers.currentPage ? 'active' : '']" :key="noPage"><a class="page-link" @click.prevent="getListUsers(noPage)" href="#">{{noPage}}</a></li>
          <li class="page-item"  :class="[paginatonUsers.currentPage == paginatonUsers.totalPage ? 'disabled' : '']">
            <a class="page-link" @click.prevent="getListUsers(parseInt(paginatonUsers.currentPage) + 1)" href="#">Next</a>
          </li>
        </ul>
      </nav>
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
    ...mapGetters(['listUsers', 'paginatonUsers'])
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
.card-receiver:hover {
  transform: scale(1.02)
}
.card-receiver > a {
  text-decoration: none;
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
.all-card{
  margin-top: 18px;
  height: 355px;
}
ul.pagination {
  margin: 0;
}
</style>
