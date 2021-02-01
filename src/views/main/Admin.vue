<template>
  <div class="content">
    <h4>List Users</h4>
     <div class="all-card">
        <div class="card-receiver" v-for="data in getAllUsers" :key="data.id">
          <div class="container-card d-flex">
            <div class="photo-receiver">
              <img :src="data.photo" alt="photo-receiver" @error="imgPlaceholder">
            </div>
            <div class="name-phone">
              <h6 v-if="!data.name">{{data.username}}</h6>
              <h6 v-else>{{data.name}}</h6>
              <p>{{data.phone}}</p>
            </div>
            <div class="card-right">
              <div class="icon-delete" @click="delUser(data.id)">
                <img src="@/assets/img/trash.png" alt="trash">
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item" :class="[paginationAllUsers.currentPage == 1 ? 'disabled' : '']">
            <a class="page-link" @click.prevent="getListUsers(parseInt(paginationAllUsers.currentPage) - 1)" href="#" tabindex="-1" aria-disabled="true">Previous</a>
          </li>
          <li v-for="noPage in paginationAllUsers.totalPage" class="page-item" :class="[noPage == paginationAllUsers.currentPage ? 'active' : '']" :key="noPage"><a class="page-link" @click.prevent="allUsers(noPage)" href="#">{{noPage}}</a></li>
          <li class="page-item"  :class="[paginationAllUsers.currentPage == paginationAllUsers.totalPage ? 'disabled' : '']">
            <a class="page-link" @click.prevent="allUsers(parseInt(paginationAllUsers.currentPage) + 1)" href="#">Next</a>
          </li>
        </ul>
      </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Admin',
  mounted () {
    this.allUsers()
  },
  methods: {
    ...mapActions({
      allUsers: 'getAllUsers',
      delUser: 'deleteUser'
    }),
    imgPlaceholder (e) {
      e.target.src = 'https://via.placeholder.com/300'
    }
  },
  computed: {
    ...mapGetters(['getAllUsers', 'paginationAllUsers'])
  }
}
</script>

<style scoped>
.all-card{
  margin: 20px 0;
  height: 390px;
}
.card-receiver{
  position: relative;
  width: 100%;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 15px;
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
.card-right{
  position: absolute;
  right: 10px;
  top: 10px;
}
.icon-delete {
  height: 25px;
  width: 25px;
}
.icon-delete > img {
  object-fit: contain;
  height: 100%;
  width: 100%
}
</style>
