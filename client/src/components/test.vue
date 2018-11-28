<template>
  <v-treeview 
    :active.sync="active"
    :items="items"
    activatable
  ></v-treeview>
</template>

<script>
  export default {
    data: () => ({
      active: [],
      items: [
        {
          id: 1,
          name: 'Главная :',
          children: [
            { id: 1, name: 'Calendar : app', type:'asd' },
            { id: 2, name: 'Chrome : app' },
            { id: 3, name: 'Webstorm : app', children : [
              { id: 4, name: '[p] : app' },
            ] }
          ]
        }
      ]
    }),
  computed: {
    selected () {
      console.log(this.active[0])
      // if (!this.active.length) return undefined
      // const id = this.active[0]
      // return this.users.find(user => user.id === id)
    }
  },

  methods: {
    randomAvatar () {
      console.log(this.active[0])
    }
  },
  watch: {
    selected: 'randomAvatar'
  },

  }
</script>