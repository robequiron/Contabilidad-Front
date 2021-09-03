import { Percentage } from "./percentage.model";
/**
 * Clase modelo tipos de impuestos
 */
export class Taxes {

    /**
     * Identificado Mongo
     */
    _id:string='';


    /**
     * Código del impuesto. Máximo 9
     */
    code:number;


    /**
     * Nombre del impuesto
     */
    name:string;

    /**
     * Array con los distintos porcentajes del impuesto
     */
    percentages:Percentage[];
    
    /**
     * Constructor
     */
    constructor(){}


}