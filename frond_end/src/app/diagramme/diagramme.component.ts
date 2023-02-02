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
  currentDate!: any;
  temp8: any;
  temp12: any;
  temp19: any;
  moyTemp!: number;
  moyHum!: number;
  constructor(private weather: UsersService  ) {}
  
  ngOnInit(): void {

    this.weather.getData()
    .subscribe(data => {
       /* console.log(data)  */
      this.temphum = data as unknown as Temphum[];
      
      this.currentDate = (new Date().getDate()-1) + '/' + (new Date().getMonth()+1 ) + '/'+  new Date().getFullYear();
      /*  console.log(this.currentDate);  */
      
     this.temphum = data as unknown as Temphum[];
     this.temp8 = this.temphum.filter((e:any)=> e.Heure == "08:00:00" && e.Date == this.currentDate)
     this.temp12 = this.temphum.filter((e:any)=> e.Heure == "12:00:00" && e.Date == this.currentDate)
     this.temp19 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" && e.Date == this.currentDate)
    /*  console.log(this.temp8); */
     
    const t8 = this.temp8[0].temperature;
    const h8 = this.temp8[0].humidite;
    const t12 = this.temp12[0].temperature;
    const h12 = this.temp12[0].humidite;
    const t19 = this.temp19[0].temperature;
    const h19 = this.temp19[0].humidite;
     /* console.log(t8); */

    this.moyTemp = (parseInt(String(t8)) + parseInt(String(t12)) + parseInt(String(t19))) / 3;
    this.moyHum = (parseInt(String(h8)) + parseInt(String(h12)) + parseInt(String(h19))) / 3;
    
    
    var temperature = [ t8, t12,t19 ];
  var humidite = [h8, h12, h19];
   
    
  
                     
           
  this.chart = new Chart('canvas', {
    type: 'bar',
    data: {
      labels: [ "8h", "12h", "19h" ],
      datasets: [
        {
           label: "Temperature",
          data: temperature,
          backgroundColor: '#F53727'
        },
        {
          label: "Humidité",
          data: humidite,
          backgroundColor: '#69AEF7'
         /*  */
        },
      ]
    },
   
  })     
            
            
       
      }); 

  
  
  }
   
  
     
  }
    
  