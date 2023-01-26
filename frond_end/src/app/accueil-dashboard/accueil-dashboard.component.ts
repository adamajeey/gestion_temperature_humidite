import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { SocketService } from '../meteo.service';
@Component({
  selector: 'app-accueil-dashboard',
  templateUrl: './accueil-dashboard.component.html',
  styleUrls: ['./accueil-dashboard.component.css']
})
export class AccueilDashboardComponent {
   constructor(private meteoservice:SocketService){

   }
ngOnInit (){
 
}
}
