import { computed, inject, reactive } from 'vue';

const STORE_KEY = '__store__'
function useStore() {
    return inject(STORE_KEY)
}
function createStore(options) {
    return new Store(options);
}
class Store {
    constructor(options) {
        this._state = reactive({
            data: options.state()
        });
        this._getters = {}
        for(const [key, value] of Object.entries(options.getters)) {
            this._getters[key] = computed(() => value(this.state))
        }
        this._mutations = options.mutations;
        this._actions = options.actions
    }
    get state() {
        return this._state.data
    }
    get getters() {
        return this._getters
    }
    install(app) {
        app.provide(STORE_KEY, this);
    }
    commit(name, data) {
        console.log(this)
        const mutation = this._mutations[name]
        mutation?.(this.state, data)
    }
    dispatch(name, data) {
        const action = this._actions[name]
        this.commit = this.commit.bind(this)
        action?.call(this, this, data)
    }
}

export { useStore, createStore };
