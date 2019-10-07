import Vue from "vue";
import Router from 'vue-router';

//paginas
import RegistrarProyecto from "./views/RegistrarProyecto.vue";
import ConsultarProyectos from './views/ConsultarProyectos.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name:'home', component: RegistrarProyecto},
        {path: '/consultarProyecto', name:'consultarProyecto', component: ConsultarProyectos}
    ],
    mode: 'history' // evita el # de la url
});
