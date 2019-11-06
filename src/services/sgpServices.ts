import axios, { AxiosResponse } from 'axios';
import { Isgp } from '@/interfaces/interface';

class SgpService {

  public url = 'http://6e117652.ngrok.io/api/ingresoonceava';
    public sgps: Isgp[] = [
    ];
  // metodos del CRUD
  public async consultar() {
      const data = await axios.get(this.url).then((sgps) => {
          return sgps.data;
        }).catch((_) => {});
      return data;
  }

  public add(sgp: Isgp) {
      axios.post(this.url, sgp).then((_) => {console.log('ok'); }).catch((_) => {console.error('error'); });
  }

  public update(sgp: Isgp) {
      axios.put('', sgp).then((_) => {}).catch((_) => {});
  }

}
export const sgpServices = new SgpService();
