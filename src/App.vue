<template>
  <div id="app">
    <notifications group="foo" />
    <Header  v-if="this.$route.name!='LogIn'" />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components:{
    Header
  },
  beforeMount(){
    if(!this.$store.state.user.authorizedUser == 'True'){
      this.$router.replace({name: 'LogIn'});
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'assets/styles/main.scss';
</style>
