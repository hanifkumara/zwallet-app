<template>
  <button type="submit" class="btn">{{title}}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: String
  }
}
</script>
<style scoped>
button.btn {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
    background-color: rgba(169, 169, 169, 0.6);
    border-radius: 8px
}
button.primary{
    background: rgb(124, 124, 255);
    color: white;
  }
</style>
