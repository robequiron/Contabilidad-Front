import { Component, OnInit } from '@angular/core';
/**
 * Component footer
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent  {

  /** Texto para el pie de la página*/
  public textFooter:string = "Ant Design ©2020. Desarrollo por Roberto Guerra";

}
