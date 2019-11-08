import Vue from 'vue';
import { IProyecto, ITransaccion } from '../../interfaces/interface';
import { proyectoService } from '../../services/proyectoService';
import Component from 'vue-class-component';
import template from './RegistrarGasto.vue';
@Component({
    mixins: [template],
})
export default class RegisterGasto extends Vue {
    public proyectosConRP: IProyecto[] = [];
    public proyectoARegistrarGasto: IProyecto = {} as IProyecto;
    public gastosProyecto: ITransaccion[] = [];
    public gastoProyecto: ITransaccion = {} as ITransaccion;
    public headersProyectosRP = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
            width: '1%',
        },
        { text: 'Codigo', value: 'codigo', width: '10%' },
        { text: 'Nombre', value: 'nombre', width: '44%' },
        { text: 'Estado', value: 'proyectoState', width: '15%' },
        {
            text: 'Presupuesto Aprobado',
            value: 'presupuestoAprobadoString',
            width: '15%',
            align: 'center',
        },
        {
            text: 'Realizar Gasto',
            value: 'actionDeGasto',
            width: '15%',
            sortable: false,
            align: 'center',
        },
    ];
    public headersGastos = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
        },
        { text: 'Gasto', value: 'Gasto' },
        { text: 'Fecha', value: 'Fecha' },
    ];


    public search = '';
    public itemsPerPageGastos = 3;
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public valorGasto: number = 0;
    public gastoPermitido: boolean = false;
    public validarMonto(value: number) {
        if (!/^([0-9])*$/.test(value.toString())) {
            console.log('entro');

            this.gastoPermitido = false;
            return 'No puede tener caracteres';
        } else {
            this.gastoPermitido = true;
            console.log('aca');

        }

        if (value > (this.proyectoARegistrarGasto.PresupuestoAprovado - this.proyectoARegistrarGasto.PresupuestoEjecutado)) {
            this.gastoPermitido = true;
            return 'No puede sobrepasar el monto disponible';
        } else {
            this.gastoPermitido = false;
        }
        return this.gastoPermitido;
    }
    public accionarGasto(item: any) {
        this.editedIndex = this.proyectosConRP.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModal(item);
    }
    public abrirModal(item: any) {
        this.dialog = true;
        this.proyectoARegistrarGasto = this.proyectosConRP[this.editedIndex];
        proyectoService
            .GetGastosProyecto(this.proyectoARegistrarGasto)
            .then((res) => {
                this.gastosProyecto = res;
            });
    }
    public registrarGasto() {
        this.gastoProyecto = {
            Monto: this.valorGasto,
            Fecha: new Date(),
            Proyecto: this.proyectoARegistrarGasto,
            id: this.editedIndex,
        };
        proyectoService.RegistrarGasto(this.gastoProyecto);
    }
    public mounted() {
        proyectoService.GetProyectosRP().then((res) => {
            this.proyectosConRP = res;
        });
    }
}
