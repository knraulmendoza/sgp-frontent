import Vue from 'vue';
import Router from 'vue-router';

// paginas
import RegistrarProyecto from './views/RegistrarProyecto';

import ShowProyecto from './views/ConsultarPropuesta';


import ActualizacionPresupuesto from './views/ModificacionPresupuesto/UpdatePresupuesto';
import RegisterGasto from './views/RegistrarGasto/index';
import AddSgp from '@/views/sgp';
import ShowTransaccion from './views/ConsultarTransaccion';



Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name: 'addProyecto', component: RegistrarProyecto},
        {path: '/proyecto', name: 'proyecto', component: ShowProyecto},
        {path: '/ActualizacionPresupuesto', name: 'Modificar Presupuesto', component: ActualizacionPresupuesto},
        {path: '/registrarGasto', name: 'registrarGasto', component: RegisterGasto},
        {path: '/sgp', name: 'sgp', component: AddSgp},
        {path: '/Transacciones', name: 'Transacciones',component:ShowTransaccion}
        
    ],
    mode: 'history', // evita el # de la url
});
