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
    id: number;
    nombre: string;
    presupuestoEstimado: string;
    fechaPresentacion: Date;
    numeroFamiliasBeneficiadas: number;
    documento: string;
}
export interface IProyecto {
    id: number;
    codigo: string;
    nombre: string;
    presupuesto_aprobado: number;
    presupuesto_ejecutado: number;
    fecha_ejecucion: Date;
    fecha_cierre_prevista: Date;
    fecha_cierre?: Date;
    programa: Iprograma;
    estado: number;
    numero_familias_beneficiadas: number;
    actividades: Iactividad;
    archivo: string;
}
