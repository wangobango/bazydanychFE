<template>
    <body class="text-center">
        <form class="form-signin">
            <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="text" id="inputLogin" class="form-control" placeholder="Login" v-model="login" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" @click="logIn">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
  </body>
</template>

<script>

import {mapState} from 'vuex';

export default {
  name: "LogInPage",
  data() {
    return {
        login:'',
        password:''
    };
  },
  computed:{
      //TODO map settings kurwo - authUser + token
  },
  methods:{
    logIn: function(){
        let user = {
            username : this.login,
            password: this.password
        };
        fetch('http://localhost:8080/public/users/login',{
                headers:{
                    "Content-Type": "application/json; charset=utf-8",
                },
                method:"POST",
                body: JSON.stringify(user),
            })
            .then((res) => res.JSON())
            .then((data) => {
                console.log(data);
                alert("DUPSKO");
                if(data>0){
                    this.$router.replace({name: 'SearchPage'});
                    alert("DUPSKO");
                }
                else{
                    alert("DUPA");
                }
            })  
            .catch(error => console.error(error))      
    }
  }
};
</script>
