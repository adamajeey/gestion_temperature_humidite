import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js/auto";
import { data } from 'jquery';
import { UsersService } from '../services/users.service';
import { Temphum } from '../models/temphum';
@Component({
  selector: 'app-diagramme',
  templateUrl: './diagramme.component.html',
  styleUrls: ['./diagramme.component.css']
})
export class DiagrammeComponent implements OnInit {
  chart: Chart <"line", any, string> | undefined;
  temphum! : Temphum [];
  temp! :any [];
  constructor(private weather: UsersService  ) {}
  
  ngOnInit(): void {

    this.weather.getData()
    .subscribe(data => {
      console.log(data)
      this.temphum = data as unknown as Temphum[];
      
     

      /*  let temp_max = tempp.temperature/* .filter((e:any)=> e.etat == true) */
    /*    let hum_max = tempp.humidite
       let alldates = tempp.Date
      */
       
      console.log(this.temp);
       
    
                     
           
          
            
            
       
      }); 

  
  
  }
   
  
     
  }
    
  