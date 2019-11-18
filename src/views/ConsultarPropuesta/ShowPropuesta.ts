import Vue from 'vue';
import Component from 'vue-class-component';
import { IPropuesta, Iprograma, IProyecto, IComunidad } from '../../interfaces/interface';
import template from './ConsultarPropuesta.vue';
import { propuestaService } from '../../services/PropuestaService';
import { proyectoService } from '../../services/proyectoService';
import swal from 'sweetalert';
import { VMoney } from "v-money";
import { globalServices } from '../../services/globalService';

@Component({
    mixins: [template],
    directives:{money: VMoney}
})
export default class ShowProyecto extends Vue {
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'num',
        },
        { text: 'Nombre', value: 'nombre' },
        {
            text: 'Presupuesto Estimado',
            value: 'presupuestoEstimado',
            align: 'right',
        },
        {
            text: 'Numero de Familias Beneficiadas',
            value: 'numeroDeFamilias',
            align: 'center',
        },
        // {
        //     text: 'Fecha de presentacion',
        //     value: 'fechaDePresentacion',
        //     align: 'center',
        //     color: 'green',
        // },
        {
            text: 'Documento',
            value: 'verPDF',
            sortable: false,
            align: 'center',
        },
        {
            text: 'Aprobar Propuesta',
            value: 'actionAprobarPropuesta',
            sortable: false,
            align: 'center',
        },
    ];
    public valid = true;
    public lazy = false;
    public propuestas: IPropuesta[] = [];
    public editedIndex = -1;
    public editedProyecto = {};
    public dialog = false;
    public search = '';
    public itemsPerPage: number = 5;
    public dialogAprobarPropuesta = false;
    public presupuesto: number = 0;
    public dimensiones: any[] = [];
    public comunidades: any[] = [];
    public estrategias: any[] = [];
    public programas: any[] = [];
    public componentes: any[] = [];
    public cofinanciamiento: any[] = [];
    public proyecto: IProyecto = {} as IProyecto;
    public propuesta: IPropuesta = {} as IPropuesta;
    public programa: Iprograma={} as Iprograma;
    public items = [{}];

    money= {
        decimal: ',',
        thousands: '.',  
        precision: 2,
        masked: false
      }
    


    public validarCampos(value:string){

    }

    public validacionProyecto = {
        presupuestoAprobado:[   
            (v: number) => !!v || 'Este campo es obligatorio',
            // (v: number) => v>0 || 'Los interes no pueden ser negativos',
        ],
        dimension:[
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        componente:[
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        estrategia:[
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        programa:[
            (v: any) => !!v || 'Este campo es obligatorio',
        ],
        comunidad:[
            (v: any) => !!v || 'Este campo es obligatorio',
        ],

    
       
        
      };


    public editItem(item: any) {
        this.editedIndex = this.propuestas.indexOf(item);
        this.editedProyecto = Object.assign({}, item);
        this.abrirModal(item);
    }
    public aprobarPropuesta(item: IPropuesta) {
        this.presupuesto=0;
        this.presupuesto = item.presupuestoEstimado;
        console.log("presupuesto",this.presupuesto);
        
        this.editedIndex = this.propuestas.indexOf(item);
        this.propuesta = this.propuestas[this.editedIndex];
        this.abrirModalAprobarPropuesta();
    }
    public abrirModalAprobarPropuesta() {
        this.dialogAprobarPropuesta = true;
    }

    public abrirModal(item: any) {
        this.dialog = true;
        this.propuesta = item;
    }
    public showPDF(item: IPropuesta) {
        console.log(item);
        propuestaService.getPDFProyecto(item.documentoId);
    }

    public mounted() {
        
        propuestaService.getData().then(
            (res) => {
                this.propuestas = res;
            },
            (error) => {
                console.log(error);
            },
        );
        proyectoService.obtenerDatos(0, 'dimension').then(
            (res) => {
                res.forEach(element => {
                    this.dimensiones.push({value:element.id, text:element.nombre});
                    // this.dimensiones=[{value:element.id, text:element.nombre}];
                });
                // this.dimensiones = res;
            },
            (error) => {
                console.log(error);
            },
        );
        proyectoService.obtenerDatos(0, 'comunidad').then(

            (res) => {
               

                res.forEach(element => {
                    this.comunidades.push({value:element.id, text:element.nombre});
                    // this.dimensiones=[{value:element.id, text:element.nombre}];
                });
               
            },
            (error) => {
                console.log(error);
            },
        );
    }

    public select(value: number, id: number) {
        console.log("id",id);
        
        switch (value) {
            case 1:
                proyectoService.obtenerDatos(id, 'Dimension').then((res) => {
                    console.log("res",res.componentes);
                    
                    res.componentes.forEach(element => {
                        this.componentes.push({value:element.id, text:element.nombre});
                        // this.dimensiones=[{value:element.id, text:element.nombre}];
                    });
                    
                });
                break;
            case 2:
                proyectoService.obtenerDatos(id, 'Componente').then((res) => {
                    res.estrategias.forEach(element => {
                        this.estrategias.push({value:element.id, text:element.nombre});
                        // this.dimensiones=[{value:element.id, text:element.nombre}];
                    });
                });
                break;
            case 3:
                proyectoService.obtenerDatos(id, 'Estrategia').then((res) => {
                    res.programas.forEach(element => {
                        this.programas.push({value:element.id, text:element.nombre});
                        // this.dimensiones=[{value:element.id, text:element.nombre}];
                    });

                });
                break;

            default:
                break;
        }
    }

    public registrarProyecto() {
        
        this.proyecto.presupuestoAprobado= globalServices.sanearMonto(this.presupuesto.toString());
       console.log("PRESUPUESTO APROBADO",this.proyecto.presupuestoAprobado);
       
        this.proyecto.propuestaId=this.propuesta.id;
            proyectoService.add(this.proyecto).then((res) => {
                console.log("respuesta",res);
                
                
                if (res == null) {
                    console.error('error');
                    swal({title: "No se pudo registrar", icon:'error'})
                      .then((value) => {
                        console.error('errpr');
                    });
                } else {
                  swal({
                    title: "Propuesta Aceptada",
                    icon: "success",
                  }).then(_=>{
                    //this.$refs.form.resetValidation();
                    
                    this.proyecto = <IProyecto>{};
                    (<any>this.$refs.form).reset(); // resetea todo el formulario pero para el input-file toco colocar una ref para que lo detectara revicen el .vue
                    this.dialogAprobarPropuesta = false;
                  });
                  // this.registrado = 'exitoso';
                  console.log('ok');
                  // this.codigoGenerado = res;
                }
            });    

        
        
    }
}
