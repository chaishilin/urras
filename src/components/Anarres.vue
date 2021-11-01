<template>
  <div class="Anarres">
    <h1 class="msg">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Anarres",
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
.msg {
  color: tan;
}

</style>
