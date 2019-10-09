import Vue from "vue";
import Router from 'vue-router';

//paginas
import RegistrarProyecto from "./views/RegistrarProyecto.vue";
import Proyecto from "./views/Proyecto.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name:'home', component: RegistrarProyecto},
        {path: '/proyecto', name:'proyecto', component: Proyecto},
    ],
    mode: 'history' // evita el # de la url
});
