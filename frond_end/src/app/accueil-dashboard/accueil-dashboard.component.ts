import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../meteo.service';

@Component({
  selector: 'app-accueil-dashboard',
  templateUrl: './accueil-dashboard.component.html',
  styleUrls: ['./accueil-dashboard.component.css']
})
export class AccueilDashboardComponent implements OnInit {

  tempHum: any = []

  constructor(private meteoservice:SocketService){}
  
//recuperer les donnees envoyer par le socket
  ngOnInit(): void {
    this.meteoservice.onFetch().subscribe((data)=>{
      console.log(data);  
      this.tempHum = Array(data)
    })
  }

}
