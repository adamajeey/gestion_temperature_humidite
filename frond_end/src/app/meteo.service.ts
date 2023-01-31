import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Socket } from 'ngx-socket-io';
import { Temp_Humid } from './services/interfaces/movie';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

	// emit event
	allume() {
		this.socket.emit('active', '1');
	}

	addMovie(TeHu: Temp_Humid) {
		this.socket.emit('addMovie', TeHu);
	}

	updateMovie(TeHu: Temp_Humid) {
		this.socket.emit('updateMovie', TeHu);
	}

	deleteMovie(id: Temp_Humid) {
		this.socket.emit('deleteMovie', id);
	}

	// listen event
	onFetch() {
		return this.socket.fromEvent('data');
	}
	onFetchitem() {
		return this.socket.fromEvent('mute');
	}
	
}
