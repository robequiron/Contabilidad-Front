/**
 * Clase modelo porcentajes de un impuesto
 * 
 */
export class Percentage {
    
    /**
     * 
     */
    _id:string
    /**
     * Nombre de porcentage del impuesto
     */
    name:string;

    /**
     * Porcentaje de impuesto
     */
    percentage:number;

    /**
     * Fecha de se inicia la aplicación del impuesto
     */
    dateInit:Date;

    /**
     * Fecha que finaliza la aplicación del impuesto
     */
    dateEnd: Date;

    /**
     * Constructor
     */
    constructor(){}



}