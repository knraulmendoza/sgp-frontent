import Vue from 'vue';
import Component from 'vue-class-component';
import { IPropuesta } from '../../interfaces/interface';
import template from './consultarProyecto.vue';
import { propuestaService } from '../../services/PropuestaService';

@Component({
    mixins: [template]
})
export default class ShowProyecto extends Vue {
    public propuesta: IPropuesta = {} as IPropuesta;
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num'
        },
        { text: 'Nombre', value: 'nombre' },
        {
            text: 'Presupuesto Estimado',
            value: 'presupuestoEstimado',
            align: 'center'
        },
        {
            text: 'Numero de Familias Beneficiadas',
            value: 'numeroFamiliasBeneficiadas',
            align: 'center'
        },
        {
            text: 'Fecha de presentacion',
            value: 'fechaPresentacion',
            align: 'center',
            color: 'green'
        },
        {
            text: 'Editar',
            value: 'action',
            sortable: false,
            align: 'center',
            color: 'green'
        },
        {
            text: 'Documento',
            value: 'verPDF',
            sortable: false,
            align: 'center'
        },
        {
            text: 'Aprobar Propuesta',
            value: 'actionAprobarPropuesta',
            sortable: false,
            align: 'center'
        }
    ];
    public propuestas: IPropuesta[] = [];
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public search = '';
    public itemsPerPage: number = 5;
    public dialogAprobarPropuesta = false;

    public editItem(item: any) {
        this.editedIndex = this.propuestas.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModal(item);
    }
    public aprobarPropuesta(item: any) {
        this.editedIndex = this.propuestas.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModalAprobarPropuesta(item);
    }
    public abrirModalAprobarPropuesta(item: any) {
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
        propuestaService.getData().then(res => (this.propuestas = res));
    }
}
