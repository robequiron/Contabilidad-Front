export class Config {

    /**
     * Identificador 
     */
    public _id:string;

    /**
     * Nombre de la empresa
     */
    public name:string;

    /**
     * Nif de la empresa
     */
    public nif:string

    /**
     * Tipo de nif
     */
    public codeNif:number;

    /**
     * Trabajar con más de un centro de trabajo
     */
    public workplace:boolean;

    /**
     * Trabajar con más de un centro de trabajo en la cuentas personales
     */
    public workplaceCuenta:boolean;

    constructor(){}
}