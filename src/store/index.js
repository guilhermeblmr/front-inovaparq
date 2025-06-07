import { createStore } from 'vuex'
import axios from 'axios'

const storedUser = localStorage.getItem('user')
const initialUser = storedUser ? JSON.parse(storedUser) : null

export default createStore({
    state: {
        user: initialUser,
        returnUrl: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setReturnUrl(state, url) {
            state.returnUrl = url
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            const response = await axios.post('/login', { email, password })
            const user = response.data.user

            commit('setUser', user)
            localStorage.setItem('user', JSON.stringify(user))
        },
        logout({ commit }) {
            commit('setUser', null)
            localStorage.removeItem('user')
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user
        },
        currentUser(state) {
            return state.user
        }
    }
})
