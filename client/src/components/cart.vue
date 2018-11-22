<template>
 <v-content>
    <v-data-table
      :headers="headers"
      :items="cart"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.category }}</td>        
      </template>
    </v-data-table>
  <v-divider></v-divider>      
  <v-card>
  <v-card-text><h4>Что купить</h4></v-card-text>
  <v-list>
    <v-list-tile
    v-for="item in psk"
    :key="item.product"
    >
    <v-list-tile-content>
      <v-list-tile-title v-text="item.product"></v-list-tile-title>
    </v-list-tile-content>
    <v-list-tile-avatar>
      <v-list-tile-title v-text="item.count"></v-list-tile-title>
    </v-list-tile-avatar>  
    </v-list-tile>
  </v-list>      
  </v-card>
 </v-content>    
</template>


<script>
export default {
  data () {
    return {
        cart: [],
        headers: [
            {text: 'Блюдо', align: 'left',sortable: false, value: 'title'},
            {text: 'Тип',align: 'left', value: 'category' },        
        ],        
    }
  },
  methods: {
    init () {
        this.$root.$data.cart.forEach(element => {
            this.cart.push(element)    
        });
    },

    get_sum_ingr (array) {
        let a = []
        array.forEach(element => {
            element.ingr.forEach(el => {
                a.push(el)
            });
        });
            var output = _(a)
            .groupBy('product')
            .map((objs, key) => ({
            'product': key,
            'count': _.sumBy(objs, 'count') }))
            .value();		
            return output    
    }      
  },
  created () {
      this.init()
  },
  computed: {
    psk: function () {
      return this.get_sum_ingr(this.cart)
    },
  }

  
}
</script>