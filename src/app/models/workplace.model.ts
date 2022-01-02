/**
 * Centro de trabajo de las cuentas personales
 */
export class Workplace {

    /**
     * Identificado del centro de trabajo
     */
    _id:string;

    /**
     * Código de la cuenta personal
     */
    _idCuenta:string;

    /**
     * Código del centro de trabajo. Valor máximo 99
     */
    code:number;

    /**
     * Nombre del centro de trabajo
     */
    name:string;

    /**
     * Sede principal de la cuenta personal
     */
    headquarters:boolean;

    /**
     * Constructor
     */
    constructor() {}



}