<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { SocketService } from '../meteo.service';
=======
import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../meteo.service';

>>>>>>> fall
@Component({
  selector: 'app-accueil-dashboard',
  templateUrl: './accueil-dashboard.component.html',
  styleUrls: ['./accueil-dashboard.component.css']
})
<<<<<<< HEAD
export class AccueilDashboardComponent {
   constructor(private meteoservice:SocketService){

   }
ngOnInit (){
 
}
=======
export class AccueilDashboardComponent implements OnInit {

  tempHum: any = []

  constructor(private meteoservice:SocketService){}

  ngOnInit(): void {
    this.meteoservice.onFetch().subscribe((data)=>{
      console.log(data);  
      this.tempHum = Array(data)
    })
  }

>>>>>>> fall
}
