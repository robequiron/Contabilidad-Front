/**
 * Clases cuenta (clientes/proveedores y acreedores)
 */

export class Cuenta {

    /**
     * Identificador cuenta
     */
    public _id:string;

    /**
     * Código del cliente
     */
    public code:number;

    //TODO: Crear modelo y colleción de categorias de cuenta
    /**
     * Category. Tipo de cliente
     */
    public category:string;

    /**
     * Nombre de la cuenta. Nombre persona física o nombre de sociedad
     */
    public name:string;

    /**
     * Apellido de la cuenta o nombre comercial de la sociedad
     */
    public surname:string;

    /**
     * Segundo apellido de la cuenta. 
     */
    public surname2:string;

    /**
     * TypeNif - ObjectId TypeNif
     */
    public typeNif:string;

    /*
    * Nif de la cuenta 
    */
   public nif:string

   /**
    * Sexo de la cuenta
    */
   public sex:string;

   /**
    * Fecha de nacimiento de la cuenta
    */
    public dateBirth:Date;

    /**
     * Cuenta bloqueada para su uso
     */
    public locked:boolean;

    /**
     * Constructor
     */
    constructor() {}


}