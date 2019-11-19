export interface Idimension {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
}
export interface Icomponente {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    dimension: Idimension;
}
export interface Iestrategia {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    componente: Icomponente;
}
export interface Iprograma {
    id?: number;
    codigo: string;
    nombre: string;
    estrategia: Iestrategia;
}

export interface Iactividad {
    id?: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    fecha_inicio: Date;
    fecha_finalizacion: Date;
    estado: number;
    costo: number;
}

export interface IPropuesta {
    fechaDePresentacion: Date;
    fechaDeAprovacion: Date;
    documento: IDocumento;
    documentoId: number;
    numeroDeFamilias: number;
    nombre: string;
    presupuestoEstimado: number;
    id?: number;
    fechaDeRegistro: Date;
}
export interface IProyecto {
    propuesta: IPropuesta;
    propuestaId?:number;
    codigo: string;
    presupuestoAprobado: number;
    presupuestoEjecutado: number;
    comunidadId:number[];
    fechaEjecucion: Date;
    fechaDeCierrePrevista: Date;
    fechaCierre?: Date;
    programaId:number;
    proyectoState: number;
    id: number;
}
export interface ITransaccion {
    proyectoId: number,
    concepto: string,
    fecha: Date,
    monto: number,
    proyecto?: IProyecto,
    tipo: number,
    id?: number
}

export interface IFondos{
    nombre: string;
    valor: number;
}

export interface ITransancionCDP {
    nombreFondo: string;
    valorFondo: number;
    valorRetirado:number;
}
export interface IListaTransancionCDP {
    nombreFondo: string;
    valorRetirado:number;
}


export interface IComunidad {
    codigo: number;
    nombre: String;
}

export interface IDocumento{
    nombre: String;
    rawData: any;
    respaldoFisicoDigitalizado: String;
}

export interface Isgp {
    id?: number;
    valor: number;
    interes: number;
    soporteValor: IDocumento;
    soporteValorId :number;
    soporteInteres: IDocumento;
    soporteInteresId :number;
    descripcion?: String;
    fecha: Date;
}

export interface IFondos {
    nombre: string;
    valor: number;
}
