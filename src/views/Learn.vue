<template>
    <div>
        <Navbar/>
        <div class="row mt-5 mx-5">
            <div class="col-md-4" v-for="profile in profiles" :key="profile.id">
                <Card :data=profile />
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Navbar from '../components/module/Navbar'
import Card from '../components/module/Card'
import Footer from '../components/module/Footer'
export default {
  name: 'Learn',
  components: {
    Navbar,
    Card,
    Footer
  },
  data: function () {
    return {
      profiles: [
        { id: '1', name: 'Hanif Kumara', hobby: 'Game', address: 'Sukoharjo, Jawa Tengah' },
        { id: '2', name: 'Nanda Febriansah', hobby: 'Anime', address: 'Bekonang, Jawa Tengah' },
        { id: '3', name: 'Fathoni Novantoro', hobby: 'Martial Arts', address: 'Klaten, Jawa Tengah' },
        { id: '4', name: 'Kurniawan Khoiruddin', hobby: 'Farmer', address: 'Ngemul, Sukoharjo, Jawa Tengah' },
        { id: '5', name: 'Allam Qobus AF', hobby: 'Football', address: 'Sukoharjo, Jawa Tengah' },
        { id: '6', name: 'Farhan Meyega Umar', hobby: 'Football', address: 'Sidoarjo, Jawa Timur' },
        { id: '7', name: 'Satria Ardiansah', hobby: 'Playing PUBG', address: 'Weru, Jawa Tengah' },
        { id: '8', name: 'Ilyasa Roshid Zufar', hobby: 'Sleep', address: 'Klaten, Jawa Tengah' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
