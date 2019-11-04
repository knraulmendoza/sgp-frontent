import axios, { AxiosResponse } from 'axios';
import { IPropuesta } from '../interfaces/interface';
class PropuestaService {
    private BASE_URL: string = 'https://localhost:5001/api/proyecto';
    private propuestas: IPropuesta[] = [];
    constructor() {}
    public async getData() {
        await axios.get(this.BASE_URL).then((response: AxiosResponse) => {
            this.propuestas = response.data.map((val: any) => ({
                nombre: val.nombre,
                numeroFamiliasBeneficiadas: val.numeroFamiliasBeneficiadas,
                presupuestoEstimado:
                    '$ ' +
                    new Intl.NumberFormat().format(val.presupuestoEstimado),
                fechaPresentacion:
                    new Date(val.fechaPresentacion.toString()).getDate() +
                    '/' +
                    new Date(val.fechaPresentacion.toString()).getMonth() +
                    '/' +
                    new Date(val.fechaPresentacion.toString()).getFullYear(),
                id: val.id
            }));
        });
        return this.propuestas;
    }
    public getPDFProyecto(propuesta: IPropuesta) {
        let urlPDF: string = '';
        axios
            .get(this.BASE_URL + '/' + propuesta.id, { responseType: 'text' })
            .then(({ data }) => {
                
                const link = document.createElement('a');
                urlPDF = `data:application/pdf;base64,${data.documento}`;
                link.href = urlPDF;
                link.download = propuesta.nombre + '.pdf';
                link.click();
            })
            .catch(error => console.error(error));
    }
}

export const propuestaService = new PropuestaService();
