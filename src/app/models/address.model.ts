export class Adress {

    /**
     * Identificador de la direccion
     */
    public _id:string;

    /**
     * Identifficador de la cuenta
     */
    public _idCuenta:string;

    /**
     * Identificador del centro de trabajo
     */
    public _idWorkplace:string;

    /**
     * Identificador de la via
     */
    public _idVia:string;

    /**
     * Nombre de la via
     */
    public nameVia:string;

    /**
     * Número de la via
     */
    public number:number=0;

    /**
     * Piso
     */
    public flat:number=0;

    /**
     * Puerta
     */
    public door:string;

    /**
     * Código postal
     */
    public postal:number=0;

    /**
     * Municipio
     */
    public town:string;

    /**
     * Others
     */
    public others:string;

    /**
     * Constructor
     */
    constructor(){}

}