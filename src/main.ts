import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import App from './components/AppComponent.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { ValidationProvider } from 'vee-validate';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, { inject: false });
Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;
// declare module 'vue/types/vue' {
//   interface Vue {
//     $axios: AxiosStatic;
//   }
// }

new Vue({
  vuetify,
  router,
  components: {ValidationProvider},
  render: (h) => h(App),
}).$mount('#app');
