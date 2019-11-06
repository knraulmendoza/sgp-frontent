import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './Registrar.vue';
import { Isgp } from '@/interfaces/interface';
import { sgpServices } from '@/services/sgpServices';
import {ValidationProvider, extend, ValidationObserver, withValidation} from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Este campo es obligatorio',
  });
@Component({
    name: 'AddSgp',
    mixins: [template],
    components: {ValidationProvider, ValidationObserver},
    $_veeValidate: { validator: 'new' },
})

export default class AddSgp extends Vue {

    get formTitle() {
        return this.editedIndex === -1 ? 'Nuevo SGP' : 'Editar SGP';
    }
    public search = '';
    public sgps: Isgp[] = [];
    public sgp: Isgp = {} as Isgp;
    public valid = true;
    public mes: number = -1;
    public fecha = new Date();
    public archivoValor: Blob = new Blob([''], { type: 'application/pdf' });    public lazy = false;
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'id',
        },
        { text: 'Valor sgp', value: 'valor' },
        { text: 'Archivo SGP', value: 'soporteValor' },
        { text: 'Intereses', value: 'interes' },
        { text: 'Archivo Interes', value: 'soporteInteres', sortable: false  },
        { text: 'mes', value: 'fecha' },
        { text: 'Acción', value: 'action', sortable: false },
    ];
    public meses = [
      {text: 'Enero', value: 1},
      {text: 'Febrero', value: 2},
      {text: 'Marzo', value: 3},
      {text: 'Abril', value: 4},
      {text: 'Mayo', value: 5},
      {text: 'Junio', value: 6},
      {text: 'Julio', value: 7},
      {text: 'Agosto', value: 8},
      {text: 'Septiembre', value: 9},
      {text: 'Octubre', value: 10},
      {text: 'Noviembre', value: 11},
    ];
    public dialog = false;
    public editedIndex = -1;
    public editedItem: Isgp = {} as Isgp;
    public defaultItem: Isgp = {} as Isgp;
    public sgpValidaciones = {
        valor: [
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        interes: [
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        archivoValor: [
            (v: any) => {
              v == null || 'Este campo es obligatorio';
              !!v || 'Este campo es obligatorio';
            },
        ],
        archivoInteres: [
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        mes: [
          (v: any) => !!v || 'Este campo es obligatorio',
      ],
    };
    public mounted() {
      const i = 0;
      sgpServices.consultar().then((a) => {
        this.sgps = a;
        this.sgps.forEach((sgp, index) => {
          index += 1;
          this.mes = sgp.fecha.getMonth() + 1;
          this.meses.splice(this.mes - index, 1);
        });
      },
        );

    }
    public obtenerArchivoValor(e: any) {
      this.sgp.soporteValor = e.name;
    }

    public obtenerArchivoInteres(e: any) {
      this.sgp.soporteInteres = e.name;
    }

    public saveSgp() {
      console.log((this.$refs.obs as Vue & { validate: () => boolean }).validate().valueOf());
      this.sgp.fecha = new Date(this.fecha.getFullYear(), this.mes, this.fecha.getDay());

      sgpServices.add(this.sgp);
    }


    public editItem(sgp: Isgp) {
      this.editedIndex = this.sgps.indexOf(sgp);
      this.sgp = Object.assign({}, sgp);
      this.dialog = true;
    }
    public deleteItem(sgp: Isgp) {
      const index = this.sgps.indexOf(sgp);
      confirm('Estas seguro eliminar este dato?') && this.sgps.splice(index, 1);
    }

    public close() {
      // (this.$refs.obs as Vue & { validate: () => boolean }).reset();
      console.log(this.archivoValor.type);
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }

    public save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sgps[this.editedIndex], this.editedItem);
      } else {
        this.sgps.push(this.editedItem);
      }
      this.close();
    }
}
