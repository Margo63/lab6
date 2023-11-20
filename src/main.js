import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from "moment";
import io from "socket.io-client";
//import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';
import store from "./store"
import Echarts from 'vue-echarts';
//import "@/plugins/echarts";
import 'echarts/lib/chart/bar';


export const SocketInstance = io('http://localhost:8080/');
const app = createApp(App).use(router,VueSocketIO, SocketInstance).use(store).component('chart', Echarts)
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$socket = SocketInstance;
app.mount('#app');