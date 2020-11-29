<template>
    <div class="card" style="width: 18rem;">
    <img src="#" class="card-img-top" alt="#">
    <div class="card-body">
        <h5 class="card-title">{{data.name}}</h5>
        <p class="card-text">{{data.hoby}}</p>
        <p class="card-text">{{data.address}}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    data: Object
  }
}
</script>

<style scoped>

</style>
