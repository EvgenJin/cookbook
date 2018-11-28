<template>
<v-container>
  <h1>Добавить новое блюдо</h1>
  <v-layout row wrap>
    <v-flex xs12 sm6 md12>
    <v-text-field
      v-model="card.title"
      label="Название"
    ></v-text-field>
    </v-flex>

    <v-flex xs12 sm6 d-flex>
      <v-select
        :items="category"
        v-model="card.cat"
        label="Категория"
      ></v-select>
    </v-flex>

    <v-flex xs12 sm6 md12>
    <v-textarea
      v-model="card.description"      
      label="Описание"
    ></v-textarea>    
    </v-flex>

    <v-flex xs12 sm6 md12>
      <v-text-field
        v-model="card.calory"
        label="Калории"
      ></v-text-field>
    </v-flex>
<v-layout col>
    <v-flex xs10 sm6 md12>
    <v-text-field
      solo
      v-model="card.product"
      placeholder="Продукт"
    ></v-text-field>
    </v-flex>

    <v-flex xs2 sm6 md12>
    <v-text-field
    solo
      v-model="card.count"
      placeholder="Placeholder"
      label="Кол-во"
    ></v-text-field>
    </v-flex>
</v-layout row wrap>
    <v-flex xs12 sm6 md12>
    <v-btn color="success" @click="addProduct(card.product,card.count)">Добавить</v-btn>
    <ul id="example-1">
      <li v-for="(item,index) in card.ingr">
        {{ item.product }} - {{ item.count }} 
          <v-icon @click="deleteProduct(index)">remove_circle_outline</v-icon>
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
        id: 0,
        category: ['Завтрак', 'Обед', 'Ужин', 'Перекус'],
        
        card: {
          title:'',
          description: '',
          product:'',
          calory: '',
          count:0,
          ingr:[],
          cat:''          
        }
        // title:'',
        // description: '',
        // product:'',
        // calory: '',
        // count:0,
        // ingr:[],
        // category: ['Завтрак', 'Обед', 'Ужин', 'Перекус'],
        // cat:''
    }
  },
  methods: {
    init() {
      if (typeof(this.id) == 'undefined') {console.log('undefined!!!')}
          else {
              this.$socket.emit('getDish',this.id)
              this.$socket.on('getDish',(data) => {
                  this.card = data
                  this.card.cat = data.category
                  console.log(data.category)     
              })
      }       
    },
    addProduct (product,count) {
      this.card.ingr.push({product:product, count:parseInt(count)})
    },
    deleteProduct (i) {
      this.card.ingr.splice(i, 1)
    },
    save () {
      let dish = {
        title:this.card.title,
        description: this.card.description,
        category: this.card.cat,
        ingr: this.card.ingr,
        calory: this.card.calory,
        id: this.card.$loki
      }
      if (this.id > 0) {this.$socket.emit('update_dish',dish)}
        else {this.$socket.emit('add_dish',dish)}
      this.router_push('Dish_list',dish.category)
    },
    router_push (targ,param) {
        this.$router.push({ name: targ, params: { id: param } })
    },    
  },
  created() {
      this.id = this.$route.params.id;
      this.init()
      console.log(this.id)
  },   
}
</script>

