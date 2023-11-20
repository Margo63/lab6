<template>
  <form>
    <select v-model="selected">
      <option disabled value="">Выберите один из вариантов</option>
      <option v-for="item in info" v-bind:key = "item.id" :value="item.id">{{item.name}}</option>
    </select><br>
    <button v-on:click="loginClick">Login</button>
  </form>
</template>

<script>

import axios from 'axios'
//import router from "@/router.js";
export default {
  name: "Login",

  data() {
    return {
      info: null,
      selected: undefined
    };
  },
  created(){

    axios
        .get('http://localhost:8080/getAllBrokers')
        .then(response => (this.info = response.data))
        .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });

  },
  methods:{
    loginClick(){
      if(!this.selected)
        return;


      window.location.href = "http://localhost:4000/#/about/"+this.selected;
      //router.
      //router.push("/about/"+this.selected)
      //alert(window.location)
    }
  }
}


</script>

<style scoped>
    select{
      font-size: 20px;
    }

    button{
      font-size: 20px;

      margin-top:19px;
      padding: 10px;
      border-radius: 10px;
      background-color: #FF4B3A;
      color: white;
    }
</style>