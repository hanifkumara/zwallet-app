<template>
  <div class="content">
    <div class="profile-container">
      <div class="profile-content">
        <div class="profile-image">
          <img :src="photo" alt="photo">
        </div>
        <h4>{{name}}</h4>
        <p>+{{phone}}</p>
        <div class="edit-button">
          <router-link :to="{name: 'Personal', params: {idUser: idUser}}">
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
import axios from 'axios'

export default {
  name: 'Profile',
  data: function () {
    return {
      idUser: 3,
      name: '',
      photo: '',
      phone: null
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      try {
        const result = await axios.get(`${process.env.VUE_APP_SERVICE_API}/users/${this.idUser}`)
        const resData = result.data.result[0]
        this.name = resData.name
        this.phone = resData.phone
        this.photo = resData.photo
      } catch (e) {
        console.log(e.message)
      }
    }
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
  margin-top: 30px;
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
}
</style>
