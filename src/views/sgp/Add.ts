import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import template from './Registrar.vue';
import { Isgp, IDocumento } from '@/interfaces/interface';
import { sgpServices } from '@/services/sgpServices';
import swal from 'sweetalert';
import {VMoney} from 'v-money';
import { globalServices } from '@/services/globalService';


@Component({
    name: 'AddSgp',
    mixins: [template],
    directives: {money: VMoney}
})
export default class AddSgp extends Vue {

    public money = {
      decimal: ',',
          thousands: '.',
          precision: 2,
          masked: false
    }
    get formTitle() {
        return this.editedIndex === -1 ? 'Nuevo SGP' : 'Editar SGP';
    }
    expanded = [];
    public search = '';
    public sgps: Isgp[] = [];
    public sgp: Isgp = <Isgp>{};    
    public valid = true;
    public mes: number = -1;
    public mesDato = null;
    public fecha = new Date();
    public lazy = false;
    public valor:string = "";
    public interes:string = "";
    public soporteValor: IDocumento = <IDocumento>{}; // documento del valor toca crear una variable para cada documento y que sea de tipo IDocumento despues se le asigna al objeto
	  public soporteInteres: IDocumento = <IDocumento>{};
    public headers = [
        { text: 'Valor sgp', value: 'valor' },
        { text: 'Intereses', value: 'interes' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Mes', value: 'fecha' },
        { text: 'Documento valor', value: 'soporteValor', align: 'center' },
        { text: 'Documento Interes', value: 'soporteInteres', align: 'center' },
        // { text: 'Acción', value: 'action', sortable: false },
    ];
    public showMmeses = [
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
    ]
    public dialog = false;
    public editedIndex = -1;
    public editedItem: Isgp = {} as Isgp;
    public defaultItem: Isgp = {} as Isgp;
    public sgpValidaciones = {
        valor: [
            (v: any) => !!v || 'Este campo es obligatorio',
            // (v: any) => v>0 || 'El valor no pueden ser negativos',
        ],
        interes: [
            (v: any) => !!v || 'Este campo es obligatorio',
            // (v: any) => v>0 || 'Los interes no pueden ser negativos',
        ],
        soporteInteres: [
          (v: any) => !v || v.size > 0 || 'Este campo es obligatorio'
        ],
        soporteValor: [
          (v: any) => !v || v.size > 0 || 'Este campo es obligatorio'
        ],
        mes: [
          (v: any) => !!v || 'Este campo es obligatorio',
      ],
    };
  
    public mounted() {
    const i = 0;
    this.showSgps();
  }

  showSgps(){
    const year = new Date().getFullYear();
    sgpServices.consultar().then((a) => {
		console.log(a);
      this.sgps = a;
      let i = 0;
      this.sgps.forEach((sgp, index) => {
          sgp.fecha = new Date(sgp.fecha.toString());
          console.log(sgp.fecha);
          if (sgp.fecha.getFullYear() === year) {
            i++;
            this.mes = sgp.fecha.getMonth() + 1;
            this.meses.splice(this.mes - i, 1); 
          }
        });
      },
    );
  }

  public obtenerArchivoValor(e: any) {
    if (e !== null && e !== undefined && e.length !== 0) { //esto valida si el input-file tiene dato o no
      this.soporteValor.nombre = e.name
      this.soporteValor.rawData = null;
      let reade = new FileReader();
          reade.onloadend = (_)=>{
          this.soporteValor.respaldoFisicoDigitalizado = new String(reade.result).valueOf(); //convertir el archivo en base64
        };
        reade.readAsDataURL(e);
      this.sgp.soporteValor = this.soporteValor;
    }else{
      this.sgp.soporteValor = <IDocumento><unknown>undefined;
    }
  }
  public obtenerArchivoInteres(e: any) {
    if (e !== null && e !== undefined && e.length !== 0) {
      this.soporteInteres.nombre = e.name;
      this.soporteInteres.rawData = null;
      let reade = new FileReader();
          reade.onloadend = (_)=>{
          this.soporteInteres.respaldoFisicoDigitalizado = new String(reade.result).valueOf(); //convertir el archivo en base64
        };
          reade.readAsDataURL(e);
      this.sgp.soporteInteres = this.soporteInteres;
    }else {
      this.sgp.soporteInteres = <IDocumento><unknown>undefined;
    }
  }
  public obtenerMes(e: any) {
    this.sgp.fecha = new Date(this.fecha.getFullYear(), e - 1, this.fecha.getDay());
  }
  
  public showPDFValor(item: Isgp) {
    sgpServices.getPDFProyecto(item.soporteValorId);
  }
  public showPDFInteres(item: Isgp) {
    sgpServices.getPDFProyecto(item.soporteInteresId);
  }
  public saveSgp() {
    if (this.sgp.soporteInteres == undefined || this.sgp.soporteValor == undefined) {
      swal({title: "Faltan los archivos", icon:'error'})
        .then((value:any) => {
          console.error('errpr');
      });
    }else {
      // this.sgp.valor = parseFloat(this.sgp.valor.toString())*1000;
      // this.sgp.interes = parseFloat(this.sgp.interes.toString())*1000;
      //   this.sgp.valor = parseFloat((Math.round(this.sgp.valor * 100) / 100).toString());
      // this.sgp.interes = parseFloat((Math.round(this.sgp.interes * 100) / 100).toString()+'.00');
        // this.sgp.valor = parseFloat((Math.round(globalServices.sanearMonto(this.sgp.valor.toString() * 100) / 100).toString()));
        // this.sgp.valor = parseFloat((Math.round(globalServices.sanearMonto(this.sgp.valor * 100) / 100)).toString());
        // let interes = globalServices.sanearMonto(this.sgp.interes.toString());
        this.sgp.valor = globalServices.sanearMonto(this.valor);
        this.sgp.interes = globalServices.sanearMonto(this.interes);
        console.log(this.sgp);
        sgpServices.add(this.sgp).then((res) => {
          if (res == null) {
              console.error('error');
              swal({title: "No se pudo registrar", icon:'error'})
                .then((value:any) => {
                  console.error('errpr');
              });
          } else {
            swal({
              title: "Se ha registrado un nuevo SGP",
              icon: "success",
            }).then((value:any)=>{
              //this.$refs.form.resetValidation();
              this.showSgps();
              this.sgp = <Isgp>{};
              this.soporteInteres = <IDocumento>{};
              this.soporteValor = <IDocumento>{};
              (<any>this.$refs.form).reset(); // resetea todo el formulario pero para el input-file toco colocar una ref para que lo detectara revicen el .vue
              this.dialog = false;
            });
            // this.registrado = 'exitoso';
            console.log('ok');
            // this.codigoGenerado = res;
          }
      });      
    }
    
  }

  public getMesText(sgp:Isgp){
    return this.showMmeses.filter((mes)=>{ return mes.value === sgp.fecha.getMonth()+1})[0].text;
  }


  public editItem(sgp: Isgp) {
    console.log(sgp);
    this.editedIndex = this.sgps.indexOf(sgp);
    this.sgp = Object.assign({}, sgp);
    this.dialog = true;
  }
  public deleteItem(sgp: Isgp) {
    const index = this.sgps.indexOf(sgp);
    // confirm('Estas seguro eliminar este dato?') && this.sgps.splice(index, 1);
    this.sgps.splice(index, 1);
    sgpServices.delete(sgp);
  }

  public close() {
    console.log(parseFloat((Math.round(this.sgp.valor * 100) / 100).toString())+'.00')
    console.log(globalServices.sanearMonto(this.sgp.valor.toString()));
    console.log(parseFloat(this.sgp.valor.toString())*1000);
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
