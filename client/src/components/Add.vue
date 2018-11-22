<template>
<v-container>
  <h1>Добавить новое блюдо</h1>
  <v-layout row wrap>
    <v-flex xs12 sm6 md12>
    <v-text-field
      v-model="title"
      label="Название"
    ></v-text-field>
    </v-flex>

    <v-flex xs12 sm6 d-flex>
      <v-select
        :items="category"
        v-model="cat"
        label="Категория"
      ></v-select>
    </v-flex>

    <v-flex xs12 sm6 md12>
    <v-textarea
      v-model="description"      
      
      label="Описание"
      
    ></v-textarea>    
    </v-flex>

    <v-flex xs12 sm6 md12>
      <v-text-field
        v-model="calory"
        label="Калории"
      ></v-text-field>
    </v-flex>
<v-layout col>
    <v-flex xs10 sm6 md12>
    <v-text-field
      solo
      v-model="product"
      placeholder="Продукт"
    ></v-text-field>
    </v-flex>

    <v-flex xs2 sm6 md12>
    <v-text-field
    solo
      v-model="count"
      placeholder="Placeholder"
      label="Кол-во"
    ></v-text-field>
    </v-flex>
</v-layout row wrap>
    <v-flex xs12 sm6 md12>
    <v-btn color="success" @click="addProduct(product,count)">Добавить</v-btn>
    <ul id="example-1">
      <li v-for="item in ingr">
        {{ item.product }} - {{ item.count }}
      </li>
    </ul>
    <v-btn color="success" @click="save()">Сохранить</v-btn>
    </v-flex>
    
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        title:'',
        description: '',
        product:'',
        calory: '',
        count:0,
        ingr:[],
        category: ['Завтрак', 'Обед', 'Ужин', 'Перекус'],
        cat:''
    }
  },
  methods: {
    addProduct (product,count) {
      this.ingr.push({product:product, count:parseInt(count)})
    },
    save () {
      let dish = {
        title:this.title,
        description: this.description,
        category: this.cat,
        ingr: this.ingr,
        calory: this.calory
      }
      this.$socket.emit('add_dish',dish);
      this.router_push('Dish_list',dish.category)
    },
    router_push (targ,param) {
        this.$router.push({ name: targ, params: { id: param } })
    },    
  }
}
</script>

