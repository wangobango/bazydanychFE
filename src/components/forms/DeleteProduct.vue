<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <sidebar-menu :menu="menu" />    
            </div>
            <div class="col-lg-6 form-column">
                <form>
                    <div class="form-group">
                        <label >Select Product to be deleted</label>
                        <select class="form-control" id="select-form" @click="getSelected">
                            <option v-model="selectedProd" v-for="cat in products">{{cat.name}}</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary" @click="deleteProduct()" >Delete</button>
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
    name: "DeleteProduct",
    components:{axios},
    data(){
        return{
            products:[],
            selectedProd:''
        }
    },
    methods:{
        getSelected(){
            let a = document.getElementById("select-form");
            this.selectedProd = a.options[a.selectedIndex].text;
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
        deleteProduct(){
            let config = {
                headers: {
                'Authorization': 'Bearer ' + this.token,
                'Access-Control-Allow-Origin' : '*' ,
                }
            }

            let id = this.getId(this.selectedProd,this.products)

            axios.delete("http://localhost:8080/products/deactivate/"+String(id),config)
            .catch(error => {
                this.$notify({
                    group: 'foo',
                    title: 'Product is in use!',
                    text: '',
                    type: 'error',
                });
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

