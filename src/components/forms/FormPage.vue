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
    computed: {
    ...mapState({
      menu: state => state.menu,
    }),
  },
    
}
</script>
<style>
.v-sidebar-menu{
    top: unset !important;
    bottom: unset !important;
}
</style>

