<template>
  <div class="content">
    <div class="profile-container">
      <div class="profile-content">
        <div class="profile-image">
          <img :src="getUser.photo" alt="photo">
        </div>
        <div class="edit d-flex">
          <div class="edit-icon mr-1">
            <img src="@/assets/img/edit-2.png" alt="edit">
          </div>
          <div class="modal-edit">
            <p v-b-modal.modal-1>edit</p>
            <b-modal id="modal-1" title="BootstrapVue" ok-only>
                <div slot="modal-header">
                  <input class="my-4" @change="hanldeUpload" type="file" id="photo">
                </div>
                <button slot="modal-footer" type="submit" @click.prevent="handleSubmit">confirm</button>
            </b-modal>
          </div>
        </div>
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
      console.log(e.target.files[0])
      this.image = e.target.files[0]
    },
    handleSubmit () {
      const data = new FormData()
      data.append('photo', this.image)

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
            '',
            'error'
          )
          console.log(err)
        })
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
  margin: 45px 0;
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
