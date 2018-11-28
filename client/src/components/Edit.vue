<template>
<v-container>
<v-text-field v-model="card.title"></v-text-field>
</v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      id: 0,
      card:{}
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
   
  }
}
</script>

