<template>
  <div class="content">
    <div class="profile-container">
      <div class="profile-content">
        <div class="profile-image">
          <img :src="getUser.photo" alt="photo">
        </div>
        <h4>{{getUser.name}}</h4>
        <p>{{getUser.phone}}</p>
        <div class="edit-button">
          <router-link :to="{name: 'Personal'}">
            <div class="card-button">
              <h6>Personal Information</h6>
              <div class="img-arrow">
                <img src="@/assets/img/arrow-left.png" alt="arrow-left">
              </div>
            </div>
          </router-link>
          <div class="card-button">
            <h6>Change Password</h6>
            <div class="img-arrow">
              <img src="@/assets/img/arrow-left.png" alt="arrow-left">
            </div>
          </div>
          <div class="card-button">
            <h6>Change Pin</h6>
            <div class="img-arrow">
              <img src="@/assets/img/arrow-left.png" alt="arrow-left">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Profile',
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
.profile-container{
  width: 100%;
  height: fit-content;
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 10px;
}
.profile-content {
  margin: 55px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.profile-image{
  width: 70px;
  height: 70px;
  border-radius: 15px;
}
.profile-image > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.edit-button{
  margin-top: 20px;
  width: 50%;
}
.edit-button > a:hover {
  text-decoration: none;
}
.card-button{
  margin-bottom: 20px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background: #E5E8ED;
  border-radius: 10px;
}
.card-button h6{
  display: flex;
  align-items: center;
  color: black !important;
  margin: 0;
}

@media screen and (max-width: 720px) {
  .edit-button{
    width: 80%;
  }
  .card-button{
    margin-bottom: 20px;
    padding: 8px;
  }
}
</style>
