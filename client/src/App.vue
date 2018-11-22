<template>
<!-- <div id="app"> -->
  <v-app>
<v-toolbar>
  <v-icon @click="router_push('HelloWorld')">restaurant_menu</v-icon>
  <v-spacer></v-spacer>
  <v-icon @click="router_push('Cart')">shopping_cart</v-icon> 
  <v-spacer></v-spacer>
  <v-icon @click="router_push('Add')">add</v-icon>
</v-toolbar>
    <!-- <v-content> -->
      <!-- <v-container fluid> -->
        <router-view/>
      <!-- </v-container> -->
    <!-- </v-content> -->
  </v-app>
<!-- </div> -->
</template>

<script>
export default { 
  name: 'App',
  data () {
    return {}
  },  
  methods: {
    router_push (targ,param) {
      this.$router.push({ name: targ, params: { id: param }})
    },
    navigate() {
        this.$router.go(-1);
    }    
  }, 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
