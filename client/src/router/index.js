import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Add from '@/components/Add'
import Dish_list from '@/components/Dish_list'
import Dish from '@/components/Dish'
import Cart from '@/components/Cart'
import Edit from '@/components/Edit'
import test from '@/components/test'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Dish_list',
      name: 'Dish_list',
      component: Dish_list,
      children: [
        {
          // при совпадении пути с шаблоном /user/:id/profile
          // в <router-view> компонента User будет показан UserProfile
          path: 'dinner',
          component: Dish
        }
      ]      
    },
    {
      path: '/Dish',
      name: 'Dish',
      component: Dish
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    }, 
    {
      path: '/test',
      name: 'test',
      component: test
    },    
    // {
    //   path: '/Breakfast',
    //   name: 'Breakfast',
    //   component: Breakfast
    // },
    // {
    //   path: '/Lanch',
    //   name: 'Lanch',
    //   component: Lanch
    // },
    // {
    //   path: '/Dinner',
    //   name: 'Dinner',
    //   component: Dinner
    // },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },    
  ]
})
