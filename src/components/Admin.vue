<template>
  <div v-if="brokers&&stocks">
    <div v-for="item in brokers" v-bind:key = item.id class="card">
      {{item.name}}:{{item.balance}}<br>
      <hr/>
      <div v-for="stock in item.stocks" v-bind:key = stock.id class="stock">
        Name: {{stock.id}}<br>
        Amount: {{stock.amount}}<br>
        Разница: {{ (stock.sum - getPriceByStockId(stock.id, currentIndex) * stock.amount)*-1 }}
        <hr/>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
export default {
  name: "Admin",
  data() {
    return {
      info: null,
      stocks: null
    };
  },
  created(){

    axios
        .get('http://localhost:8080/getAllBrokers')
        .then(response => (this.info = response.data,this.$store.commit("setBrokers", response.data)))
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

    axios
        .get('http://localhost:8080/getStock')
        .then(response => (
            this.stocks = response.data
        ))
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  },
  methods:{
    getPriceByStockId(id, curInd) {

      const index = this.stocks.map((g) => {
        return g.id;
      }).indexOf(id);
      //console.log(curInd)
      return parseFloat(this.stocks[index].data[curInd].Open.slice(1))
    }
  },
  mounted() {
    this.$socket.on("trading",(data)=>{
      this.$store.commit("changeIndex", data)
    })
  },
  computed: {
    ...mapState(["date"]),
    ...mapState(["listTrading"]),
    ...mapState(["currentIndex"]),
    ...mapState(["balance"]),
    ...mapState(["startDate"]),
    ...mapState(["userStocks"]),
    ...mapState(["brokers"]),
  }
}
</script>

<style scoped>
  .card{
    text-align: left;
    background-color: #FF4B3A;
    margin: 10px;
    border-radius: 10px;
    color: white;
    padding: 15px;
  }
  .stock{
    margin:10px;

  }
</style>