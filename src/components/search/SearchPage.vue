<template>
    <!-- <div @click="logOut">
        {{auth}}
    </div> -->
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-header">
                <h1>Search Page</h1>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <h3>Available Products</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 col-lg-offset-4">
            <input type="search" id="search" value="" class="form-control" placeholder="Search Products">
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <table class="table" id="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody v-for="item in items">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.stock}}</td>
                    </tr>
                </tbody>
            </table>
            <hr>
        </div>
    </div>
</div>
</template>
<script>
import { mapState, mapGetters , mapSetters} from "vuex";
import {store} from '../store';
import axios from 'axios'

export default {
  name: "SearchPage",
  components:{
    axios
  },
  data() {
    return {
      items:[
          {name:"Dupa",price:"20 zł",stock:30},
          {name:"Dupa",price:"20 zł",stock:30},
          {name:"Dupa",price:"20 zł",stock:30},
      ]
    };
  },
  methods:{
      logOut: function(){
        this.$store.commit('logOut');  
      }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      auth: state => state.user.authorizedUser
    })
  },
  beforeMount(){
    if (this.$store.state.user.authorizedUser=='False') {
        this.$router.replace({name: 'LogIn'});
    }
  }
  
   
};
</script>