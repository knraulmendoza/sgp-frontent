import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import template from './RegistrarProyecto.vue';
import { propuestaService } from '../../services/PropuestaService';
import { IPropuesta, IDocumento } from '@/interfaces/interface';
import currency from 'v-currency-field';
import swal from 'sweetalert';
import { globalServices } from '../../services/globalService';



@Component({
  name: 'RegistrarProyecto',
  mixins: [template],
  directives: { currency_config: currency },
})
export default class RegistrarProyecto extends Vue {

  public codigoGenerado = 'Por Definir';
  public registrado: string = '';
  public validarDocumento = "";
  public valid = true;
  public lazy = false;
  public currency_config = {}
  public propuesta: IPropuesta = <IPropuesta>{};
  public documento: IDocumento = <IDocumento>{};
  public validacionPropuesta = {
    Nombre: [
      (v: any) => !!v || 'Nombre es requerido',
      (v: any) => (v && v.length >= 5) || 'Debe tener minimo 10 caracteres',
    ],
    NumeroDeFamilia: [
      (v: any) => !!v || 'Este Campo es requerido',
      (v: any) => (v && Number(v) == 0) && 'Debe indicar el número de familiar a favorcer',
      (v: any) => /^[0-9]+$/.test(v) || 'Solo Numeros',
      // v => /^[0-9]+$/!.test(v) && 'Debe indicar el número de familiar a favorcer',
    ],

    presupuestoEstimado: [
      (v: any) => !!v || 'Este campo es requerido',
      (v: any) => (v && Number(v) == 0) && 'Indique presupuesto',
    ],
    Documento: [
      (v: any) => !v || v.size > 0 || 'Este campo es requerido',
    ],

  };





  // public validate() {
  // if(this.proyecto.Documento==""|| this.proyecto.Documento==null){
  //   console.log("proyecto "+this.proyecto.Documento); 
  //   this.validarDocumento="Documento requerido";
  // }else
  //   this.guardarProyecto();
  // }
  public validarCampoNegativo(value: string) {
    let val = globalServices.sanearMonto(value)
    if (val <= 0) {
      return "Especifique un monto adecuado";
    } else {
      return false;
    }
  }
  public mounted() {
    propuestaService.getData();
    this.propuesta.presupuestoEstimado=0.01;
    // proyectoService.comunidades().then(res=>this.comunidades = res);
    // proyectoService.getAllDimensiones();
    // proyectoService.obtenerDatos(0).then(res=>this.dimensiones = res);
    // proyectoService.cofinanciador().then(res=>this.cofinanciamiento = res);


  }


  public resetValidation() {

    (<any>this.$refs.form).reset();
    this.propuesta = <IPropuesta>{};
    this.documento = <IDocumento>{};
  }


  public obtenerArchivo(e: any) {
    if (e !== null && e !== undefined && e.length !== 0) { //esto valida si el input-file tiene dato o no
      this.documento.nombre = e.name
      this.documento.rawData = null;
      let reade = new FileReader();
      reade.onloadend = (_) => {
        this.documento.respaldoFisicoDigitalizado = new String(reade.result).valueOf(); //convertir el archivo en base64
      };
      reade.readAsDataURL(e);
      this.propuesta.documento = this.documento;
    } else {
      this.propuesta.documento = <IDocumento><unknown>undefined;
    }
  }

  public guardarProyecto() {
    this.propuesta.fechaDeRegistro = new Date();
    this.propuesta.numeroDeFamilias = Number.parseInt(this.propuesta.numeroDeFamilias.toString());
    this.propuesta.presupuestoEstimado = parseFloat((Math.round(this.propuesta.presupuestoEstimado * 100) / 100).toString());
    propuestaService.registrarPropuesta(this.propuesta).then((res) => {
      // this.codigoGenerado = res;
      if (res == null) {
        console.error('error');
        swal({ title: "No se pudo registrar", icon: 'error' })
            .then((value) => {
                console.error('errpr');
            });
    } else {
        swal({
            title: "Propue  sta Registrada",
            icon: "success",
        }).then(_ => {
          (<any>this.$refs.form).reset();
          this.propuesta = <IPropuesta>{};
          this.documento = <IDocumento>{};
        });
        // this.registrado = 'exitoso';
        console.log('ok');
        // this.codigoGenerado = res;
    }



      
    });
  }
}
