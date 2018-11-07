<template>
    <body class="text-center">
        <form class="form-signin">
            <img class="mb-4" src="../../assets/logo_lol.png" alt="" width="250" height="auto">
            <h1 class="h3 mb-3 font-weight-normal" >Please sign in</h1>
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

export default {
  name: "LogInPage",
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
    logIn:async function() {
      let user = {
        login: this.login,
        password: this.password
      };      
      await fetch("http://localhost:8080/public/users/login", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        },
        method: "POST",
        body: JSON.stringify(user),
        mode: "cors",
      })
      .then(res => res.json())
      .then(data => {
        authorize(data.token);
        //TODO do następnego taska tho, ten już do zamknięcia
        // this.$router.replace({ name: "SearchPage" });
      })
    },
    authorize: function(data){
      this.$store.commit('setToken',data);     
    }  
  },
};
</script>
