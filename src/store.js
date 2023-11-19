import {createStore} from 'vuex'

export default createStore({
    state() {
        return {
            date: null,
            listTrading:[],
            currentIndex: 0,
            balance:0,
            startDate: null,
            userStocks:[],
            brokers:[]

        }
    },
    mutations: {
        change(state,newDate) {

            state.date = newDate

        },
        changeIndex(state,newIndex) {
            //console.log("changeeeee")
            state.currentIndex = newIndex
        },
        setBalance(state,newBalance) {
            //console.log("changeeeee")
            state.balance = newBalance
        },
        setStartDate(state,newDate) {
            //console.log("changeeeee")
            state.startDate = newDate
        },
        setUserStocks(state,newStocks) {
            //console.log("changeeeee")
            state.userStocks = newStocks
        },
        setListTrading(state, list){
            //console.log("change")
            state.listTrading = list
        },
        setBrokers(state,newBrokers){
            state.brokers = newBrokers
        }
    },
    getters: { // Вычисление значения
        getData(state) {
            return state.date
        },
        getIndex(state){
            return state.currentIndex
        }
        // С параметром
        // pow: (state) => (p) => {
        //     return Math.pow(state.count, p)
        // }
    }
})