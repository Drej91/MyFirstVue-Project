import Vue from 'vue'
import App from './App.vue'
import router from './router'


export const EventBus = new Vue();


new Vue({
  el: '#app',
  render: h => h(App),
  router
})
