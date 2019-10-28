import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './RegistrarProyecto.vue';
import { proyectoService } from "../../services/proyectoService";

@Component({
    name: 'RegistrarProyecto',
    mixins: [template]
})
export default class RegistrarProyecto extends Vue {
    
    codigoGenerado='Por Definir';
    registrado:string="";
    // dimensiones:any[]=[];
    // comunidades:any[]=[];
    // estrategias:any[]=[];
    // programas:any[]=[];
    // componentes:any[]=[];
    // cofinanciamiento:any[]=[];
    valid = true;
    proyecto={
      Nombre:'',
      NumeroDeFamilia:0,
      FechaDeRegistro:'',
      PropuestaState: '',
      // dimension:0,
      // componente:0,
      // estrategia:0,
      // programa:0,
      // cofinanciador:'',
      // valorCofinanciador:0,
      PresupuestoEstimado:0,
      Documento:''
      };
    rules = {
      proyecto: {
        Nombre: [
          v => !!v || 'Nombre es requerido',
          v => (v && v.length >= 5) || 'Debe tener minimo 10 caracteres',
        ],
        NumeroDeFamilia: [
          v => !!v || 'Este Campo es requerido',
          v => (v && v.length !=0) || 'Debe indicar el número de familiar a favorcer',
        ],  
       
        presupuestoEstimado: [
          v=>!!v || 'Este campo es requerido',
          v => (v && v.length !=0) || 'Debe indicar el Valor presupuesto',
        ],
        Documento: [v=>!!v || 'Este campo es requerido'],
      }
    }

  mounted() {
    
    //proyectoService.comunidades().then(res=>this.comunidades = res);
     // proyectoService.getAllDimensiones();
    //proyectoService.obtenerDatos(0).then(res=>this.dimensiones = res);
    // proyectoService.cofinanciador().then(res=>this.cofinanciamiento = res);

     
  }

  

  // select(value:number, id: number){
  //   console.log(id)
  //   switch (value) {
  //     case 1:
  //       proyectoService.obtenerDatos(id).then(res=>{
  //         console.log(res);
  //       this.componentes=res});
  //       break;
  //       case 2:
  //            proyectoService.obtenerDatos(id).then(res=>{
  //         console.log(res);
  //       this.estrategias=res});
  //          break;
  //          case 3:
  //         proyectoService.obtenerDatos(id).then(res=>{
  //         console.log(res);
  //       this.programas=res});
  //          break;
    
  //     default:
  //       break;
  //   }
  // }

  
  obtenerArchivo(e:any){
    this.proyecto.Documento=e;
    
  }

  resetValidation(){
    this.registrado="";
    this.$refs.form.reset();
  }

  guardarProyecto(){
     let fecha:Date= new Date();
     //console.log("fecha let: "+fecha);
     
      let rawData = {
                Nombre: this.proyecto.Nombre,
                NumeroDeFamilia:this.proyecto.NumeroDeFamilia,
                PresupuestoEstimado:this.proyecto.PresupuestoEstimado,   
                Documento:this.proyecto.Documento,
                FechaDeRegistro:fecha,
                PropuestaState:"Prupuesta"


              }
              

         proyectoService.registrarPropuesta(this.proyecto).then(res=>{
          console.log("Respuestas+ "+res);
          if(res==null){
              this.registrado="error";
          }else{
            this.registrado="exitoso";
            this.codigoGenerado=res;
          }
         });


                }



}