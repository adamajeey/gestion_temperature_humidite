
import { Component, OnInit } from '@angular/core';

import { SocketService } from '../meteo.service';
import { io } from 'socket.io-client';

import { Temp_Humid } from '../services/interfaces/movie';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-table-historique',
  templateUrl: './table-historique.component.html',
  styleUrls: ['./table-historique.component.css']
})
export class TableHistoriqueComponent implements OnInit{
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

	temphum: Temp_Humid[] = [];

	constructor() { }
  socket = io('http://localhost:3000');
	ngOnInit()  {
    this.socket.on('data', (data) => {
     console.log(data);
     this.message$.next(data)
     this.message$.asObservable().subscribe((d) => {
      console.log(d);
      
     })
    }); }

	


}





