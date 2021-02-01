<template>
  <div class="content">
    <div class="profile-container">
      <div class="profile-content">
        <label for="file-upload" class="img-wrap">
            <img :src="getUser.photo" alt="photo" @error="imgPlaceholder">
        <h4 class="description-image">Upload Photo</h4>
        </label>
        <input type="file" id="file-upload" @change="hanldeUpload">
        <h4>{{getUser.name}}</h4>
        <p v-setstyle:size="'chill'">{{getUser.phone}}</p>
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
          <router-link :to="{name: 'Pin'}">
            <div class="card-button">
              <h6>Change Pin</h6>
              <div class="img-arrow">
                <img src="@/assets/img/arrow-left.png" alt="arrow-left">
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Profile',
  data: () => {
    return {
      image: null
    }
  },
  mounted () {
    this.getDataUser()
  },
  methods: {
    ...mapActions(['getDataUser', 'updateProfile']),
    hanldeUpload (e) {
      const image = e.target.files[0]
      const data = new FormData()
      data.append('photo', image)
      this.updateProfile(data)
        .then(res => {
          Swal.fire(
            'Edit photo success',
            '',
            'success'
          )
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          let message = ''
          if (err === 'Only images are allowed') {
            message = 'Only images are allowed'
          } else {
            message = 'File too large, max length 1MB'
          }
          Swal.fire(
            `${message}`,
            'Please input image correctly',
            'error'
          )
          console.log(err)
        })
    },
    imgPlaceholder (e) {
      e.target.src = 'https://via.placeholder.com/300'
    }
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
  margin: 38px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.img-wrap{
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 15px;
  cursor: pointer;
}
.img-wrap:hover .description-image {
  visibility: visible;
  opacity: 1;
}
.img-wrap > img {
  object-fit: contain;
  border-radius: 15px;
  width: 100%;
  height: 100%;
}
.modal-edit > p {
  margin: 0;
}
.edit-icon{
  width: 15px;
  height: 15px;
}
.edit-icon > img {
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
.modal-edit > p {
  outline: none;
}
input[type="file"]{
  display: none;
}
.description-image {
  display: flex;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(158, 158, 158, 0.72);
  color: #fff;
  visibility: hidden;
  opacity: 0;

  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
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
