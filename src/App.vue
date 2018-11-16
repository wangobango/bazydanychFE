<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style lang="scss" scoped>
  @import 'assets/styles/main.scss';
</style>
