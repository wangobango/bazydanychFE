<template>
    <div class="container">
        <div class="row">
            <sidebar-menu :menu="menu"/>    
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
                    href: '/',
                    title: 'Dashboard',
                    icon: 'fa fa-user'
                },
                {
                    href: '#',
                    title: 'Charts',
                    icon: 'fa fa-chart-area'
                },
            ]
        }
    }
    
}
</script>
