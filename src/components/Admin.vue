<template>
<div v-for="item in info" v-bind:key = item.id>
  {{item.name}}
  <div v-for="stock in item.stocks" v-bind:key=stock.id>
    {{stock}}
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  data() {
    return {
      info: null
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
    sendMessage: function (message) {
      console. log(this.connection);
      this. connection. send(message);
    }
  },
  mounted() {
    this.$socket.on("trading",(data)=>{
      console.log(data);
    })
  }
}
</script>

<style scoped>

</style>
<!--<template>-->
<!--  <button @click="connect()">Connect</button>-->
<!--  <button @click="disconnect()">Disconnect</button>-->
<!--</template>-->

<!--<script>-->
<!--//import { socket } from "@/socket";-->


<!--//import {SocketInstance} from "@/main";-->
<!--//import io from "socket.io-client";-->

<!--export default {-->
<!--  name: "Admin",-->
<!--  methods: {-->
<!--    connect() {-->
<!--      console.log(this.$socket)-->
<!--      this.$socket.on('trading',()=>{-->
<!--        console.log("trading")-->
<!--      })-->
<!--    },-->
<!--    disconnect() {-->
<!--      this.$socket.on('disconnect',()=>{-->
<!--        console.log("disconnect")-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--  console.log("created")-->
<!--    },-->
<!--  mounted() {-->
<!--    this.$socket.emit("test")-->
<!--    this.$socket.on("trading",()=>{-->
<!--      console.log("okkk")-->
<!--    })-->
<!--    // this.$socket.on("trading",(data)=>{-->
<!--    //   alert("kdjfgh")-->
<!--    //   console.log("trading"+data)-->
<!--    // })-->
<!--    // console.log("mounted")-->
<!--  }-->

<!--}-->

<!--// var socket = io.connect('http://localhost:3000');-->
<!--// socket.on('trading', function (data) {-->
<!--//   console.log(data+"heheh")-->
<!--// });-->
<!--</script>-->