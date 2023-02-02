import { data } from 'jquery';

import { Component, OnInit } from '@angular/core';
import { Temphum } from '../models/temphum'; 
import { SocketService } from '../meteo.service';
import { io } from 'socket.io-client';

import { Temp_Humid } from '../services/interfaces/movie';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-table-historique',
  templateUrl: './table-historique.component.html',
  styleUrls: ['./table-historique.component.css']
})
export class TableHistoriqueComponent implements OnInit{
 /* Declaration des variables */
 temphum!: Temphum[] ;
 temp! :any [];
 currentDate!: any;
 temp8: any;
 temp12: any;
 temp19: any;
 temp20: any;
 dethier1: any;
 dethierr: any;
 moyTemp!: number;
 moyHum!: number;
searchText!: string;
itemsperpage: number =12;
p: number = 1;
show:boolean = false;


	constructor(private serServe :UsersService) { }// importation du service 
  ngOnInit()  {
   
/* Fonction pour la recuperation des données humidité et temperature */
    this.serServe.historique().subscribe((data)=>{
      //console.log(data);
     this.currentDate = new Date().getDate() + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();// recuperation date actuelle
     this.dethier1 = new Date().getDate()-7 + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear(); // recuperation date du semaine derniere
    
     /* console.log(this.dethier1);
      console.log(this.dethierr); */
     /** filtre des temperatures  */
     this.temphum = data as unknown as Temphum[];
     this.temp8 = this.temphum.filter((e:any)=> e.Heure == "08:00:00" && e.Date == this.currentDate)
     this.temp12 = this.temphum.filter((e:any)=> e.Heure == "12:00:00" && e.Date == this.currentDate)
     this.temp19 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" && e.Date == this.currentDate)
     this.temp20 = this.temphum.filter((e:any)=> e.Heure == "08:00:00"   && e.Date > this.dethier1 && e.Date <= this.currentDate  && e.Date !== this.dethierr )
    /*  console.log(this.temp20); */
     
    /*  this.temp20.forEach(function (temperature:any) {
      console.log(temperature.temperature);
    });  */

    const t8 = this.temp8[0].temperature;
    const h8 = this.temp8[0].humidite;
    const t12 = this.temp12[0].temperature;
    const h12 = this.temp12[0].humidite;
    const t19 = this.temp19[0].temperature;
    const h19 = this.temp19[0].humidite;
    /* calcul de la temperature et de l'humidité moyenne */ 
    this.moyTemp = (parseInt(String(t8)) + parseInt(String(t12)) + parseInt(String(t19))) / 3;
    this.moyHum = (parseInt(String(h8)) + parseInt(String(h12)) + parseInt(String(h19))) / 3;
    
    })     
     
  }
  public afficher():void{
    this.show = !this.show;
  }
}




