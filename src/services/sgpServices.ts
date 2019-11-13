import axios, { AxiosResponse } from 'axios';
import { Isgp } from '@/interfaces/interface';
import { globalServices } from './globalService';

class SgpService {

  public sgps: Isgp[] = [];
  // metodos del CRUD
  public async consultar() {
    const data = await axios.get(globalServices.url + '/ingresoonceava').then((sgps) => {
        return sgps.data;
      }).catch((_) => {});
    return data;
    // return this.sgps
  }


  public add(sgp: Isgp) {
    return axios.post(globalServices.url + '/ingresoonceava', sgp)
  }

  public update(sgp: Isgp) {
    axios.put('', sgp).then((_) => { }).catch((_) => { });
  }

  public delete(sgp: Isgp){
    axios.delete(globalServices.url + '/ingresoonceava/' + sgp.id).then((_) => { console.log('al parecer funciona')}).catch((_) => { console.log('al parecer no funciona')});
  }
  public getPDFProyecto(id: number) {
    let urlPDF: string = '';
    axios
        .get(globalServices.url + '/documento/' + id, {
            responseType: 'text',
        })
        .then(({ data }) => {
          console.log(data)
            const link = document.createElement('a');
            urlPDF = data.respaldoFisicoDigitalizado;
            link.href = urlPDF;
            link.download = data.nombre;
            link.click();
        })
        .catch((error) => console.error(error));
}

}
export const sgpServices = new SgpService();
