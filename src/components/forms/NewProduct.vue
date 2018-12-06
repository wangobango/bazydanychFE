<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <sidebar-menu :menu="menu" />    
            </div>
            <div class="col-lg-6 form-column">
                <form>
                    <div class="form-group">
                        <label >Product Name</label>
                        <input v-model="name" type="text" class="form-control" placeholder="Type product name">
                    </div>
                    <div class="form-group">
                        <label >Unit Name</label>
                        <input v-model="unit" type="text" class="form-control" placeholder="Type unit name">
                    </div>
                    <div class="form-group">
                        <label >Producent Name</label>
                        <input v-model="producent" type="text" class="form-control" placeholder="Type producent name">
                    </div>
                    <div class="form-group">
                        <label >Stock Value</label>
                        <input v-model="stock" type="text" class="form-control" placeholder="Type stock value">
                    </div>
                    <div class="form-group">
                        <label >Status Value</label>
                        <input v-model="status" type="text" class="form-control" placeholder="Type status value">
                    </div>
                    <div class="form-group">
                        <label >Type Price</label>
                        <input v-model="price" type="text" class="form-control" placeholder="Type price value">
                    </div>
                    <div class="form-group">
                        <label >Select Category</label>
                        <select class="form-control" id="select-form" @click="getSelected">
                            <option v-model="selectedCat" v-for="cat in categories">{{cat.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Select Platform</label>
                        <select class="form-control" id="select-form-plat" @click="getSelectedPlat">
                            <option v-model="selectedPlat" v-for="cat in platforms">{{cat.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Select Currency</label>
                        <select class="form-control" id="select-form-curr" @click="getSelectedCurr">
                            <option v-model="selectedCurr" v-for="cat in currencies">{{cat.name}}</option>
                        </select>
                    </div>
                     <div class="form-group">
                        <label >Description</label>
                        <textarea v-model="desc" class="form-control" rows="3"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary" @click="submitProduct()" >Submit</button>
                </form>
            </div>   
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
            categories:[],
            platforms:[],
            currencies:[],
            selectedCat:'',
            selectedPlat:'',
            selectedCurr:'',
            status:'',
            name:'',
            status:'',
            unit:'',
            stock:'',
            price:'',
            desc:'',
            producent:''
        }
    },
    methods:{
        getSelected(){
            let a = document.getElementById("select-form");
            this.selectedCat = a.options[a.selectedIndex].text;
        },
        getSelectedPlat(){
            let a = document.getElementById("select-form-plat");
            this.selectedPlat = a.options[a.selectedIndex].text;
        },
        getSelectedCurr(){
            let a = document.getElementById("select-form-curr");
            this.selectedCurr = a.options[a.selectedIndex].text;
        },
        getId(name,arr){
            let id = 0;
            arr.forEach( item => {
                if(item.name == name){
                    id = item.id;
                }
            })
            return id;
        },
        getObject(name,arr){
            let obj = 0;
            arr.forEach( item => {
                if(item.name == name){
                    obj = item;
                }
            })
            return obj;
        },
        buildProduct(event){
            // event.preventDefault();
            let product = {
                name : this.name,
                unit : this.unit,
                producent : this.producent,
                stock : Number(this.stock),
                status : this.status,
                price : Number(this.price),
                description : this.desc,
                currency_id : this.getId(this.selectedCurr,this.currencies),
                platform_id : this.getId(this.selectedPlat,this.platforms),
                category_id : this.getId(this.selectedCat,this.categories),
            }
            console.log(product);
            return product;
        },
        submitProduct(){
            let body = this.buildProduct();

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }
            console.log(body);
            axios.post("http://localhost:8080/products/add",body,config);
        }
    },
    computed: {
    ...mapState({
      menu: state => state.menu,
      token: state => state.user.token,
    }),
  },
  beforeMount(){
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.token.token,
          'Access-Control-Allow-Origin' : '*' ,
        }
    }

    axios.get("http://localhost:8080/categories/all",config)
    .then(data => this.categories = data.data)
    .catch(error => console.error(error))

    axios.get("http://localhost:8080/currencies/all",config)
    .then(data => this.currencies = data.data)
    .catch(error => console.error(error))

    axios.get("http://localhost:8080/platforms/all",config)
    .then(data => this.platforms = data.data)
    .catch(error => console.error(error))
  }
    
}
</script>
<style>
.v-sidebar-menu{
    top: unset !important;
    bottom: unset !important;
}

.form-column{
    left:10%;
    padding-top: 2%;
    padding-bottom: 10px;
    bottom: 10%;
}
</style>

