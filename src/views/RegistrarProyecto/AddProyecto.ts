import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './RegistrarProyecto.vue';
import { proyectoService } from '../../services/proyectoService';



@Component({
    name: 'RegistrarProyecto',
    mixins: [template],

})
export default class RegistrarProyecto extends Vue {

    public codigoGenerado = 'Por Definir';
    public registrado: string = '';
    // dimensiones:any[]=[];
    // comunidades:any[]=[];
    // estrategias:any[]=[];
    // programas:any[]=[];
    // componentes:any[]=[];
    // cofinanciamiento:any[]=[];
    public valid = true;
    public lazy = false;
    public proyecto = {
      Nombre: '',
      NumeroDeFamilia: 0,
      FechaDeRegistro: '',
      PropuestaState: '',
      // dimension:0,
      // componente:0,
      // estrategia:0,
      // programa:0,
      // cofinanciador:'',
      // valorCofinanciador:0,
      PresupuestoEstimado: 0,
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
          (v: any) => (v && v.length != 0) || 'Debe indicar el número de familiar a favorcer',
          // v => /^[0-9]+$/!.test(v) && 'Debe indicar el número de familiar a favorcer',
        ],

        presupuestoEstimado: [
          (v: any) => !!v || 'Este campo es requerido',
          (v: any) => (v && v.length != 0) || 'Debe indicar el Valor presupuesto',
        ],
        Documento: [
          (v : any) => {
            v == null || 'Este campo es obligatorio'
            !!v || 'Este campo es obligatorio'
          },
      ],
      },
    };


    public validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.guardarProyecto();
      }
    }

  public mounted() {

    // proyectoService.comunidades().then(res=>this.comunidades = res);
     // proyectoService.getAllDimensiones();
    // proyectoService.obtenerDatos(0).then(res=>this.dimensiones = res);
    // proyectoService.cofinanciador().then(res=>this.cofinanciamiento = res);


  }

  public obtenerArchivo(e: any) {
    this.proyecto.Documento = e;

  }

  public resetValidation() {
    this.registrado = '';
    this.$v.$reset();
  }

  public guardarProyecto() {
     const fecha: Date = new Date();
     // console.log("fecha let: "+fecha);

     const rawData = {
                Nombre: this.proyecto.Nombre,
                NumeroDeFamilia: this.proyecto.NumeroDeFamilia,
                PresupuestoEstimado: this.proyecto.PresupuestoEstimado,
                Documento: this.proyecto.Documento,
                FechaDeRegistro: fecha,
                PropuestaState: 'Prupuesta',


              };


     proyectoService.registrarPropuesta(this.proyecto).then((res) => {
          console.log('Respuestas+ ' + res);
          if (res == null) {
              this.registrado = 'error';
          } else {
            this.registrado = 'exitoso';
            this.codigoGenerado = res;
          }
         });


                }



}
