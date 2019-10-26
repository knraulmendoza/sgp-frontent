import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
// import '@fortawesome/fontawesome-free/css/all.css';
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: colors.green.darken4, // #E53935
        secondary: colors.orange.base, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
