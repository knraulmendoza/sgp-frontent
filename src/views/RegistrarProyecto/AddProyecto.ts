import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './RegistrarProyecto.vue';
import { propuestaService } from '../../services/PropuestaService';



@Component({
    name: 'RegistrarProyecto',
    mixins: [template],

})
export default class RegistrarProyecto extends Vue {

    public codigoGenerado = 'Por Definir';
    public registrado: string = '';
    public validarDocumento="";
    public valid = true;
    public lazy = false;
    public proyecto = {
      Nombre: '',
      NumeroDeFamilia: '',
      FechaDeRegistro: '',
      PropuestaState: '',
      PresupuestoEstimado: '',
      Documento: '',
      };
    public rules = {
      proyecto: {
        Nombre: [
          (v: any) => !!v || 'Nombre es requerido',
          (v: any) => (v && v.length >= 5) || 'Debe tener minimo 10 caracteres',
        ],
        NumeroDeFamilia: [
          (v: any) => !!v || 'Este Campo es requerido',
          (v: any) => (v && Number(v) == 0) && 'Debe indicar el número de familiar a favorcer',
          (v:any) => /^[0-9]+$/.test(v)|| 'Solo Numeros',
          // v => /^[0-9]+$/!.test(v) && 'Debe indicar el número de familiar a favorcer',
        ],

        presupuestoEstimado: [
          (v: any) => !!v || 'Este campo es requerido',
          (v: any) => (v && Number(v) == 0) && 'Indique presupuesto',
        ],
        Documento: [
         
          
          (v: any) => v || 'Este campo es requerido',
      ],
      },
      validarDocumento:[
        (v: any) => v || 'Este campo es requerido',
      ]
      
    };

  

    public validate() {
     if(this.proyecto.Documento==""|| this.proyecto.Documento==null){
     console.log("proyecto "+this.proyecto.Documento); 
     this.validarDocumento="Documento requerido";
     }else
     this.guardarProyecto();
    }

  public mounted() {

    // proyectoService.comunidades().then(res=>this.comunidades = res);
     // proyectoService.getAllDimensiones();
    // proyectoService.obtenerDatos(0).then(res=>this.dimensiones = res);
    // proyectoService.cofinanciador().then(res=>this.cofinanciamiento = res);


  }


  public resetValidation() {
       
     this.$refs.form.reset();
     this.proyecto.Documento=" ";
     this.proyecto.Nombre=" ";
     this.proyecto.NumeroDeFamilia=" ";
     this.proyecto.PresupuestoEstimado=" ";
  }


  public obtenerArchivo(e: any) {
    this.proyecto.Documento = e;
    console.log(this.proyecto.Documento);
    this.validarDocumento="";
  }

  public guardarProyecto() {
     const fecha: Date = new Date();
     // console.log("fecha let: "+fecha);

     const rawData = {
                Nombre: this.proyecto.Nombre,
                NumeroDeFamilias: this.proyecto.NumeroDeFamilia,
                PresupuestoEstimado: this.proyecto.PresupuestoEstimado,
                Documento: this.proyecto.Documento,
                FechaDeRegistro: fecha,
                
              };
            

              propuestaService.registrarPropuesta(rawData).then((res) => {
                console.log(res);
                this.codigoGenerado = res; });

             

              


            }
}
