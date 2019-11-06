import axios, { AxiosResponse } from 'axios';
import { IProyecto, ITransaccion, Icomponente } from '../interfaces/interface';

class ProyectoService {
   

  public url = 'https://localhost:5001/api';
  constructor() {

  }
  
  public async obtenerDimensiones(){
    console.log("obtener DImensiones");
    
    const data = await axios
      .get(this.url+"/proyecto")
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
      console.log('data: ' + data);
      return data;
  }

  // metodos del CRUD
  public async obtenerDatos(value?: number, rutaContralador?:string) {
    let urlLocal: string = this.url+"/"+rutaContralador;
    value == 0 ? urlLocal : urlLocal+"/"+value;
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
          text: val.Nombre,
          

          
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

 



    public async registrarPropuesta(rawData: any) {
        rawData = JSON.stringify(rawData);

        const formData = new FormData();

        formData.append('propuesta', rawData);
        try {
            const response = await axios.post(this.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
                presupuestoAprobadoString:
                    '$ ' +
                    new Intl.NumberFormat().format(val.PresupuestoAprovado),
                proyectoState: val.proyectoState,
                id: val.id,
                presupuestoAprobado: val.presupuestoAprobado,
                presupuestoEjecutado: val.presupuestoEjecutado,
                presupuestoRestante:
                    val.presupuestoAprobado - val.presupuestoEjecutado,
            }));
        });
        return proyectosConRP;
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

                    id: val.id
                }));
            });

        return gastos;
    }
    public async RegistrarGasto(gastoProyecto: ITransaccion) {
        await axios.post('', gastoProyecto).then(Response => {});
    }
}
export const proyectoService = new ProyectoService();
