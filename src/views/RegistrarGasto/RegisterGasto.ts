import Vue from 'vue';
import { IProyecto, ITransaccion } from '../../interfaces/interface';
import { proyectoService } from '../../services/proyectoService';
import Component from 'vue-class-component';
import template from './RegistrarGasto.vue';
import { VMoney } from 'v-money';
import { globalServices } from '../../services/globalService';

@Component({
    mixins: [template],
    directives: { money: VMoney }
})
export default class RegisterGasto extends Vue {
    public proyectosConRP: IProyecto[] = [];
    public proyectoARegistrarGasto: IProyecto = {} as IProyecto;
    public gastosProyecto: ITransaccion[] = [{ monto: 2300, fecha: new Date(), tipo: 1, ProyectoDeDestinoId: 1 }];
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
        { text: 'Nombre', value: 'nombre', width: '59%' },
        {
            text: 'Presupuesto Aprobado',
            value: 'presupuestoAprobado',
            width: '15%',
            align: 'right',
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
        { text: 'Gasto', value: 'monto' },
        { text: 'Concepto', value: 'concepto' },
        { text: 'Fecha', value: 'fecha' },
    ];

    public search = '';
    public itemsPerPageGastos = 3;
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public valorGasto: string = "";
    public montoIncorrecto: boolean = true;
    public conceptoIncorrecto: boolean = false;
    public presupuestoDisponible: number = 0;
    public conceptoDeGasto: string = '';
    public gastoIncorrecto: boolean = true;
    public money = {
        decimal: ',',
        thousands: '.',
        precision: 2,
        masked: false
    }


    public validarMonto(value: string) {
        console.log(value);

        let valorNumerico = globalServices.sanearMonto(value);
        let presupuestoDisponible = this.proyectoARegistrarGasto.presupuestoAprobado -
            this.proyectoARegistrarGasto.presupuestoEjecutado

        if (
            valorNumerico >
            presupuestoDisponible || valorNumerico <= 0
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
            this.proyectoARegistrarGasto.presupuestoAprobado - this.proyectoARegistrarGasto.presupuestoEjecutado;

    }
    public registrarGasto() {
        let tipoEgreso = 1;
        this.gastoProyecto = {
            monto: Number.parseFloat(this.valorGasto.toString()),
            fecha: new Date(),
            ProyectoDeDestinoId: this.proyectoARegistrarGasto.id,
            tipo: tipoEgreso,
        };
        proyectoService.RegistrarGasto(this.gastoProyecto);
        this.actualizarListaProyectosConRP(this.proyectoARegistrarGasto.id);
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
            console.log(this.proyectosConRP[5].nombre);

        }, (error) => { console.log(error); });

    }
}

