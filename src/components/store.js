import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        user:{
            authorizedUser:'True',
            token: "",   
            role:"",
            userid:"",
            customerid:""
        },
        menu:[
            {
                header: true,
                title: 'Select Form',
            },
            {
                title: 'Products',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/product/new',
                        title: 'New',
                    },
                    {
                        href: '/product/edit',
                        title: 'Edit',
                    },
                    {
                        href: '/product/delete',
                        title: 'Delete',
                    },                    
                ]
            },
            {
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
                title: 'Currencies',
                icon: 'fa fa-chart-area',
                child: [
                    {
                        href: '/currency/new',
                        title: 'New',
                    },
                    {
                        href: '/currency/delete',
                        title: 'Delete',
                    },
                ]
            },
        ],
        basket:[]
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
        },
        getRole: state =>{
            return state.user.role;
        },
        getBasket: state =>{
            return state.basket;
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
            state.user.role = '';
            state.user.token = '';
        },
        setRole(state,data){
            state.user.role = data;
        },
        addToBasket(state,item){
            state.basket.push(item);
        },
        removeFromBasket(state,id){
            let index = state.basket.indexOf(id);
            if(index > 0){
                state.basket.splice(index,1);
            }
        },
        setUserId(state,id){
            state.user.userid = id;
        },
        setCustomerId(state,id){
            state.user.customerid = id;
        }


    },
    plugins: [new VuexPersistence().plugin]

});
