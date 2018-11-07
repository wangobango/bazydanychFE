<template>
    <div>
        {{user}}
    </div>
</template>
<script>
export default {

    computed:{
        user(){
            return this.$store.state.user.token;
        },
    }
//Tak samo , następny task :P
//  beforeMount:{
//      if (!this.$store.state.user.authorizedUser) {
//         this.$router.replace({name: 'mainPage'});
//       }
//     }
}
</script>
