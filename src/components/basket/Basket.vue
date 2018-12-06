<template>
<div class="container mb-4">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">Product</th>
                            <th scope="col">Available</th>
                            <th scope="col" class="text-center">Quantity</th>
                            <th scope="col" class="text-right">Price</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in basket.products">
                            <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                            <td>{{item.name}}</td>
                            <td v-if="item.stock>0">In stock</td>
                            <td v-else>Not available</td>                            
                            <td><input class="form-control" type="text" :id="item.id" :value="item.quantity" @change="updateQuantity(item.id,item.stock)" /></td>
                            <td class="text-right">{{item.price}} €</td>
                            <td class="text-right"><button @click="removeFromBasket(item.id)" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Sub-Total</td>
                            <td class="text-right">{{this.getPrice(basket.products)}} €</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>Total</strong></td>
                            <td class="text-right"><strong>346,90 €</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col mb-2">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <button class="btn btn-block btn-light" @click="$router.replace({name: 'SearchPage'})" >Continue Shopping</button>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                </div>
            </div>
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
    components:{
        axios
    },
    data(){
        return{
            basket:[],
            products:[]
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
        getProductbyId(id){
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }

            axios.get("http://localhost:8080/products/"+String(id),config)
            .then(data => {
                return data.data
            })
            .catch(error => console.error(error))
        },
        removeFromBasket(item){
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }

            axios.delete("http://localhost:8080/basket/delete/customer/"+String(this.customerid)+"/product/"+String(item),config)
            .catch(error => console.error(error));

            this.$router.go();
        },
        updateQuantity(id,stock){
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin' : '*' ,
                }
            }

            let quantity = document.getElementById(id).value;
            if(quantity<=stock){
                let body = {
                    "quantity":String(quantity)
                }

                axios.put("http://localhost:8080/basket/edit/customer/"+String(this.customerid)+"/product/"+String(id),body,config)
                .catch(error => console.error(error))

                this.$notify({
                    group: 'foo',
                    title: 'Product quantity increased!',
                    type: 'succes',
                })

                this.$router.go();
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Out of stock!',
                    text: 'There is not enough product in stock for this purchase!'
                });
            }
        },
        getPrice(arr){
            let sum = 0;
            for(let i =0 ; i < arr.length; i++){
                sum+=(arr[i].price*arr[i].quantity);
            }
            return sum;

        },
        getTax(){

        }
     

    },
    beforeMount(){
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Access-Control-Allow-Origin' : '*' ,
            }
        }

        axios.get("http://localhost:8080/basket/get/customer/"+String(this.customerid),config)
        .then(data => this.basket = data.data)
        .catch(error => console.error(error))

    }
    
}
</script>
