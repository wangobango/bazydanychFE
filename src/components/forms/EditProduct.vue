<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <sidebar-menu :menu="menu" />    
            </div>
            <div class="col-lg-8">
                <div class="col-lg-10 form-column">
                            <label >Select Product</label>
                            <select class="form-control" id="select-product-form" @click="selectProduct" v-model="selectedProd">
                                <option  v-for="cat in products">{{cat.name}}</option>
                            </select>
                </div>
                <div class="col-lg-10 form-column">
                    <form v-if="selected">
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
                            <select v-model="status" class="form-control">
                                <option >1</option>
                                <option >0</option>
                            </select>
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
            status:1,
            unit:'',
            stock:'',
            price:'',
            desc:'',
            producent:'',
            selected:false,
            products:[],
            selectedProd:'',
            id:''
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
        selectProduct(){
            let product = this.getProd(this.selectedProd,this.products);
            this.id = product.id;
            this.selected = true;
            this.name = product.name;
            this.status = product.status;
            this.unit = product.unit;
            this.stock = product.stock;
            this.price = product.price;
            this.desc = product.desc;
            this.producent = product.producent;
            this.selectedCat = product.category.name;
            this.selectedPlat = product.platform.name;
            this.selectedCurr = product.currency.name;
            console.log(this.buildProduct());
            
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
        getProd(name,arr){
            let prod = {}
            arr.forEach( item => {
                if(item.name == name){
                    prod = item;
                }
            })
            return prod;

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
                id: this.id,
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
            return product;
        },
        submitProduct(){
            let body = this.buildProduct();
            console.log(this.products);

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }
            console.log(body);
            axios.post("http://localhost:8080/products/edit",body,config)
            .then(data => {
                if(data){
                    this.$notify({
                        group: 'foo',
                        title: 'Created Product!',
                        text: 'Product succesfully updated!',
                        type: 'succes',
                    })
                }
            })
            .catch(error => {
                this.$notify({
                    group: 'foo',
                    title: 'There was an error!',
                    type: 'error',
                })
            })
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
          'Authorization': 'Bearer ' + this.token,
          'Access-Control-Allow-Origin' : '*' ,
        }
    }

    axios.get("http://localhost:8080/products/active",config)
    .then(data => this.products = data.data)
    .catch(error => console.error(error));

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

