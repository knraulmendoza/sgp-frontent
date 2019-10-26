import Vue from 'vue';
import Component from 'vue-class-component';
import { Iproyecto } from '../../interfaces/interface';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import template from './consultarProyecto.vue';

const BASE_URL: string = 'https://localhost:5001/api/proyecto';
@Component({
    mixins: [template],
})
export default class ShowProyecto extends Vue {
    public proyecto: Iproyecto = {} as Iproyecto;
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
        },
        { text: 'Código', value: 'codigo' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Estado', value: 'estado' },
        { text: 'Acción', value: 'action', sortable: false },
        { text: 'Archivo', value: 'verPDF', sortable: false },
    ];
    public proyectos: Iproyecto[] = [];
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public search = '';
    public itemsPerPage: number = 5;

    public editItem(item: any) {
        this.editedIndex = this.proyectos.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModal(item);
    }
    public abrirModal(item: any) {
        this.dialog = true;
        this.proyecto = item;
    }
    public showPDF(item: any) {
        this.proyecto = item;
        this.getPDFProyecto(this.proyecto.id);
    }
    public async getData() {
        await axios.get(BASE_URL).then((response: AxiosResponse) => {
            this.proyectos = response.data.map((val: any) => ({
                codigo: val.codigo,
                nombre: val.nombre,
                estado: val.estado,
                id: val.id,
            }));
        });
    }
    public async getPDFProyecto(id: number) {
        let urlPDF: string = '';
        await axios
            .get(BASE_URL + '/' + id, { responseType: 'blob' })
            .then(({ data }) => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const link = document.createElement('a');
                console.log(blob);
                urlPDF = window.URL.createObjectURL(blob);
                link.href = urlPDF;
                // link.setAttribute('download', 'file.pdf');
                // link.download = "donwload.pdf";
                link.target = '_blank';
                link.click();
                document.body.appendChild(link);
                console.log(urlPDF);
            })
            // tslint:disable-next-line: no-console
            .catch((error) => console.error(error));
        return urlPDF;
    }
    public mounted() {
        this.getData();
    }
}