import Vue from 'vue';
import Router from 'vue-router';

// paginas
import RegistrarProyecto from './views/RegistrarProyecto';
import ShowProyecto from './views/ConsultarPropuesta';
import ActualizacionPresupuesto from './views/ModificacionPresupuesto/UpdatePresupuesto';
import RegisterGasto from './views/RegistrarGasto/index';
import AddSgp from '@/views/sgp';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name: 'home', component: RegistrarProyecto},
        {path: '/proyecto', name: 'proyecto', component: ShowProyecto},
        {path: '/ActualizacionPresupuesto', name: 'Modificar Presupuesto', component: ActualizacionPresupuesto},
        {path: '/registrarGasto', name: 'registrarGasto', component: RegisterGasto},
        {path: '/sgp', name: 'sgp', component: AddSgp},
    ],
    mode: 'history', // evita el # de la url
});
