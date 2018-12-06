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
        <div class="col-lg-12 col-lg-offset-4">
            <v-select v-model="selected" :options="categories" placeholder="Select Category" ></v-select>
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
                <tbody v-for="item in filterSearch(this.list)" :key="item.id">
                    <tr v-if="item.name.includes(searchVal)">
                        <td>{{item.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.stock}}</td>
                        <td :id="item.id">
                            <button @click="addToBasket(item.id)">
                                <img class="basket-icon" src="../../assets/basket.png" height="30" width="30">
                            </button>
                        </td>
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
import axios from 'axios';
import vSelect from 'vue-select'

export default {
  name: "SearchPage",
  components:{
    axios,
    vSelect
  },
  data() {
    return {
      list:[],
      searchVal:'',
      categories:[],
      selected:'',
      selectedItem:'',
    };
  },
  methods:{
      logOut: function(){
        this.$store.commit('logOut');  
      },
      filterCategories(list){
          this.categories = list.map(a => a.name)
      },
      filterSearch(list){
          if(this.selected){
              return list.filter(item => item.category.name.includes(this.selected));
          }
          else return list;
      },
      addToBasket(item){
        let config = {
            headers: {
            'Authorization': 'Bearer ' + this.token,
            'Access-Control-Allow-Origin' : '*' ,
            }
        }

        let body = {
            'quantity':'1',
        };

        axios.get("http://localhost:8080/customers/get/user/"+String(this.id),config)
        .then(data => {
            this.$store.commit('setCustomerId',data.data.id);
            axios.post("http://localhost:8080/basket/add/customer/"+String(data.data.id)+"/product/"+String(item),body,config)
            .then( data => {
                if(data){
                    this.$notify({
                    group: 'foo',
                    title: 'Added to your basket!',
                    text: 'Product succesfully added to your basket!',
                    type: 'succes',
                })
                }
            })
            .catch(error => {
                this.$notify({
                    group: 'foo',
                    title: 'Product already in basket!',
                    text: 'The product you selected is already in your',
                    type: 'warn',
                })
            })
        })
        .catch(error => {
            console.error(error)
            })


      }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      auth: state => state.user.authorizedUser,
      id: state => state.user.userid,
    }),
    filteredItems() {
      return this.list.filter(item => {
         return item.name.includes(this.searchVal);
      })
    }
 
  },
    beforeMount(){
        if (this.$store.state.user.authorizedUser=='False') {
            this.$router.replace({name: 'LogIn'});
        }

        let config = {
            headers: {
            'Authorization': 'Bearer ' + this.token,
            'Access-Control-Allow-Origin' : '*' ,
            }
        }


        axios.get("http://localhost:8080/products/active",config)
        .then(data => this.list = data.data)
        .catch(error => console.error(error));

        axios.get("http://localhost:8080/categories/all",config)
        .then(data => this.filterCategories(data.data))
        .catch(error => console.error(error))
        
  }
   
};
</script>
