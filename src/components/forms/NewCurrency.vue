<template>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <sidebar-menu :menu="menu" />    
            </div>
            <div class="col-lg-6 form-column">
                <form>
                    <div class="form-group">
                        <label >Currency Name</label>
                        <input v-model="name" type="text" class="form-control" placeholder="Type currency name">
                    </div>
                     <div class="form-group">
                        <label >Code</label>
                        <input v-model="code" type="text" class="form-control" placeholder="Type currency code">
                    </div>
                     <div class="form-group">
                        <label >Exchange Rate</label>
                        <input v-model="exchangeRate" type="number" class="form-control" placeholder="Type currency exchange rate">
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
    name: "NewCurrency",
    components:{axios},
    data(){
        return{
            name:'',
            code:'',
            exchangeRate:0            
        }
    },
    methods:{
        submitCategory(){
            let body = {
                name : this.name,
                code: this.code,
                exchange_rate: this.exchangeRate
            }

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }
            console.log(body);
            axios.post("http://localhost:8080/currencies/add",body,config)
            .then(data => {
                if(data){
                    this.$notify({
                        group: 'foo',
                        title: 'Created Currency!',
                        text: 'Currency succesfully created!',
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

