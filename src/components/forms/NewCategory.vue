<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <sidebar-menu :menu="menu" />    
            </div>
            <div class="col-lg-6 form-column">
                <form>
                    <div class="form-group">
                        <label >Category Name</label>
                        <input v-model="name" type="text" class="form-control" placeholder="Type category name">
                    </div>
                     <div class="form-group">
                        <label >Description</label>
                        <textarea v-model="description" class="form-control" rows="3"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary" @click="submitCategory()" >Submit</button>
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
    name: "NewCategory",
    components:{axios},
    data(){
        return{
            name:'',
            description:''            
        }
    },
    methods:{
        submitCategory(){
            let body = {
                name : this.name,
                description : this.description,
            }

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }
            console.log(body);
            axios.post("http://localhost:8080/categories/add",body,config);
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

