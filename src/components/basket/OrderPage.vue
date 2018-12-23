<template>
    <div>
    <b-table @click="showDetails(props.row)" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="orders"
             :fields="fields">
             <template slot="show_details" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails" @click="loadData(row)" class="mr-2">
                 {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Products:</b></b-col>
                        <b-col>{{rowId = row.item.id}}
                            <b-list-group v-for="item in products[row.item.id-1]">
                                <b-list-group-item class="order-list-item" active>{{item.name}}</b-list-group-item>
                            </b-list-group>
                        </b-col>
                        </b-row>
                            <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right"><b>Creation Date:</b></b-col>
                            <b-col>{{ row.item.creationDate.slice(0,10) }}</b-col>
                        </b-row>
                    </b-card>
                </template>
                </b-table>
            </div>
            </template>
<script>
import { mapState, mapGetters , mapSetters} from "vuex";
import {store} from '../store';
import axios from 'axios';
import vSelect from 'vue-select'

export default {
    components:{
        axios,vSelect
    },
    data () {
    return {
      sortBy: 'age',
      sortDesc: false,
      fields: [
        { key: 'id', sortable: true },
        { key: 'transportType', sortable: true },
        { key: 'paymentType', sortable: true },
        { key: 'status', sortable: true },
        { key: 'show_details', sortable: false}
      ],
      orders:[],
      products:[],
      rowId:0
    }
  },
  computed:{
        ...mapState({
            token: state => state.user.token,
            auth: state => state.user.authorizedUser,
            id: state => state.user.userid,
            customerid: state => state.user.customerid
        }),
    },
    methods:{
        showDetails(items){
            console.log("Emil")
        }, 
        loadData(row){
            if(row.detailsShowing == false) {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                        'Access-Control-Allow-Origin' : '*' ,
                    }
                }
                axios.get("http://localhost:8080/orders/get/" + String(row.item.id) + "/products",config)
                .then(data => {this.products.push(data.data)})
                .catch(error => console.error(error))
            } else {
                this.products = [];
            }
        },
        loadProducts(orderId){
            let dataProd = []
            let config = {
                    headers: {
                        'Authorization': 'Bearer ' + this.token,
                        'Access-Control-Allow-Origin' : '*' ,
                    }
                }
                axios.get("http://localhost:8080/orders/get/" + String(orderId) + "/products",config)
                .then(data => {dataProd = data.data})
                .catch(error => console.error(error))

                return dataProd;
        }
            
    },
    beforeMount(){
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Access-Control-Allow-Origin' : '*' ,
            }
        }

        axios.get("http://localhost:8080/orders/get/customer/"+String(this.customerid),config)
        .then(data => {
            this.orders = data.data;
            // data.data.forEach(element => {
            //     this.products.push(this.loadProducts(element.id));
            // });
        })
        .catch(error => console.error(error))
        





    }
    
}
</script>
<style>
.order-list-item.active{
    margin: 10px;
}
</style>

