import Vue from "vue";
import Router from 'vue-router';

//paginas
import RegistrarProyecto from "./views/RegistrarProyecto.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name:'home', component: RegistrarProyecto},
    ],
    mode: 'history' // evita el # de la url
});
