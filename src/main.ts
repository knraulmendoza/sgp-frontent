import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import App from './components/AppComponent.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { ValidationProvider } from 'vee-validate';
import currency from 'v-currency-field'


import VueCurrencyFilter from 'vue-currency-filter';

// Vue.prototype.$axios = axios;
// declare module 'vue/types/vue' {
//   interface Vue {
//     $axios: AxiosStatic;
//   }
// }
Vue.use(VueCurrencyFilter,
  {
    symbol: '$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true,
  })
Vue.use(currency, {
  decimal: ',',
  thousands: '.',
  precision: 2,
  masked: false,
  allowBlank: false,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER
})
new Vue({
  vuetify,
  router,
  components: {},
  render: (h) => h(App),
}).$mount('#app');
