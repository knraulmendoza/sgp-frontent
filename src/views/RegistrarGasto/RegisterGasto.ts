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
    public headersProyectosRP = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
        },
        { text: 'Codigo', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Estado', value: 'proyectoState' },
        {
            text: 'Presupuesto Aprovado',
            value: 'presupuestoAprovado',
            align: 'center',
        },
        {
            text: 'Realizar Gasto',
            value: 'actionDeGasto',
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
    public reglasMonto = [
        (value) => (value || '').length <= 20 || 'Maximo 20 caracteres',
        (value) => {
            const pattern = /^([0-9])*$/;
            return pattern.test(value) || 'Solo numeros';
        },
        (value) =>
            value > this.proyectoARegistrarGasto.presupuestoAprovado ||
            'No puede sobrepasar el monto disponible',
    ];
    public search = '';
    public itemsPerPageGastos = 3;
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public accionarGasto(item: any) {
        this.editedIndex = this.proyectosConRP.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModal(item);
    }
    public abrirModal(item: IProyecto) {
        this.dialog = true;
        this.proyectoARegistrarGasto = this.proyectosConRP.filter((p) => {
            return p.codigo === item.codigo;
        })[0];
        console.log(
            'presup:',
            this.proyectoARegistrarGasto.presupuestoAprovado,
        );
        proyectoService
            .GetGastosProyecto(this.proyectoARegistrarGasto)
            .then((res) => {
                this.gastosProyecto = res;
            });
    }
    public mounted() {
        proyectoService.GetProyectosRP().then((res) => {
            this.proyectosConRP = res;
        });
    }
}
