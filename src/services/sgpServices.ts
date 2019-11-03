import axios, { AxiosResponse } from 'axios';
import { Isgp } from '@/interfaces/interface';

class SgpService {

//   url = "http://localhost:53243/api/task/";
    sgps: Isgp[] = [
        {
            valor: 1000000,
            interes: 10000,
            archivoInteres: '',
            archivoValor: '',
            mes: 1
        },
        {
            valor: 2000000,
            interes: 20000,
            archivoInteres: '',
            archivoValor: '',
            mes: 2
        },
        {
            valor: 3000000,
            interes: 30000,
            archivoInteres: '',
            archivoValor: '',
            mes: 3
        },{
            valor: 4000000,
            interes: 40000,
            archivoInteres: '',
            archivoValor: '',
            mes: 6
        }
    ];

  constructor() {

  }
  //metodos del CRUD
  consultar(){
      axios.get('').then(_=>{}).catch(_=>{});
      return this.sgps;
  }

  add(sgp:Isgp){
      axios.post('',sgp).then(_=>{}).catch(_=>{});
  }

  update(sgp:Isgp){
      axios.put('',sgp).then(_=>{}).catch(_=>{})
  }

}
export const sgpServices = new SgpService();