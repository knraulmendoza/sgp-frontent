import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './Registrar.vue';
import { Isgp } from "@/interfaces/interface";
import { sgpServices } from '@/services/sgpServices';
import {ValidationProvider, extend, ValidationObserver, withValidation} from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
  
  extend('required', {
    ...required,
    message: 'Este campo es obligatorio'
  });
@Component({
    name: 'AddSgp',
    mixins: [template],
    components:{ValidationProvider, ValidationObserver},
    $_veeValidate:{ validator: "new" }
})

export default class AddSgp extends Vue {
    search='';
    sgps:Isgp[] = [];
    sgp:Isgp = <Isgp>{};
    valid = true;
    lazy= false;
    headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'id',
        },
        { text: 'Valor sgp', value: 'valor' },
        { text: 'Archivo SGP', value: 'archivoValor' },
        { text: 'Intereses', value: 'interes' },
        { text: 'Archivo Interes', value: 'archivoInteres', sortable: false  },
        { text: 'mes', value: 'mes' },
        { text: 'Acción', value: 'action', sortable: false },
    ];
    meses = [
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
    ]
    mounted(){
      let i = 0;
      this.sgps = sgpServices.consultar();
      sgpServices.consultar().forEach((sgp, index) => {
        index += 1;
        this.meses.splice(sgp.mes-index, 1);
      });
    }
    dialog = false;
    editedIndex = -1;
    editedItem: Isgp = <Isgp>{};
    defaultItem:Isgp = <Isgp>{};
    sgpValidaciones = {
        valor: [
            (v : any) => !!v || 'Este campo es obligatorio',            
        ],
        interes: [
            (v : any) => !!v || 'Este campo es obligatorio',
        ],
        archivoValor: [
            (v : any) => {
              v == null || 'Este campo es obligatorio'
              !!v || 'Este campo es obligatorio'
            },
        ],
        archivoInteres: [
            (v : any) => !!v || 'Este campo es obligatorio',
        ],
        mes: [
          (v : any) => !!v || 'Este campo es obligatorio',
      ],
    }
    get formTitle () {
        return this.editedIndex === -1 ? 'Nuevo SGP' : 'Editar SGP';
    }

    saveSgp(){
      console.log((this.$refs.obs as Vue & { validate: () => boolean }).validate().valueOf());
      console.log(this.sgp);
    }
    

    editItem (sgp: Isgp) {
      this.editedIndex = this.sgps.indexOf(sgp)
      this.sgp = Object.assign({}, sgp)
      this.dialog = true
    }
    deleteItem (sgp: Isgp) {
      const index = this.sgps.indexOf(sgp)
      confirm('Estas seguro eliminar este dato?') && this.sgps.splice(index, 1)
    }

    close () {
      // (this.$refs.obs as Vue & { validate: () => boolean }).reset();
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.sgps[this.editedIndex], this.editedItem)
      } else {
        this.sgps.push(this.editedItem)
      }
      this.close()
    }
}