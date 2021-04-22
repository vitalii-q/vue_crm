import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import dateFilter from "./filters/date.filter"; // фильтр даты
import MessagePlugin from '@/utils/message.plugin'

import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(MessagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: "AIzaSyDrmwNq95WzrLWA5RS92fno4dbkLwbokYM",
  authDomain: "vue-crm-93edb.firebaseapp.com",
  projectId: "vue-crm-93edb",
  storageBucket: "vue-crm-93edb.appspot.com",
  messagingSenderId: "556208454478",
  appId: "1:556208454478:web:eb21e21dd82f6d43013c1f",
  measurementId: "G-4H4S4QX9SC"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
