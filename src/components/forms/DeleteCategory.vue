<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <sidebar-menu :menu="menu" />    
            </div>
            <div class="col-lg-6 form-column">
                <form>
                    <div class="form-group">
                        <label >Select Category to be deleted</label>
                        <select class="form-control" id="select-form" @click="getSelected">
                            <option v-model="selectedCat" v-for="cat in categories">{{cat.name}}</option>
                        </select>
                    </div>
                    <button type="button" class="btn btn-primary" @click="deleteCategory()" >Delete</button>
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
            categories:[],
            selectedCat:''
        }
    },
    methods:{
        getSelected(){
            let a = document.getElementById("select-form");
            this.selectedCat = a.options[a.selectedIndex].text;
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
        deleteCategory(){
            let config = {
                headers: {
                'Authorization': 'Bearer ' + this.token,
                'Access-Control-Allow-Origin' : '*' ,
                }
            }

            let id = this.getId(this.selectedCat,this.categories)

            console.log(id)

            axios.delete("http://localhost:8080/categories/delete/"+String(id),config)
            .catch(error => {
                this.$notify({
                    group: 'foo',
                    title: 'Category is in use!',
                    text: 'Please correct your data!',
                    type: 'error',
                });
            })

            // this.$router.go();

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

    axios.get("http://localhost:8080/categories/all",config)
    .then(data => this.categories = data.data)
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

