<template>
<v-content>
    
<v-container grid-list-sm text-xs-center fluid>
  <v-layout row wrap v-for="card in cards"
            :key="card.$loki"
  >
    <v-flex>
      <v-card class = "card pa-0 ma-1" @click.native="router_push('Dish',card.$loki)">
        <v-layout fill-height>
        <v-flex xs10>
          <span class="headline">{{card.title}}</span>
        </v-flex>
        <v-flex xs2>
          <span class="headline">{{card.calory}}</span>
        </v-flex>
        </v-layout>
      </v-card>
    </v-flex>   
  </v-layout>
  
</v-container>
</v-content>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      cards: [],
    }
  },
  methods: {
    router_push (targ,param) {
      this.$router.push({ name: targ, params: { id: param } })
    },
    init (id) {
      this.$socket.emit('getRecs',id)
      this.$socket.on('getRecs',(data) => {
        data.forEach(element => {
            this.cards.push(element)
        });
      })
    },
  },  
  created() {
    this.id = this.$route.params.id;
    this.init(this.id);
    this.$root.$on('menu',data => {
      // console.log(data)
      // this.init(this.id)
    })
  },
}
</script>

<style>
.card{
     padding:0px;
     color:yellow;
  }
p {
    margin-bottom: 0;
}  
</style>