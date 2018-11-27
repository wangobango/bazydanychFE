import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        user:{
            authorizedUser:'True',
            token: "",   
        },
        menu:[
            {
                header: true,
                title: 'Select Form',
            },
            {
                href: '/search',
                title: 'Products',
                icon: 'fa fa-user',
                child: [
                        {
                            href: '/product/new',
                            title: 'New',
                        },
                        {
                            href: '/',
                            title: 'Edit',
                        },
                        {
                            href: '/',
                            title: 'Delete',
                        },
                    ]
            },
            {
                href: '/',
                title: 'Categories',
                icon: 'fa fa-chart-area'
            },
            {
                href: '/',
                title: 'Locations',
                icon: 'fa fa-chart-area'
            },
            {
                href: '/',
                title: 'Producents',
                icon: 'fa fa-chart-area'
            },
            {
                href: '/',
                title: 'Users',
                icon: 'fa fa-chart-area'
            },
            {
                href: '/',
                title: 'Currencies',
                icon: 'fa fa-chart-area'
            },
        ]
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
        },
        getMenu: state=>{
            return stat.menu;
        }
    },
    mutations:{
        setUserAuthorized(state){
            state.user.authorizedUser = 'True';
        },
        setToken(state,token){
            state.user.token = token;
        },
        logOut(state){
            state.user.authorizedUser = 'False';
            state.user.token = '';
        }

    },
    plugins: [new VuexPersistence().plugin]

});