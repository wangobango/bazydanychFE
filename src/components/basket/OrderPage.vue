<template>
    <div>
    <b-table @click="showDetails(props.row)" :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="orders"
             :fields="fields">
             <template slot="show_details" slot-scope="row">
                <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
                 {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Products:</b></b-col>
                        <b-col>{{ row.item.productIds }}</b-col>
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
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ],
      orders:[]
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
            console.log(items)
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
        .then(data => this.orders = data.data)
        .catch(error => console.error(error))


    }
    
}
</script>
