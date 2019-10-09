class ProyectoService {
    dimensiones = [
        {value: 1, text: 'Consolidación territorial del pueblo indígena kankuamo para la protección de la madre naturaleza'},
      ];
      componentes = [
        {value: 1, text: 'Recuperación del Territorio Ancestral', idDimension: 1},
        {value: 2, text: 'Desarrollo del modelo del ordenamiento territorial propio del pueblo Kankuamo en función del manejo integral y ancestral de las cuencas hidrográficas, la conservación de los bosques, la biodiversidad y el uso del suelo según su vocación ', idDimension: 1},
      ];
      programas = [
        {value: 1, text: 'Saneamiento y ampliación del Resguardo Kankuamo', idComponente: 1},
        {value: 2, text: 'Protección y Recuperación de Espacios Sagrados', idComponente: 1},
        {value: 3, text: 'Conservación y protección ambiental del territorio kankuamo', idComponente: 2},
      ];
      comunidades = [
        {value: 1, text: 'Atanquez'},
        {value: 2, text: 'Guatapuri'},
        {value: 3, text: 'Chemesquemena'},
        {value: 4, text: 'Rio seco'},
        {value: 5, text: 'la mina'},
        {value: 6, text: 'ponton'},
        {value: 7, text: 'las florez'}
      ];
      estrategias = [];
      tiposProyectos = [];
      constructor(){

      }
    //metodos del CRUD
}
export const proyectoService = new ProyectoService();