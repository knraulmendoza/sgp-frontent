import axios, { AxiosResponse } from 'axios';
import { IProyecto, ITransaccion, IFondos, Iprograma, IListaTransancionCDP } from '../interfaces/interface';

class ProyectoService {

  public url = 'api/propuesta/add';
  public urlProyecto = 'api/proyecto/';
  constructor() {

  }
  // metodos del CRUD
  public async obtenerDatos(value?: number) {
    let urlLocal: string = this.url;
    value == 0 ? urlLocal : urlLocal += `${value}`;
    console.log(urlLocal);

    const data = await axios
      .get(urlLocal)
      .then((response: AxiosResponse) => {

        let dato;
        if (Array.isArray(response.data)) {
          dato = response.data;
        } else {
          dato = [response.data];
        }
        return dato.map((val: any) => ({
          value: val.id,
          text: val.surname,
        }));
      });
    console.log('data: ' + data);
    return data;
  }


  public async comunidades() {
    let urlLocal: string = this.url;

    const data = await axios
      .get(urlLocal += 'comunidades')
      .then((response: AxiosResponse) => {
        console.log('response: ' + response);
        const dato = [response.data];
        return dato.map((val: any) => ({
          value: val.codigo,
          text: val.nombre,
        }));
      });

    return data;

  }

  public async cofinanciador() {
    let urlLocal: string = this.url;

    const data = await axios
      .get(urlLocal += 'confinanciador')
      .then((response: AxiosResponse) => {
        console.log('response: ' + response);
        const dato = [response.data];
        return dato.map((val: any) => ({
          value: val.codigo,
          text: val.nombre,
        }));
      });

    return data;

  }



   public async registrarPropuesta(rawData: any) {
     rawData = JSON.stringify(rawData);
     console.log('rawData: ' + rawData);

     const formData = new FormData();

     formData.append('propuesta', rawData);
     try {
              const response = await  axios.post(this.url,
              formData,
              {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
              });
              return response.data[0];
            } catch (e) {
                return null;
            }
        }





    public async GetProyectosRP() {
        let proyectosConRP: IProyecto[] = [];
        await axios.get(this.url).then((response: AxiosResponse) => {
            proyectosConRP = response.data.map((val: IProyecto) => ({
                codigo: val.codigo,
                nombre: val.nombre,
                presupuestoAprovado:
                    '$ ' +
                    new Intl.NumberFormat().format(val.presupuestoAprovado),
                proyectoState: val.proyectoStates,
                id: val.id,
            }));
        });
        console.log(proyectosConRP);

    }

    public async GetProyectosCDP(estado:number) {
      //this.urlProyecto+"EmitirCDP/listarProyectos/" 
      let proyectosEmitirCDP: IProyecto[] = [];
      await axios.get("https://localhost:5001/api/todo/"+estado
        ).then((response: AxiosResponse) => {
          proyectosEmitirCDP = response.data.map((val: IProyecto) => ({
              codigo: val.codigo,
              nombre: val.nombre,
              presupuestoAprovado:
              val.presupuestoAprovado,
              proyectoStates: val.proyectoStates,
              id: val.id,
          }));
      });

      return proyectosEmitirCDP;
  }

  public async GetFondos() {
    //this.urlProyecto+"EmitirCDP/listarFondos"
    let fondos: IFondos[] = [];
    await axios.get("https://localhost:5001/api/fondo/").then((response: AxiosResponse) => {
        fondos = response.data.map((val: any) => ({
            nombre: val.nombre,
            valor: val.valor,
        }));
    });
    console.log("Fondos Api", fondos);
    return fondos;
  }

  public async PostCDP(idProyecto:number, transancion:IListaTransancionCDP[]) {
    //this.urlProyecto+"EmitirCDP/listarProyectos/" 
    await axios.post(this.urlProyecto+"CertificadoDeDisponibilidadPresupuestal/",{      
        codigo: idProyecto,   
        listaTransanciones:transancion  
    }
    ).then((response: AxiosResponse) => {        
    });


  }

    public async GetGastosProyecto(proyecto: IProyecto) {
        let gastos: ITransaccion[] = [];
        await axios
            .get(this.url + '/' + proyecto.id)
            .then((response: AxiosResponse) => {
                gastos = response.data.map((val: any) => ({
                    Monto: val.monto,
                    Fecha:
                        new Date(val.fecha.toString()).getDate() +
                        '/' +
                        new Date(val.fecha.toString()).getMonth() +
                        '/' +
                        new Date(val.fecha.toString()).getFullYear(),

                    id: val.id,
                }));
            });

        return gastos;
    }
}
export const proyectoService = new ProyectoService();
