<template>
  <div>
    <div class="content">
    <h4>Manage Phone Number</h4>
    <p class="add-at">You can only delete the phone number and then you must add another phone number.</p>
    <div class="container-card-phone">
      <div class="card-phone d-flex justify-content-between" @click.prevent="toUpdatePhone">
      <div class="card-left">
        <p>Primary</p>
        <h6>{{getData.phone}}</h6>
      </div>
    </div>
    <div class="card-phone d-flex justify-content-between">
      <div class="card-left">
        <p>Secondary</p>
        <div v-if="getData.phone2 == 'null'"><h6 @click.prevent="toAddPhone">Add Phone Number</h6></div>
        <h6 v-else>{{getData.phone2}}</h6>
      </div>
      <div class="card-right">
        <div v-if="getData.phone2 && getData.phone2 !== 'null' " @click="hanldeDelete" class="icon-delete">
          <img src="@/assets/img/trash.png" alt="trash">
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'ManagePhone',
  data: function () {
    return {
      dataUser: [],
      phone: ''
    }
  },
  methods: {
    ...mapActions(['updateProfile']),
    hanldeDelete () {
      const payload = {
        phone2: 'null'
      }
      console.log(payload)
      this.updateProfile(payload)
        .then(res => {
          Swal.fire(
            'Delete Phone Success',
            '',
            'success'
          )
          this.$router.push({ name: 'Personal' })
        })
        .catch(err => {
          console.log(err)
        })
    },
    toUpdatePhone () {
      this.$router.push({ name: 'AddPhone', params: { phone: 'update' } })
    },
    toAddPhone () {
      this.$router.push({ name: 'AddPhone', params: { phone: 'add' } })
    },
    cek () {
      console.log('cek boss')
    }
  },
  props: ['get-data']
}
</script>

<style scoped>
.content p {
  margin-bottom: 0;
  padding-bottom: 5px;
}
.add-at{
  font-size: 13px;
  width: 50%;
  margin: 30px 0;
}
.container-card-phone{
  margin-bottom: 200px ;
}
.card-phone {
  margin-top: 30px;
  padding: 10px 20px;
  background: #FFFFFF;
  box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  cursor: pointer;
}
.icon-delete {
  width: 20px;
  height: 20px;
}
.icon-delete > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.card-left > div > h6 {
  color: rgb(82, 82, 255);
  cursor: pointer;
}
.card-left > div > h6:hover {
  transform: scale(1.03);
}

@media screen and (max-width: 767px) {
  .add-at{
    width: 80%;
    margin: 15px 0;
  }
  .input-phone{
    width: 70%;
  }
}
@media screen and (max-width: 540px) {
  .input-phone{
    width: 90%;
  }
}
</style>
