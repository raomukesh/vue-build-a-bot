import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    /* The state object is where we'll store all of our data.
        Everything that you're going to store in the state,
        you need to add a default property for it here in the 
        state object */
    state: {
        cart: [],
        parts: null,
    },
    /* All changes to data in a store must happen through a mutation. 
        You can't just access the store's state directly and 
        start changing data. All changes must go through a mutation. */
    mutations: {
        addRobotToCart(state, robot){   // First parameter of mutation is state.
            state.cart.push(robot);
        },
        updateParts(state, parts){
            state.parts = parts;
        },
    },
    actions: {
        getParts({ commit }) {
            axios.get('/api/parts')
                .then(result => commit('updateParts', result.data))
                .catch(console.error);
        },
        addRobotToCart({ commit, state }, robot) {
            const cart = [...state.cart, robot];
            return axios.post('/api/cart', cart)
                .then(() => commit('addRobotToCart', robot));
        },
    },
    getters: {
        cartSaleItems(state){
            return state.cart.filter(item => item.head.onSale);
        }
    },
});