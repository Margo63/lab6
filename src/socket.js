// import { reactive } from "vue";
// import { io } from "socket.io-client";
//
// export const state = reactive({
//     connected: false,
//     fooEvents: [],
//     barEvents: []
// });
//
// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
//
// export const socket = io(URL);
//
// socket.on("connect", () => {
//     state.connected = true;
// });
//
// socket.on("disconnect", () => {
//     state.connected = false;
// });
//
// socket.on("foo", (...args) => {
//     state.fooEvents.push(args);
// });
//
// socket.on("bar", (...args) => {
//     state.barEvents.push(args);
// });






//
// import Vue from 'vue'
// //import store from './store'
// import App from './App.vue'
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'
//
// const options = { path: '/my-app/' }; //Options object to pass into SocketIO
//
// Vue.use(new VueSocketIO({
//         debug: true,
//         connection: SocketIO('http://localhost:3000', options), //options object is Optional
//         // vuex: {
//         //     store,
//         //     actionPrefix: "SOCKET_",
//         //     mutationPrefix: "SOCKET_"
//         // }
//     })
// );
//
// new Vue({
//     //router,
//     //store,
//     render: h => h(App)
// }).$mount('#app')