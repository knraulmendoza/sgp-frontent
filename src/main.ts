import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import App from './components/AppComponent.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { ValidationProvider } from 'vee-validate';
import { validationMixin } from 'vuelidate';
import * as VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);

Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;
// declare module 'vue/types/vue' {
//   interface Vue {
//     $axios: AxiosStatic;
//   }
// }
Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  vuetify,
  router,
  components: {ValidationProvider},
  mixins:[validationMixin],
  render: (h) => h(App),
}).$mount('#app');
