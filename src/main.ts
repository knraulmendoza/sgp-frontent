import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import App from './components/AppComponent.vue';
import vuetify from './plugins/vuetify';
import router from './router';

// Vue.prototype.$axios = axios;
// declare module 'vue/types/vue' {
//   interface Vue {
//     $axios: AxiosStatic;
//   }
// }

new Vue({
  vuetify,
  router,
  components: {},
  render: (h) => h(App),
}).$mount('#app');
