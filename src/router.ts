import Vue from 'vue';
import Router from 'vue-router';

// paginas
import RegistrarProyecto from './views/RegistrarProyecto';
import ShowProyecto from './views/consultarProyecto';
import AddSgp from '@/views/sgp';

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/addProyecto', name: 'home', component: RegistrarProyecto},
        {path: '/proyecto', name: 'proyecto', component: ShowProyecto},
        {path: '/sgp', name: 'sgp', component: AddSgp},
    ],
    mode: 'history', // evita el # de la url
});
