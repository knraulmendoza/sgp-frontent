import Vue from 'vue';
import Router from 'vue-router';

// paginas
import RegistrarProyecto from './views/RegistrarProyecto';
import ShowProyecto from './views/ConsultarPropuesta';
import ActualizacionPresupuesto from './views/ModificacionPresupuesto/UpdatePresupuesto';
import RegisterGasto from './views/RegistrarGasto/index';
import AddSgp from '@/views/sgp';
import ActualizacionPresupuestoProyecto from './views/ActualizarPresupuestoProyecto/index';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name: 'addProyecto', component: RegistrarProyecto},
        // {path: '/proyecto', name: 'proyecto', component: ShowProyecto},
        {path: '/ActualizacionPresupuesto', name: 'Modificar Presupuesto', component: ActualizacionPresupuesto},
        {path: '/registrarGasto', name: 'registrarGasto', component: RegisterGasto},
        {path: '/ActualizacionPresupuestoProyecto', name: 'ActualizacionPresupuestoProyecto', component: ActualizacionPresupuestoProyecto},
        {path: '/sgp', name: 'sgp', component: AddSgp},
        {path: '/proyecto', name: 'proyecto', component: ShowProyecto, children:[
            {
                path: 'sgp',
                meta: {
                    name: 'Docente view',
                },
                component: AddSgp
            }
        ]},
    ],
    mode: 'history', // evita el # de la url
});
