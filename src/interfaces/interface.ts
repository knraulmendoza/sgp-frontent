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
export interface ICertificadosDeDisponibilidaPresupuestales{
    Id:number;
    FechaDeVencimiento:Date;
    documentoPresupuestal: IDocumento;
}
export interface IDocuemnetoPresupuestal{
    Id:number;
    FechaDeExpedicion:Date;
    Codigo:string;  
}
export interface IProyecto {   
    propuestaId?:number;
    propuesta: IPropuesta;
    proyectoState: number;
    presupuestoAprobado: number;
    presupuestoEjecutado: number;
    proyectosComunidads:IComunidad[];
    fechaEjecucion: Date;
    certificadosDeDisponibilidaPresupuestales: null;
    transaccionesUnarias: null;
    transaccionesBinarias:number;
    fechaCierre: Date,
    fechaDeCierrePrevista: Date;
    programaId: number;
    programa: Iprograma;
    actividades: Iactividad;
    beneficiarios: number;
    id: number
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
    nombre: string;
    comunidadId: number;
    value: number;
}

export interface IDocumento{
    nombre: string;
    rawData: any;
    respaldoFisicoDigitalizado: string;
}

export interface Isgp {
    id?: number;
    valor: number;
    interes: number;
    soporteValor: IDocumento;
    soporteValorId :number;
    soporteInteres: IDocumento;
    soporteInteresId :number;
    descripcion?: string;
    fecha: Date;
}

export interface IFondos {
    nombre: string;
    valor: number;
}
