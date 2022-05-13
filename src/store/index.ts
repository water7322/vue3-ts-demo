import { createStore } from 'vuex';
// import { createStore } from './gvuex';
import User from './module/User';
const store = createStore({
    modules: {
        user: User
    },
    state: () => ({
        count: 0,
        count2: 0,
        count3: 0
    }),
    getters: {
        doubleCount(state) {
            return state.count * 2;
        }
    },
    mutations: {
        increment(state, obj) {
            state.count += obj.a;
        }
    },
    actions: {
        asyncAdd({commit}, obj) {
            console.log(this)
            setTimeout(() => {
                commit('increment', obj)
            }, 2000)
        }
    }
});

export default store;
