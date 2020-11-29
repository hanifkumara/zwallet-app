<template>
  <div class="content">
      {{id}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data: function () {
    return {
      id: this.$route.params.idUser
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
