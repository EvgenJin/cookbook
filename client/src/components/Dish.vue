<template>
<v-content>
    <v-flex>
        <v-card flat class = "pa-0 ma-0" color="transparent">
        <v-card-text>
            <span class="headline">{{card.title}}</span>
            <p class="grey--text">{{card.category}}</p>
            <p class="grey--text">{{card.calory}} Ккал</p>
            <p>{{card.description}}</p>
        <v-list>
          <v-list-tile
            v-for="item in card.ingr"
            :key="item.product"
          >
            <v-flex xs9>
               <v-list-tile-title v-text="item.product"></v-list-tile-title>     
            </v-flex>    
            <v-flex xs3>
                <v-list-tile-title v-text="item.count"></v-list-tile-title>
            </v-flex> 
          </v-list-tile>
        </v-list>
        </v-card-text>
        </v-card>
    </v-flex>
    <v-bottom-nav
        :value="true"
        absolute
        color="transparent"
        >
        <v-btn
            @click="add2cart()"
            color="teal"
            flat
        >
            <span>Добавить в корзину</span>
            <v-icon>add_shopping_cart</v-icon>
        </v-btn>
        <v-btn
            @click="delete_dish()"
            color="red"
            flat
        >
            <span>Удалить</span>
            <v-icon>delete_forever</v-icon>
        </v-btn>        
    </v-bottom-nav>          
</v-content>
</template>

<script>
export default {
  data () {
    return {
      id: 1,
      card: {}
    }
  },
  methods: {
    init () {
      if (typeof(this.id) == 'undefined') {console.log('undefined!!!')}
          else {
              this.$socket.emit('getDish',this.id)
              this.$socket.on('getDish',(data) => {
                  this.card = data            
              })
      }          
    },
    add2cart () {
      //   console.log(this.card)
      this.$root.$data.cart.push(this.card)
    },
    delete_dish () {
      this.$socket.emit('delete_dish',this.card.$loki);
      this.router_push('Dish_list',this.card.category)
    },
    router_push (targ,param) {
        this.$router.push({ name: targ, params: { id: param } })
    },
          
  },
  created() {
      this.id = this.$route.params.id;
    //   console.log(this.$root.$data.notes)
      this.init()
  },  
}
</script>
