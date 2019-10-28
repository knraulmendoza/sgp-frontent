import axios, { AxiosResponse } from 'axios';

class ProyectoService {

  url = "http://localhost:53243/api/task/";


  constructor() {

  }
  //metodos del CRUD
  async obtenerDatos(value?: number) {
    let urlLocal: string = this.url;
    value == 0 ? urlLocal : urlLocal += `${value}`;
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
          text: val.surname
        }));
      })
    console.log("data: " + data);
    return data;
  }


  async comunidades() {
    let urlLocal: string = this.url;
    
    const data = await axios
      .get(urlLocal+='comunidades')
      .then((response: AxiosResponse) => {
        console.log("response: " + response);
        const dato = [response.data];
        return dato.map((val: any) => ({
          value: val.codigo,
          text: val.nombre
        }));
      })
    
    return data;

  }

  async cofinanciador() {
    let urlLocal: string = this.url;
    
    const data = await axios
      .get(urlLocal+='confinanciador')
      .then((response: AxiosResponse) => {
        console.log("response: " + response);
        const dato = [response.data];
        return dato.map((val: any) => ({
          value: val.codigo,
          text: val.nombre
        }));
      })
    
    return data;

  }



   async registrarPropuesta(rawData:any){
     rawData = JSON.stringify(rawData);
     console.log("rawData: "+rawData);
    
    let formData = new FormData();  

            formData.append('propuesta', rawData);
            try{
              const response=await  axios.post(this.url,
              formData,
              {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              });
              return response.data[0];
            } catch(e){
                return null;
            }
         
             

  }




}
export const proyectoService = new ProyectoService();