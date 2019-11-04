import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './ActualizacionPresupuesto.vue';
import { proyectoService } from "../../services/proyectoService";


@Component({
    name: 'ActualizacionPresupuesto',
    mixins: [template]
})
export default class ActualizacionPresupuesto extends Vue {


}