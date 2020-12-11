<template>
  <div class="box-pin">
    {{ pin }}
      <input type="text" v-model="pin" maxlength="1">
      <input type="text" v-model="pin" maxlength="1">
      <input type="text" v-model="pin" maxlength="1">
      <input type="text" v-model="pin" maxlength="1">
      <input type="text" v-model="pin" maxlength="1">
      <input type="text" v-model="pin" maxlength="1">
  </div>
</template>

<script>
export default {
  name: 'Pin',
  data: () => {
    return {
      pin: ''
    }
  }
}
</script>

<style scoped>
.box-pin {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;
}
.box-pin>input {
  text-align: center;
  font-size: 25px;
  width: 15%;
  height: 90px;
  border-radius: 10px;
  border: .5px solid rgba(169, 169, 169, 0.6);
}
.box-pin>input:focus{
  outline: none
}
</style>
