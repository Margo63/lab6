<template>
  <div id="nav">
    <router-link to="/home">Home</router-link>
    |
    <router-link to="/about/45">About</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: "User"
}
</script>

<style scoped>

</style>