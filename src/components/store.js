import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        user:{
            authorizedUser:false,
            token: "",   
        },
    },
    getters:{
        getState: state=>{
            return state;
        },
        getToken: state=>{
            return state.token;
        },
        getAuthorizedUser: state=>{
            return state.authorizedUser;
        }
    },
    mutations:{
        setUserAuthorized(state){
            state.user.authorizedUser = True;
        },
        setToken(state,token){
            state.user.token = token;
        }

    },
    plugins: [new VuexPersistence().plugin]

});