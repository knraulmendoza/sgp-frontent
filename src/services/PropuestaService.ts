import axios, { AxiosResponse } from 'axios';
import { IPropuesta } from '../interfaces/interface';
import { globalServices } from './globalService';
class PropuestaService {

    private propuestas: IPropuesta[] = [];
    constructor() {}
    public async getData() {
        await axios
            .get(globalServices.url + '/propuesta')
            .then((response: AxiosResponse) => {
                this.propuestas = response.data.map((val: any) => ({
                    nombre: val.nombre,
                    numeroFamiliasBeneficiadas: val.numeroDeFamilias,
                    presupuestoEstimado:
                        '$' +
                        new Intl.NumberFormat().format(val.presupuestoEstimado),
                    fechaPresentacion:
                        new Date(val.fechaDePresentacion.toString()).getDate() +
                        '/' +
                        new Date(
                            val.fechaDePresentacion.toString(),
                        ).getMonth() +
                        '/' +
                        new Date(
                            val.fechaDePresentacion.toString(),
                        ).getFullYear(),
                    id: val.id,
                    presupuestoEstimadoDouble: val.presupuestoEstimado,
                }));
            });
        return this.propuestas;
    }
    public getPDFProyecto(propuesta: IPropuesta) {
        let urlPDF: string = '';
        axios
            .get(globalServices.url + '/propuesta/' + propuesta.Id, {
                responseType: 'text',
            })
            .then(({ data }) => {
                const link = document.createElement('a');
                urlPDF = `data:application/pdf;base64,${data.documento}`;
                link.href = urlPDF;
                link.download = propuesta.Nombre + '.pdf';
                link.click();
            })
            .catch((error) => console.error(error));
    }

    public async registrarPropuesta(rawData: any) {
        
        const formData = new FormData();

        formData.append('Propuesta', rawData);
        try {
            const response = await axios.post(globalServices.url+"/Propuesta", {
                Nombre:rawData.Nombre,
                NumeroDeFamilias: rawData.NumeroDeFamilia,
                PresupuestoEstimado: rawData.PresupuestoEstimado,
                Documento: rawData.Documento,
                FechaDeRegistro: rawData.fecha,
            },
            {
               

            });
            return response.data[0];
        } catch (e) {
            return null;
        }
    }



}

export const propuestaService = new PropuestaService();
