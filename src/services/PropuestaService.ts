import axios, { AxiosResponse } from 'axios';
import { IPropuesta, IDocumento } from '../interfaces/interface';
import { globalServices } from './globalService';
class PropuestaService {

    private propuestas: IPropuesta[] = [];
    constructor() {}
    public async getData() {
        const data = await axios.get(globalServices.url + '/propuesta').then((sgps) => {
            return sgps.data;
          }).catch((_) => {});
        return data;
    }
    public getPDFProyecto(idDocumento: number) {
        let urlPDF: string = '';
        axios
            .get(globalServices.url + '/documento/' + idDocumento, {
                responseType: 'text',
            })
            .then(({ data }) => {
                const link = document.createElement('a');
                urlPDF = data.respaldoFisicoDigitalizado;
                link.href = urlPDF;
                // window.open(urlPDF, "_blank");
                link.download = data.nombre;
                link.click();
            })
            .catch((error) => console.error(error));
    }

    public async registrarPropuesta(propuesta: IPropuesta) {
        try {
            const response = await axios.post(globalServices.url+"/Propuesta", propuesta);
            console.log(response.data)
            return response.data;
        } catch (e) {
            return null;
        }
    }



}

export const propuestaService = new PropuestaService();
