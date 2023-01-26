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
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

 temphum!: Temphum[] ;


	constructor(private serServe :UsersService) { }
  ngOnInit()  {
    this.serServe.historique().subscribe((data)=>{
      console.log(data);
     this.temphum = data as unknown as Temphum[];
    console.log(this.temphum);
    
     
      
     
    })     
  }
}




