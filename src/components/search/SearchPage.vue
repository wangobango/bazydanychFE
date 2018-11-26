<template>
    <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="page-header" @click="logOut">
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
            <input type="search" id="search" v-model="searchVal" class="form-control" placeholder="Search Products" >
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
                <tbody v-for="item in this.list" :key="item.id">
                    <tr v-if="item.name.includes(searchVal)">
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
      list:[],
      searchVal:'',
      categories:[]
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
    }),
    filteredItems() {
      return this.list.filter(item => {
         return item.name.includes(this.searchVal);
      })
    }
 
  },
   async beforeMount(){
    if (await this.$store.state.user.authorizedUser=='False') {
        this.$router.replace({name: 'LogIn'});
    }

    let config = {
        headers: {
          'Authorization': 'Bearer ' + this.token,
          'Access-Control-Allow-Origin' : '*' ,
        }
    }

    axios.get("http://localhost:8080/products/all",config)
    .then(data => this.list = data.data)
    .catch(error => console.error(error));

    
  }
   
};
</script>