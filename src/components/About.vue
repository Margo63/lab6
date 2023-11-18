<template>
  <div>
    <div>params={{ $route.params }}</div>
    <div>query={{ $route.query }}</div>
    <div>path={{ $route.path }}</div>
    <div>id={{ $route.params.id }}</div>
  </div>
</template>
<script>
export default {
  name:"About",
  methods:{
    goToAdmin(){

    }
  }

}
</script>