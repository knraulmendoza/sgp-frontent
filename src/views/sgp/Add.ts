import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import template from './Registrar.vue';
import { Isgp } from "@/interfaces/interface";
import { sgpServices } from '@/services/sgpServices';
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from 'vuelidate/lib/validators';

@Component({
    name: 'AddSgp',
    mixins: [template, validationMixin],
    validations: {
      sgp : {
        valor: { required,  },
        interes: { required, },
        archivoValor: { required },
        archivoInteres: { required },
        mes: {required}
      }
    }
})
export default class AddSgp extends Vue {
    search=''
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
        return this.editedIndex === -1 ? 'Nuevo SGP' : 'Editar SGP'
    }

    get archivoValorErrors () {
      const errors:any[] = []
      if (!this.$v.sgp.archivoValor.$dirty) return errors
      !this.$v.sgp.archivoValor.required && errors.push('You must agree to continue!')
      return errors;
    }
    get archivoInteresErrors () {
      const errors:any[] = []
      if (!this.$v.sgp.archivoInteres.$dirty) return errors
      !this.$v.sgp.archivoInteres.required && errors.push('You must agree to continue!')
      return errors;
    }
    get valorErrors () {
      const errors:any[] = []
      if (!this.$v.sgp.valor.$dirty) return errors
      !this.$v.sgp.valor.required && errors.push('You must agree to continue!')
      return errors;
    }
    get interesErrors () {
      const errors:any[] = []
      if (!this.$v.sgp.interes.$dirty) return errors
      !this.$v.sgp.interes.required && errors.push('You must agree to continue!')
      return errors;
    }
    get mesErrors () {
      const errors:any[] = []
      if (!this.$v.sgp.mes.$dirty) return errors
      !this.$v.sgp.mes.required && errors.push('You must agree to continue!')
      return errors;
    }

    saveSgp(){
      alert('bien');
      this.$v.$touch()
        if (this.$v.$invalid) {
          alert('Falta campos por llenar')
        }
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