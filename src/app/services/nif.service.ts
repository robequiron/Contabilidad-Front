import { Injectable } from '@angular/core';
/**
 * Check tax identification number
 */
@Injectable({
  providedIn: 'root'
})
export class NifService {


  /**
   * Constructor
   */
  constructor() { }


  // Comprueba si es un DNI correcto (entre 5 y 8 letras seguidas de la letra que corresponda).

  // Acepta NIEs (Extranjeros con X, Y o Z al principio)

  /**
   * Tax identification number - Person
   * 
   * @param dni tax identification number
   * @retunrs
   * 
   */

 
  public validateDNI(dni):boolean {
    let numero, le, letra;
    let expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        le = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != le) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        }else{
            //alert('Dni correcto');
            return true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return false;
    }
  }

  /**
   * Tax identification number - Compani
   * 
   * @param cif tax identification number
   */
  public isValidCif(cif) {
    if (!cif || cif.length !== 9) {
      return false;
    }
  
    var letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    var digits = cif.substr(1, cif.length - 2);
    var letter = cif.substr(0, 1);
    var control = cif.substr(cif.length - 1);
    var sum = 0;
    var i;
    let digit:number;
  
    if (!letter.match(/[A-Z]/)) {
      return false;
    }
  
    for (i = 0; i < digits.length; ++i) {
      digit = parseInt(digits[i]);
  
      if (isNaN(digit)) {
        return false;
      }
  
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.trunc(digit / 10) + (digit % 10);
        }
  
        sum += digit;
      } else {
        sum += digit;
      }
    }
  
    sum %= 10;
    if (sum !== 0) {
      digit = 10 - sum;
    } else {
      digit = sum;
    }
  
    if (letter.match(/[ABEH]/)) {
      return String(digit) === control;
    }
    if (letter.match(/[NPQRSW]/)) {
      return letters[digit] === control;
    }
  
    return String(digit) === control || letters[digit] === control;
  }

  /**
   * phone check
   * @param phone 
   */
  public checkPhone(phone:Number){

    let p = String (phone);

    if(p.match(/^[9|6]{1}([\d]{2}[-]*){3}[\d]{2}$/)){
      return Number(p)
    }else{
      console.log('no vaildo')
      return false;
    }
    
    
   
  }
}
