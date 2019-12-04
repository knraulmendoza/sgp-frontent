import Vue from 'vue';
import Component from 'vue-class-component';
import template from './ConsultarTransaccion.vue';
import {transaccionService} from '../../services/transaccionService';
import { VMoney } from "v-money";
import { ITransaccion, IProyecto, IPropuesta } from '@/interfaces/interface';
import { proyectoService } from '@/services/proyectoService';
import { propuestaService } from '@/services/PropuestaService';


export interface iProject{
    name: string,
    state: number,
    proyectoId: number,
    presupuesto: number,
    presupuestoEje: number
}

@Component({
    mixins:[template],  
    directives:{money: VMoney}
})

export default class ShowTransaccion extends Vue {
    transacciones:ITransaccion[] = [];
    dialog=false;
    headersTransaccion = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'id',
        },
        { text: 'Fecha', value: 'fecha' },
        { text: 'Monto', value: 'monto' },
        { text: 'Tipo', value: 'tipo' },
        //{ text: 'Presupuesto', value: 'presupuestoEje'},
        
        // { text: 'Proyecto', value: 'proyectoId' },
      
    ]

    proyecto:iProject[] = [];
    headersProyecto = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'id',
        },
        { text: 'Proyecto', value: 'name' },
        { text: 'Estado', value: 'state' },
        { text: 'Presupuesto inicial', value:'presupuesto'},
        { text: 'Transacciones', value: 'transaccion', sortable:false},
    ]

    
    
    
    search = "";
    mounted(){
        this.showProyects();
        console.log(this.proyecto);
        //this.showTrasaccion();

    }
    

    showProyects(){
        proyectoService.GetProyectosPorEstado(1).then((p:IProyecto[])=>{
            // this.proyecto=p;
            console.log(p);
            p.forEach(proyecto => {
                propuestaService.getDataPropuesta(proyecto.propuestaId).then((pro:IPropuesta)=>{
                    this.proyecto.push({
                        name:pro.nombre,
                        proyectoId: proyecto.id,
                        state: proyecto.proyectoState,
                        presupuesto: proyecto.presupuestoAprobado,
                        presupuestoEje: proyecto.presupuestoEjecutado,

                        
                    });
                    console.log(this.proyecto);
                })
            });
        })
    }
    mostrarTipo(tipo: number){
        let tipotext='';

        tipo==1 ? tipotext='Egreso': tipotext='Ingreso';
        // entonces ? : sino
        return tipotext;

    }
    mostrarEstado(state: number){
        let st='';

        state==1 ? st='Propuesto':st='Aprobado';
        return st;
    }

    filtrarProyecto(idPropuesta: number){
        propuestaService.getDataPropuesta(idPropuesta).then((pro:IPropuesta)=>{
            return pro.nombre;
        })
    }

    openTransaccion(id:number){
        this.dialog = true;
        transaccionService.consultar(id).then(trans=>{
            console.log(trans);
            this.transacciones = trans;
        })
    }

}
