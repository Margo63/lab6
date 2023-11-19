<template>
  <div>
    <!--    <div>params={{ $route.params }}</div>-->
    <!--    <div>query={{ $route.query }}</div>-->
    <!--    <div>path={{ $route.path }}</div>-->
    <!--    <div>id={{ $route.params.id }}</div>-->
    <div v-if="broker">Broker:{{ broker.name }}</div>
    <div v-if="broker">Balance:{{ balance }}</div>
    <div>Date:{{ date }}</div>
    <div>Start:{{ startDate }}</div>
    <h3>Users stocks</h3>
    <div v-if="broker&&stocks">
      <div v-for="user_stock in userStocks" v-bind:key="user_stock.id">
        Stock: {{ user_stock.id }}<br>
        Amount: {{ user_stock.amount }}<br>
        Sum: {{ user_stock.sum }}<br>
        Разница: {{ user_stock.sum - getPriceByStockId(user_stock.id, currentIndex) * user_stock.amount }}<br><br><br>
      </div>
    </div>

    <h3>Stocks</h3>

    <div v-for="stock in stocks" v-bind:key="stock.id">
      <div v-if="listTrading.includes(stock.id)">
        {{ stock.name }}
        {{ stock.data[currentIndex].Open }}
        <button v-on:click="buyStock(stock.data[currentIndex].Open, stock.id)">Buy</button>
        <button v-on:click="sellStock(stock.data[currentIndex].Open, stock.id)">Sell</button>
        <button v-on:click="drawGraph(currentIndex)">Graph</button>
        <v-dialog v-model="showDialog" width="500" height="500">
          <v-card>
            <Line
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            />
          </v-card>

        </v-dialog>


      </div>

    </div>
    <button v-on:click="goToAdmin">Admin module</button>
  </div>
</template>
<script>
import axios from "axios";
import {mapState} from "vuex";
import {Line} from 'vue-chartjs'
//import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale} from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: "About",
  components: {Line},
  data() {
    return {
      // listTrading: [],
      // date: null,
      showDialog: false,
      stocks: null,
      broker: null,
      chartOptionsBar: {
        xAxis: {
          data: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: [63, 75, 24, 92]
          }
        ]
      },
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [{data: [40, 20, 12]}]
      },
      chartOptions: {
        responsive: true
      }
    };
  },
  methods: {
    goToAdmin() {
      window.location.href = "http://localhost:4000/#/admin";
    },
    buyStock(price, id) {
      // console.log(this.balance)
      console.log(parseFloat(this.balance - price.slice(1)))
      if (parseFloat(this.balance - price.slice(1)) > 0) {
        console.log("hehehe")

        axios
            .put('http://localhost:8080/changeBroker/' + this.$route.params.id,
                {
                  balance: parseFloat(this.balance - price.slice(1)),
                  newStock: {"id": id, "price": parseFloat(price.slice(1)), "operation": "buy"}
                })
            .then(response => (
                console.log(response.data),
                    this.$store.commit("setBalance", parseFloat(this.balance - price.slice(1))),
                    this.$store.commit("setUserStocks", JSON.parse(response.data.currentBroker).stocks)
            ))
            .catch(error => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
      }

    },
    sellStock(price, id) {

      const index = this.$store.state.userStocks.map((g) => {
        return g.id;
      }).indexOf(id);


      if (index !== -1) {
        //console.log("hehehe")

        axios
            .put('http://localhost:8080/changeBroker/' + this.$route.params.id,
                {
                  balance: parseFloat(this.balance + parseFloat(price.slice(1))),
                  newStock: {"id": id, "price": parseFloat(price.slice(1)), "operation": "sell"}
                })
            .then(response => (
                console.log(response.data),
                    this.$store.commit("setBalance", parseFloat(this.balance + parseFloat(price.slice(1)))),
                    this.$store.commit("setUserStocks", JSON.parse(response.data.currentBroker).stocks)
            ))
            .catch(error => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
      }

    },
    getPriceByStockId(id, curInd) {

      const index = this.stocks.map((g) => {
        return g.id;
      }).indexOf(id);
      //console.log(curInd)
      return parseFloat(this.stocks[index].data[curInd].Open.slice(1))
    },
    drawGraph(curInd) {
      console.log(curInd)
      this.showDialog = true
    }
  },
  mounted() {
    this.$socket.on("trading", (data) => {
      //console.log(data);
      this.$store.commit("change", this.stocks[0].data[data].Date)
      this.$store.commit("changeIndex", data)
    })
    this.$socket.on("data", (data) => {
      this.$store.commit("setListTrading", data.list)
      this.$store.commit("setStartDate", data.data)
      //console.log(this.$store.listTrading)
    })
  },
  created() {
    axios
        .get('http://localhost:8080/getStock')
        .then(response => (
            this.stocks = response.data
        ))
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    axios
        .get('http://localhost:8080/getBroker?id=' + this.$route.params.id)
        .then(response => (
            this.broker = response.data,
                this.$store.commit("setBalance", this.broker.balance),
                this.$store.commit("setUserStocks", this.broker.stocks)
            //console.log(response.data)
        ))
        .catch(error => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
  },
  computed: {
    power2() { // Вычисляемой свойство
      return this.$store.getters.getData()
    },
    ...mapState(["date"]),
    ...mapState(["listTrading"]),
    ...mapState(["currentIndex"]),
    ...mapState(["balance"]),
    ...mapState(["startDate"]),
    ...mapState(["userStocks"])
  }

}
</script>