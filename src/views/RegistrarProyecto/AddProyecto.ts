import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './RegistrarProyecto.vue';
import { proyectoService } from "../../services/proyectoService";

@Component({
    name: 'RegistrarProyecto',
    mixins: [template]
})
export default class RegistrarProyecto extends Vue {
    name='kenneth'
    codigoGenerado='Por Definir';
    dimensiones:any[]=[];
    comunidades:any[]=[];
    estrategias:any[]=[];
    programas:any[]=[];
    componentes:any[]=[];
    cofinanciamiento:any[]=[];
    valid = true;
    proyecto={
      nombre:'',
      numeroFamilia:0,
      dimension:0,
      componente:0,
      estrategia:0,
      programa:0,
      cofinanciador:'',
      valorCofinanciador:0,
      PresupuestoEstimado:0,
      documento:''
      };
    rules = {
      proyecto: {
        nombre: [
          v => !!v || 'Nombre es requerido',
          v => v.length <= 10 || 'debe tener minimo 10 caracteres'
        ],
        numFamilias: [
          v => !!v || 'Este Campo es requerido',
          v => v.length >= 0 || 'Debe indicar el número de familiar a favorcer'
        ],
        dimension: [v=>!!v || 'Este campo es requerido'],
        componente: [v=>!!v || 'Este campo es requerido'],
        estrategia: [v=>!!v || 'Este campo es requerido'],
        programa: [v=>!!v || 'Este campo es requerido'],
        componentes: [v=>!!v || 'Este campo es requerido'],
        presupuestoEstimado: [v=>!!v || 'Este campo es requerido'],
        documento: [v=>!!v || 'Este campo es requerido']
      }
    }

  mounted() {
    
    proyectoService.comunidades().then(res=>this.comunidades = res);
     // proyectoService.getAllDimensiones();
    proyectoService.obtenerDatos(0).then(res=>this.dimensiones = res);
    proyectoService.cofinanciador().then(res=>this.cofinanciamiento = res);

     
  }

  

  select(value:number, id: number){
    console.log(id)
    switch (value) {
      case 1:
        proyectoService.obtenerDatos(id).then(res=>{
          console.log(res);
        this.componentes=res});
        break;
        case 2:
             proyectoService.obtenerDatos(id).then(res=>{
          console.log(res);
        this.estrategias=res});
           break;
           case 3:
          proyectoService.obtenerDatos(id).then(res=>{
          console.log(res);
        this.programas=res});
           break;
    
      default:
        break;
    }
  }

  
  obtenerArchivo(e:any){
    this.proyecto.documento=e;
    console.log(this.proyecto.documento);
  }



  guardarProyecto(){
 
      let rawData = {
                nombre: this.proyecto.nombre,
                numeroFamilia:this.proyecto.numeroFamilia,
                dimension:this.proyecto.dimension,
                componente:this.proyecto.componente,
                estrategia:this.proyecto.estrategia,
                programa:this.proyecto.programa,                
                cofinanciador:this.proyecto.cofinanciador,
                valorCofinanciador:this.proyecto.valorCofinanciador,
                PresupuestoEstimado:this.proyecto.PresupuestoEstimado,   
                documento:this.proyecto.documento,           
              }

         proyectoService.registrarPropuesta(this.proyecto).then(res=>{
          console.log(res);
        this.codigoGenerado=res});


                }



}