import axios, { AxiosResponse } from 'axios';
import { Isgp } from '@/interfaces/interface';
import { globalServices } from './globalService';

class SgpService {

    public sgps: Isgp[] = [
    ];
  // metodos del CRUD
  public async consultar() {
      const data = await axios.get(globalServices.url+'ingresoonceava').then((sgps) => {
          return sgps.data;
        }).catch((_) => {});
      return data;
  }

  public add(sgp: Isgp) {
      axios.post(globalServices.url+'ingresoonceava', sgp).then((_) => {console.log('ok'); }).catch((_) => {console.error('error'); });
  }

  public update(sgp: Isgp) {
      axios.put('', sgp).then((_) => {}).catch((_) => {});
  }

}
export const sgpServices = new SgpService();
