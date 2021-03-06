/**
 * Tipo de número de identificación fiscal
 */
export class TypeNif {

    /**
    * Identificación
    */
    public _id:string;

    /**
     * Código documento. Número máximo posible
     */
    public code:number;

    /**
     * Nombre del documento
     */
    public name:string;

    /**
     * Si el tipo de documento es de validación
     */
    public valida:boolean;

    /**
     * Constructor
     */
    constructor(){}


}