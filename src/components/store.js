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
                href: '/',
                title: 'Products',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/product/new',
                        title: 'New',
                    },
                    {
                        href: '/product/delete',
                        title: 'Delete',
                    },
                ]
            },
            {
                href: '/',
                title: 'Categories',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/category/new',
                        title: 'New',
                    },
                    {
                        href: '/category/delete',
                        title: 'Delete',
                    },
                ]
            },
            {
                href: '/',
                title: 'Producents',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/producent/new',
                        title: 'New',
                    },
                    {
                        href: '/producent/delete',
                        title: 'Delete',
                    },
                ]
            },
            {
                href: '/',
                title: 'Currencies',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/currency/new',
                        title: 'New',
                    },
                    {
                        href: '/curreny/delete',
                        title: 'Delete',
                    },
                ]
            },
            {
                href: '/',
                title: 'Users',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/user/new',
                        title: 'New',
                    },
                    {
                        href: '/user/delete',
                        title: 'Delete',
                    },
                ]
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
            return state.menu;
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