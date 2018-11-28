// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import Vuetify from 'vuetify'
import VueLodash from 'vue-lodash'
import 'vuetify/dist/vuetify.min.css'
import './icons.css'
// Vue.use(VueSocketio, 'localhost:7000')
const conf = require('../config/config.js');
Vue.use(VueSocketio, conf.host+':'+conf.socket_port)
Vue.use(Vuetify)
Vue.use(VueLodash)

Vue.config.productionTip = false


import data from './store.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data,
  sockets: {
    disconnect: function () {
      console.log('socket to notification channel disconnected')
    },
    connect: function () {
      console.log('socket to notification channel connected!!!!')
    },
  },  
})
