import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './RegistrarProyecto.vue';
import { proyectoService } from '../../services/proyectoService';

@Component({
    name: 'RegistrarProyecto',
    mixins: [template],
})
export default class RegistrarProyecto extends Vue {
    public name = 'kenneth';
    public codigoGenerado = 'Por Definir';
    public dimensiones: any[] = [];
    public comunidades: any[] = [];
    public estrategias: any[] = [];
    public programas: any[] = [];
    public componentes: any[] = [];
    public cofinanciamiento: any[] = [];
    public valid = true;
    public proyecto = {
      nombre: '',
      numeroFamilia: 0,
      FechaRegitro: '',
      PropuestaState: '',
      PresupuestoEstimado: 0,
      FechaRegistro: '',
      documento: '',
      // dimension:0,
      // componente:0,
      // estrategia:0,
      // programa:0,
      // cofinanciador:'',
      // valorCofinanciador:0,
      };
    public rules = {
      proyecto: {
        nombre: [
          (v: any) => !!v || 'Nombre es requerido',
          (v: any) => v.length <= 10 || 'debe tener minimo 10 caracteres',
        ],
        numFamilias: [
          (v: any) => !!v || 'Este Campo es requerido',
          (v: any) => v.length >= 0 || 'Debe indicar el número de familiar a favorcer',
        ],
        // dimension: [v=>!!v || 'Este campo es requerido'],
        // componente: [v=>!!v || 'Este campo es requerido'],
        // estrategia: [v=>!!v || 'Este campo es requerido'],
        // programa: [v=>!!v || 'Este campo es requerido'],
        // componentes: [v=>!!v || 'Este campo es requerido'],
        // presupuestoEstimado: [v=>!!v || 'Este campo es requerido'],
        documento: [(v: any) => !!v || 'Este campo es requerido'],
      },
    };

  public mounted() {

    proyectoService.comunidades().then((res) => this.comunidades = res);
     // proyectoService.getAllDimensiones();
    proyectoService.obtenerDatos(0).then((res) => this.dimensiones = res);


  }



  public select(value: number, id: number) {
    console.log(id);
    switch (value) {
      case 1:
        proyectoService.obtenerDatos(id).then((res) => {
          console.log(res);
          this.componentes = res; });
        break;
        case 2:
             proyectoService.obtenerDatos(id).then((res) => {
          console.log(res);
          this.estrategias = res; });
             break;
           case 3:
          proyectoService.obtenerDatos(id).then((res) => {
          console.log(res);
          this.programas = res; });
          break;

      default:
        break;
    }
  }


  public obtenerArchivo(e: any) {
    this.proyecto.documento = e;
    console.log(this.proyecto.documento);
  }



  public guardarProyecto() {

      const rawData = {
                nombre: this.proyecto.nombre,
                numeroFamilia: this.proyecto.numeroFamilia,
                PresupuestoEstimado: this.proyecto.PresupuestoEstimado,
                documento: this.proyecto.documento,
                // dimension:this.proyecto.dimension,
                // componente:this.proyecto.componente,
                // estrategia:this.proyecto.estrategia,
                // valorCofinanciador:this.proyecto.valorCofinanciador,
                // programa:this.proyecto.programa,
                // cofinanciador:this.proyecto.cofinanciador,
              };

      proyectoService.registrarPropuesta(this.proyecto).then((res) => {
          console.log(res);
          this.codigoGenerado = res; });


                }



}
