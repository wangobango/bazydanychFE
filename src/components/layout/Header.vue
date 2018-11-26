<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon">
            </span>
        </button>
        <div class="collapse navbar-collapse">
            <router-link  :to="{name: 'SearchPage'}">
                <img class="mb-4" src="../../assets/logo_lol.png" alt="" width="80" height="auto">
            </router-link>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active" @click="$router.replace({name: 'SearchPage'})">
                    <a class="nav-link" href="#">Search Page</a>
                </li>

                <li class="nav-item active" @click="$router.replace({name: 'SearchPage'})">
                    <a class="nav-link" href="#">Basket</a>
                </li>  

                <li class="nav-item active" @click="$router.replace({name: 'SearchPage'})">
                    <a class="nav-link" href="#">Account</a>
                </li>

                <li class="nav-item active" @click="$router.replace({name: 'FormPage'})">
                    <a class="nav-link" href="#">Adding Forms</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <button class="btn btn-outline-success my-2 my-sm-0" @click="logOut">Logout</button>
            </form>
        </div>
    </nav>
</template>
<script>
export default {
    name:"Header",
    methods:{
        logOut: function(){
            this.$store.commit('logOut');  
            this.$router.replace({name: 'LogIn'});
        }
    }
};
</script>

