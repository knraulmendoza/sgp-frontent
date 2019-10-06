import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css'
import App from './components/AppComponent.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
