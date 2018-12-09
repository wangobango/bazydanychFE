<template>
    <body class="text-center">
        <form class="form-signin" >
            <img class="mb-4" src="../../assets/logo_lol.png" alt="" width="250" height="auto">
            <h1 class="h3 mb-3 font-weight-normal" @click="current" >Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="text" id="inputLogin" class="form-control" placeholder="Login" v-model="login" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit" @click="logIn">Sign in</button>
        </form>
  </body>
</template>

<script>
import { mapState, mapGetters , mapSetters} from "vuex";
import {store} from '../store';
import axios from 'axios'

export default {
  name: "LogInPage",
  components:{
    axios
  },
  data() {
    return {
      login: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
    })
  },
  methods: {
    logIn: function(event) {
      event.preventDefault();

      let user = {
        login: this.login,
        password: this.password
      };      

      axios.post("http://localhost:8080/public/users/login",user)
      .then(data => this.authorize(data.data))
      .catch(error => {
        console.error(error)
        this.$notify({
                    group: 'foo',
                    title: 'Invalid Username or Password!',
                    text: 'Please correct your data!',
                    type: 'error',
                });
        });
      
    },

    current: function(){
      axios.get("http://localhost:8080/user/current", {
        method: 'GET',
        mode: 'cors',
        headers:{
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        }
      })
      .then(res => authorize(res))
    },
    authorize: function(data){
      if(data){
        this.$store.commit('setToken',data.token);   
        this.$store.commit('setRole',data.userRole);
        this.$store.commit('setUserId',data.userid);
        this.$store.commit('setUserAuthorized');  
        // console.log(data);
        this.$router.replace({name: 'SearchPage'});
      }
    }  
  },
};
</script>
