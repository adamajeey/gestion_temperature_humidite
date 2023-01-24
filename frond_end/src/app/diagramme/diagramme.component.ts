import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-diagramme',
  templateUrl: './diagramme.component.html',
  styleUrls: ['./diagramme.component.css']
})
export class DiagrammeComponent {
  public chart: any;
  ngOnInit(): void {
    this.createChart();
  }
    createChart(){
  
      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: [ '2022-05-11', '2022-05-12','2022-05-13',
                   '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
                   
           datasets: [
            {
              label: "Temperature 9H",
              data: ['576', '572', '79', '92',
                   '574', '573', '576'],
              backgroundColor: '#fc6484'
            },
            {
              label: "Humidité 9H",
              data: ['542', '536', '327', '17',
                     '0.00', '538', '541'],
              backgroundColor: '#34a4ec'
            }  ,
            {
              label: "Temperature 12H",
              data: [ '542', '536', '327', '17',
                     '0.00', '538', '541'],
              backgroundColor: '#fcacbc'
            } ,
                     
           
            {
              label: "Humidité 12H",
              data: ['576', '572', '79', '92',
                   '574', '573', '576'],
              backgroundColor: '#7cc4f4'
            },
            {
              label: "Humidité",
              data: ['542', '536', '327', '17',
                     '0.00', '538', '541'],
              backgroundColor: '#e3f2fc'
            }  ,
            {
              label: "Humidité",
              data: [ '542', '536', '327', '17',
                     '0.00', '538', '541'],
              backgroundColor: 'blue'
            }   
          ]
        },
        
        options: {
          aspectRatio:2.5
        }
        
      });
    }
  }

