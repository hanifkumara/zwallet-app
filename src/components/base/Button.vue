<template>
  <button type="submit" class="btn d-flex align-items-center justify-content-center" :disabled="loading">
    <p class="title-button">{{title}}</p>
    <template v-if="loading">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: none; display: block; shape-rendering: auto;" width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path fill="none" stroke="#1d3f72" stroke-width="5" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.67);transform-origin:50px 50px"><animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate></path></svg>
    </template>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: String,
    loading: Boolean
  }
}
</script>
<style scoped>
button.btn {
    width: 100%;
    margin-top: 20px;
    background-color: rgba(169, 169, 169, 0.6);
    border-radius: 8px
}
button.primary{
  background: rgb(124, 124, 255);
  color: white;
}
.title-button{
  margin: 0;
  padding: 8px 0;
}
</style>
