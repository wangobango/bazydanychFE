<template>
    <div class="container">
        <div class="row">
            <sidebar-menu :menu="menu" />    
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters , mapSetters} from "vuex";
import {store} from '../store';
import axios from 'axios'
export default {
    name: "FormPage",
    components:{axios},
    data(){
        return{
            menu: [
                {
                    header: true,
                    title: 'Select Form',
                },
                {
                    href: '/search',
                    title: 'Products',
                    icon: 'fa fa-user'
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
            ]
        }
    }
    
}
</script>
<style>
.v-sidebar-menu{
    top: unset !important;
    bottom: unset !important;
}
</style>

