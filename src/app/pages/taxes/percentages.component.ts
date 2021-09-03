import { Component, Input, OnInit } from '@angular/core';
import { Percentage } from 'src/app/models/percentage.model';
import { Taxes } from 'src/app/models/taxes.model';



@Component({
  selector: 'app-percentages',
  templateUrl: './percentages.component.html',
  styleUrls: ['./percentages.component.css']
})
export class PercentagesComponent implements OnInit {

  @Input() tax:Taxes;


  editCache: { [key: number]: { edit: boolean; data: Percentage } } = {};
  listOfData: Percentage[] = [];
  
  
  constructor() {}

  /**
   * Constructor
   */
  ngOnInit(): void {
    console.log(this.tax)


    const data = this.tax.percentages;
    /*for (let i = 0; i < 1; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }*/
    this.listOfData = data;
    this.updateEditCache();
  }

  public add(){
    
  }



  startEdit(id: string): void {
   
    this.editCache[id].edit = true;
  }
   
  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.percentage=== id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  saveEdit(id: number): void {
    
    const index = this.listOfData.findIndex(item => item.percentage === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    
    this.listOfData.forEach(item => {
      this.editCache[item.percentage] = {
        edit: false,
        data: { ...item }
      };
    }); 

    console.log(this.editCache)
  }


}
