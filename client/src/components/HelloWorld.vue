<template>
<v-content>
<v-container grid-list-md text-xs-center fluid>
  <v-layout row wrap v-for="card in cards"
            :key="card.title"
  >
    <!-- v-bind="{ [`xs${card.flex}`]: true }" -->
    <v-flex>
      <v-card dark color="primary" @click.native="router_push('Dish_list',card.title)">
      <v-img
      :src="card.img"
      height="150px"
      ></v-img>
      <span class="headline white--text" v-text="card.title"></span>
      </v-card>
    </v-flex>   
  </v-layout>
</v-container>
</v-content>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      cards: [
        { title: 'Завтрак', src: 'Breakfast',img:require('@/assets/Breakfast.jpg'), flex: 12 },
        { title: 'Обед', src: 'Lanch',img:require('@/assets/lanch.jpg'), flex: 6 },
        { title: 'Ужин', src: 'Dinner',img:require('@/assets/dinner.jpg'), flex: 6 },
        { title: 'Перекус', src: 'Eatings',img:require('@/assets/eatings.jpg'), flex: 6 }
      ]      
    }
  },
  methods: {
    router_push (targ,param) {
      this.$router.push({ name: targ, params: { id: param } })
    },   
  }
}
</script>

