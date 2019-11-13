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
    FechaPresentacion: Date;
    FechaAprovacion: Date;
    Documento: File;
    NumeroDeFamilias: number;
    Nombre: string;
    PresupuestoEstimado: string;
    Id: number;
    NumeroFamiliasBeneficiadas: number;
    PresupuestoEstimadoDouble: number;
    FechaRegistro: Date;
}
export interface IProyecto {
    Propuesta?: IPropuesta;
    Codigo: string;
    PresupuestoAprobado: number;
    PresupuestoEjecutado: number;
    Comunidades?: IComunidad[];
    FechaEjecucion: Date;
    FechaDeCierrePrevista: Date;
    FechaCierre?: Date;
    Programa?: Iprograma;
    ProyectoState: number;
    Actividades?: Iactividad;
    Id: number;
}
export interface ITransaccion {
    Monto: number;
    Fecha: Date;
    Tipo: number;//
    Proyecto: IProyecto;
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
    Codigo: number;
    Nombre: String;
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
