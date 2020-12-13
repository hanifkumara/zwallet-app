<template>
  <div class="content">
    <h3 class="title">Persnal Information</h3>
    <p class="we-got">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
    <div class="card-personal">
      <p>Name</p>
      <div v-if="!getUser.name">
        <div class="change-name">
          <h6 v-b-modal.modal-1>Please input your name here...</h6>
          <b-modal id="modal-1" title="BootstrapVue" ok-only>
                <div slot="modal-header">
                  {{name}}
                  <input class="my-4" type="text" v-model="name" placeholder="input your name">
                </div>
                <button slot="modal-footer" type="submit" @click.prevent="changeName">confirm</button>
            </b-modal>
        </div>
      </div>
      <h6 v-if="getUser.name">{{getUser.name}}</h6>
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
import Swal from 'sweetalert2'

export default {
  name: 'Personal',
  data: () => {
    return {
      name: ''
    }
  },
  mounted () {
    this.getDataUser()
  },
  methods: {
    ...mapActions(['getDataUser', 'updateProfile']),
    changeName () {
      const payload = {
        name: this.name
      }
      this.updateProfile(payload)
        .then(res => {
          Swal.fire(
            'Edit Name Success',
            '',
            'success'
          )
          this.$router.push({ name: 'Profile' })
        })
        .catch(err => {
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
.title{
  margin-top: 16px;
}
.we-got{
  font-size: 13px;
  margin: 40px 0;
  width: 80%;
}
.card-personal{
  margin: 34px 0;
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
.change-name > h6{
  outline: none;
}
</style>
