import Vue from "vue";
import Router from 'vue-router';

//paginas
import RegistrarProyecto from "./views/RegistrarProyecto";
import ShowProyecto from "./views/consultarProyecto";
import ActualizacionPresupuesto from './views/ModificacionPresupuesto/UpdatePresupuesto';
import RegisterGasto from './views/RegistrarGasto/index';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name:'home', component: RegistrarProyecto},
        {path: '/proyecto', name:'proyecto', component: ShowProyecto},
        {path: '/ActualizacionPresupuesto', name:'Modificar Presupuesto', component: ActualizacionPresupuesto},
        {path: '/registrarGasto', name:'registrarGasto', component: RegisterGasto},
    ],
    mode: 'history' // evita el # de la url
});
