import axios, { AxiosResponse } from 'axios';
import { IProyecto, ITransaccion, IFondos, Iprograma, IListaTransancionCDP } from '../interfaces/interface';
import { Icomponente } from '../interfaces/interface';
import { globalServices } from './globalService';

class ProyectoService {

  private proyecto: IProyecto = {} as IProyecto;
  private proyectos: IProyecto[] = [];
  constructor() {

  }

  public add(proyecto: IProyecto) {
    console.log("Iproyecto ", proyecto);

    return axios.post(globalServices.url + '/Proyecto', proyecto)
  }

  public async obtenerDimensiones() {
    const data = await axios
      .get(globalServices.url + '/proyecto')
      .then((response: AxiosResponse) => {

        let dato;
        if (Array.isArray(response.data)) {
          dato = response.data;
        } else {
          dato = [response.data];
        }
        return dato.map((val: any) => ({
          value: val.id,
          text: val.nombre,

        }));
      });
    return data;
  }

  // metodos del CRUD
  public async obtenerDatos(value?: number, rutaContralador?: string) {
    console.log("VALUE",value); 
    let urlLocal: string = globalServices.url + '/' + rutaContralador;
     value == 0 ? urlLocal: urlLocal +='/'+ value;
     
      console.log("url: ",urlLocal);
      
    const data = await axios.get(urlLocal).then((sgps) => {
      return sgps.data;
    }).catch((_) => {});
  return data;
 
  }


  public async comunidades() {
    let urlLocal: string = globalServices.url;

    const data = await axios
      .get(urlLocal += 'comunidades')
      .then((response: AxiosResponse) => {
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

    const formData = new FormData();

    formData.append('propuesta', rawData);
    try {
      const response = await axios.post(globalServices.url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data[0];
    } catch (e) {
      return null;
    }
  }

  public async GetProyectosPorEstado(estado: number) {
    const data = await axios.get(globalServices.url + "/proyecto/estado/" + estado).then((response) => {
      return response.data;
    });
    return data;
  }
  public async GetGastosProyecto(idProyecto: number) {
    
    const data = await axios
      .get(globalServices.url + '/proyecto/egresos/' + idProyecto)
      .then((response: AxiosResponse) => {
        return response.data
      });
    return data;
  }

  public async GetProyectosCDP(estado: number) {
    //this.urlProyecto+"EmitirCDP/listarProyectos/" 
    let proyectosEmitirCDP: IProyecto[] = [];
    const data = await axios.get(globalServices.url + '/proyecto/' + estado
    ).then((response: AxiosResponse) => {
      this.getPropuesta(response.data.propuestaId).then(p => {
        response.data.propuesta = p;
        return response.data;
      })
    });
    console.log(data);
    return data;
  }

  public async getPropuesta(id: number) {
    const data = await axios.get(globalServices.url + '/propuesta/' + id
    ).then((response: AxiosResponse) => {
      return response.data;
    });
    return data;
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

  public async PostCDP(idProyecto: number, transancion: IListaTransancionCDP[]) {
    //this.urlProyecto+"EmitirCDP/listarProyectos/" 
    await axios.post(globalServices.url + "CertificadoDeDisponibilidadPresupuestal/", {
      codigo: idProyecto,
      listaTransanciones: transancion
    }
    ).then((response: AxiosResponse) => {
    });


  }


  public RegistrarGasto(gastoProyecto: ITransaccion) {
    return axios.post(globalServices.url + "/transaccionunaria", gastoProyecto);
  }
  public async GetProyectoPorId(idProyecto: number) {

    const data = await axios.get(`${globalServices.url}/proyecto/${idProyecto}`).then((Response) => {
      return Response.data;
    });
    return data;
  }
}
export const proyectoService = new ProyectoService();
