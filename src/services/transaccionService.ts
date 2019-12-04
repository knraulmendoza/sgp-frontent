import axios, { AxiosResponse } from 'axios';
import { ITransaccion } from '@/interfaces/interface';
import { globalServices } from './globalService';


class TransaccionService{
    public transaccion: ITransaccion[] = [];
    

    public async consultar(idProyecto: number) {
        const data = await axios.get(globalServices.url + '/transaccion/proyecto/'+idProyecto).then((transaccion) => {
            return transaccion.data;
          }).catch((_) => {});
        return data;
      }

      
}
export const transaccionService= new TransaccionService();