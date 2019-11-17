import axios, { AxiosResponse } from 'axios';
import { IProyecto, ITransaccion, Icomponente } from '../interfaces/interface';
import { globalServices } from './globalService';

class ProyectoService {

  private proyecto: IProyecto = {} as IProyecto;
  private proyectos: IProyecto[] = [];
  constructor() {

  }

  public add(proyecto: IProyecto) {
    console.log("Iproyecto ",proyecto);
    
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
    const urlLocal: string = globalServices.url + '/' + rutaContralador;
    value == 0 ? urlLocal : urlLocal + '/' + value;

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
          text: val.nombre,
        }));
      });
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
    const data= await axios.get(globalServices.url + "/proyecto/estado/" + estado).then((response) => {
      return response.data;
    });    
    return data;
  }
  public async GetGastosProyecto(proyecto: IProyecto) {
    let gastos: ITransaccion[] = [];
    await axios
      .get(globalServices.url + '/proyecto/egresos/' + proyecto.id)
      .then((response: AxiosResponse) => {
        gastos = response.data.map((val: any) => ({
          Monto: val.monto,
          Fecha:
            new Date(val.fecha.toString()).getDate() +
            '/' +
            new Date(val.fecha.toString()).getMonth() +
            '/' +
            new Date(val.fecha.toString()).getFullYear(),

          Id: val.id,
          Concepto: val.concepto,
        }));
      });

    return gastos;
  }
  public RegistrarGasto(gastoProyecto: ITransaccion) {
    console.log();

     axios.post(globalServices.url + "/transaccion", gastoProyecto).then((Response) => {
       swal({
         title: "Exito",
         text: "Se ha registrado un nuevo gasto",
         icon: "warning",
         dangerMode: true,
       });
     }).catch(function (error) {
       
         swal({
           title: "Ocurrio un error",
           text: "Se ha presentado un error al tratar de registrar el gasto, contacte a los desarrolladores",
           icon: "warning",
           dangerMode: true,
         });
         
     });
  }
  public async GetProyectoPorId(idProyecto: number) {

    const data = await axios.get(`${globalServices.url}/proyecto/${idProyecto}`).then((Response) => {
      return Response.data;
    });
    return data;
  }
}
export const proyectoService = new ProyectoService();
