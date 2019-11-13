import Vue from 'vue';
import { IProyecto, ITransaccion } from '../../interfaces/interface';
import { proyectoService } from '../../services/proyectoService';
import Component from 'vue-class-component';
import template from './RegistrarGasto.vue';
@Component({
    mixins: [template],
})
export default class RegisterGasto extends Vue {
    public proyectosConRP: IProyecto[] = [{ Codigo: '000-oik', Actividades: undefined, Comunidades: undefined, FechaCierre: undefined, FechaDeCierrePrevista: new Date(), FechaEjecucion: new Date(), PresupuestoAprovado: 546565, PresupuestoEjecutado: 35648, Programa: undefined, Propuesta: undefined, ProyectoState: 1 }];
    public proyectoARegistrarGasto: IProyecto = {} as IProyecto;
    public gastosProyecto: ITransaccion[] = [{ Monto: 2300, Fecha: new Date(), Tipo: 1,Proyecto:this.proyectoARegistrarGasto}];
    public gastoProyecto: ITransaccion = {} as ITransaccion;
    public headersProyectosRP = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
            width: '1%',
        },
        { text: 'Codigo', value: 'Codigo', width: '10%' },
        { text: 'Nombre', value: 'Nombre', width: '44%' },
        { text: 'Estado', value: 'ProyectoState', width: '15%' },
        {
            text: 'Presupuesto Aprobado',
            value: 'PresupuestoAprobado',
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
        { text: 'Gasto', value: 'Monto' },
        { text: 'Concepto', value: 'Concepto' },
        { text: 'Fecha', value: 'Fecha' },
    ];

    public search = '';
    public itemsPerPageGastos = 3;
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public valorGasto: number = 0;
    public montoIncorrecto: boolean = true;
    public conceptoIncorrecto: boolean = false;
    public presupuestoDisponible: number = 0;
    public conceptoDeGasto: string = '';
    public gastoIncorrecto: boolean = true;
    public validarMonto(value: number) {
        if (
            value >
            this.proyectoARegistrarGasto.PresupuestoAprobado -
            this.proyectoARegistrarGasto.PresupuestoEjecutado || value <= 0
        ) {
            this.montoIncorrecto = true;
            return 'Especifique un monto adecuado';
        } else {
            this.montoIncorrecto = false;
        }
        return this.montoIncorrecto;
    }
    public validarTextArea(value: string) {
        let lenghtMaximo = 100;
        if (value.length > lenghtMaximo) {
            this.conceptoIncorrecto = true;
            return 'max-lenght'
        } else {
            return this.conceptoIncorrecto = false;
        }
    }
    get gastoCorrecto() {
        if (!this.montoIncorrecto && !this.conceptoIncorrecto) {
            this.gastoIncorrecto = false;
        } else {
            this.gastoIncorrecto = true;
        }
        return this.gastoIncorrecto;

    }
    public accionarGasto(item: any) {
        this.editedIndex = this.proyectosConRP.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModal(item);
    }
    public abrirModal(item: any) {
        this.dialog = true;
        this.proyectoARegistrarGasto = this.proyectosConRP[this.editedIndex];        
        this.GetGastoDeProyecto(this.proyectoARegistrarGasto);
    }
    public GetGastoDeProyecto(proyectoARegistrarGasto: IProyecto) {
        proyectoService
            .GetGastosProyecto(this.proyectoARegistrarGasto)
            .then((res) => {
                this.gastosProyecto = res;
            }, (error) => {
                console.log(error);
            });
    }
    get renderPresupuestoDisponible() {
        return this.presupuestoDisponible =
            this.proyectoARegistrarGasto.PresupuestoAprobado - this.proyectoARegistrarGasto.PresupuestoEjecutado;

    }
    public registrarGasto() {
        let tipoEgreso = 1;
        this.gastoProyecto = {
            Monto: Number.parseFloat(this.valorGasto.toString()),
            Fecha: new Date(),
            Proyecto: this.proyectoARegistrarGasto,
            Tipo: tipoEgreso,
        };
        proyectoService.RegistrarGasto(this.gastoProyecto);
        this.actualizarListaProyectosConRP(this.proyectoARegistrarGasto.Id);
    }
    public actualizarListaProyectosConRP(idProyecto: number) {
        proyectoService.GetProyectoPorId(idProyecto).then((Response) => {
            this.proyectosConRP[this.editedIndex] = Response
        }, (error) => console.log(error));
        this.GetGastoDeProyecto(this.proyectoARegistrarGasto);
    }
    public mounted() {
        let estadoContratado = 4;
        proyectoService.GetProyectosPorEstado(estadoContratado).then((res) => {
            this.proyectosConRP = res;
        }, (error) => { console.log(error); });
    }
}

