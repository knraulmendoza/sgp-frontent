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
            .get(this.BASE_URL + '/' + propuesta.id, { responseType: 'blob' })
            .then(({ data }) => {
                const blob = new Blob([data], { type: 'application/pdf' });
                const link = document.createElement('a');
                urlPDF = window.URL.createObjectURL(blob);
                link.href = urlPDF;
                link.setAttribute('donwload', 'file.pdf');
                link.download = propuesta.nombre + '.pdf';
                link.target = '_blank';
                link.click();
                document.body.appendChild(link);
            })
            .catch(error => console.error(error));
        return urlPDF;
    }
}

export const propuestaService = new PropuestaService();
