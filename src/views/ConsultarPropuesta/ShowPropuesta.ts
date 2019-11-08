import Vue from 'vue';
import Component from 'vue-class-component';
import { IPropuesta, Iprograma, IProyecto } from '../../interfaces/interface';
import template from './ConsultarPropuesta.vue';
import { propuestaService } from '../../services/PropuestaService';
import { proyectoService } from '../../services/proyectoService';
import RegistrarProyecto from '../RegistrarProyecto/AddProyecto';

@Component({
    mixins: [template],
})
export default class ShowProyecto extends Vue {



    public headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
        },
        { text: 'Nombre', value: 'nombre' },
        {
            text: 'Presupuesto Estimado',
            value: 'presupuestoEstimado',
            align: 'center',
        },
        {
            text: 'Numero de Familias Beneficiadas',
            value: 'numeroFamiliasBeneficiadas',
            align: 'center',
        },
        {
            text: 'Fecha de presentacion',
            value: 'fechaPresentacion',
            align: 'center',
            color: 'green',
        },
        {
            text: 'Documento',
            value: 'verPDF',
            sortable: false,
            align: 'center',
        },
        {
            text: 'Aprobar Propuesta',
            value: 'actionAprobarPropuesta',
            sortable: false,
            align: 'center',
        },
    ];
    public propuestas: IPropuesta[] = [];
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public search = '';
    public itemsPerPage: number = 5;
    public dialogAprobarPropuesta = false;
    public presupuesto: number = 0;
    public dimensiones: any[] = [];
    public comunidades: any[] = [];
    public estrategias: any[] = [];
    public programas: any[] = [];
    public componentes: any[] = [];
    public cofinanciamiento: any[] = [];
    public proyecto: IProyecto = {} as IProyecto;
    public propuesta: IPropuesta = {} as IPropuesta;

    public items = [
        {},
    ];




    public editItem(item: any) {
       this.editedIndex = this.propuestas.indexOf(item);
       this.editedProyecto = Object.assign({}, item);
       this.abrirModal(item);
    }
    public aprobarPropuesta(item: IPropuesta) {
        this.presupuesto = item.PresupuestoEstimadoDouble;
        this.editedIndex = this.propuestas.indexOf(item);
        this.propuesta = this.propuestas[this.editedIndex];
        this.abrirModalAprobarPropuesta();
    }
    public abrirModalAprobarPropuesta() {

        this.dialogAprobarPropuesta = true;
    }

    public abrirModal(item: any) {
        this.dialog = true;
        this.propuesta = item;
    }
    public showPDF(item: any) {
        this.propuesta = item;
        propuestaService.getPDFProyecto(this.propuesta);
    }


    public mounted() {
        propuestaService.getData().then((res) => (this.propuestas = res));
        proyectoService.obtenerDatos(0, 'Dimensiones').then((res) => this.dimensiones = res);
        proyectoService.obtenerDatos(0, 'proyecto').then((res) => this.comunidades = res);

    }

    public select(value: number, id: number) {
        console.log(id);
        switch (value) {

          case 1:
            proyectoService.obtenerDatos(id, 'Componente').then((res) => {
              console.log(res);
              this.componentes = res; });
            break;
            case 2:
                 proyectoService.obtenerDatos(id, 'Estrategias').then((res) => {
              console.log(res);
              this.estrategias = res; });
                 break;
               case 3:
              proyectoService.obtenerDatos(id, 'Programas').then((res) => {
              console.log(res);
              this.programas = res; });
              break;

          default:
            break;
        }
      }
      public registrarProyecto() {
            this.proyecto.Propuesta = this.propuesta;
            this.proyecto.PresupuestoAprovado = Number( this.presupuesto);



      }






}
