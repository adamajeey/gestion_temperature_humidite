import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../meteo.service';
import { UsersService } from '../services/users.service';
import { Temphum } from '../models/temphum'; 
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-accueil-dashboard',
  templateUrl: './accueil-dashboard.component.html',
  styleUrls: ['./accueil-dashboard.component.css']
})
export class AccueilDashboardComponent implements OnInit {

  currentDate:any;
  tempHum: any = []
  temphum!: Temphum[] ;
  temp12:any
  temp8:any
  temp19:any
  temp!:any[]
  moyTemp:any;
  moyHum:any;
  dethier:any;
  temp20: any;
  img:boolean =false
  t8:any;t12:any;t19:any;h8:any;h12:any;h19:any;
  constructor(private meteoservice:SocketService, private serServe :UsersService, private socket: Socket){}

  ngOnInit(): void {
    this.meteoservice.onFetch().subscribe((data)=>{
    /*   console.log(data); */  
      this.tempHum = Array(data)
    })

    //recuperation temperature par heur données et calsul des moyenne 
    this.serServe.historique().subscribe((data)=>{
      //console.log(data);
     this.currentDate = new Date().getDate() + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();
     this.dethier = new Date().getDate()-7 + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();
    /*  console.log(this.dethier); */
     
     this.temphum = data as unknown as Temphum[];
     this.temp8 = this.temphum.filter((e:any)=> e.Heure == "08:00:00" && e.Date == this.currentDate)
     this.temp12 = this.temphum.filter((e:any)=> e.Heure == "12:00:00" && e.Date == this.currentDate)
     this.temp19 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" && e.Date == this.currentDate)
     this.temp20 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" || "12:00:00" || "08:00:00" && e.Date == this.dethier && e.Date <= this.currentDate)
    /*  console.log(this.temp20);
      */
   /*   this.temp20.forEach(function (temperature:any) {
      console.log(temperature.temperature);
    });  */

    const t8 = this.temp8[0].temperature;
    const h8 = this.temp8[0].humidite;
    const t12 = this.temp12[0].temperature;
    const h12 = this.temp12[0].humidite;
    const t19 = this.temp19[0].temperature;
    const h19 = this.temp19[0].humidite;

    this.moyTemp = (parseInt(String(this.t8)) + parseInt(String(this.t12)) + parseInt(String(this.t19))) / 3;
    this.moyHum = (parseInt(String(this.h8)) + parseInt(String(this.h12)) + parseInt(String(this.h19))) / 3;
    
    })  
  }

  allumer(){
    this.img = true;
    this.socket.emit('active', '1');
  }

  eteindre(){
    this.img = false;
    this.socket.emit('active', '0');
  }

}
