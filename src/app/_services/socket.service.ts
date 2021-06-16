import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import io from 'socket.io-client';

@Injectable()
export class SocketService {
    connected: boolean = false;

    public io;

    constructor(){
        this.io = io(environment.socket);
        console.log(environment);
        
    }

}

export interface Connection {
    client_auth: boolean;
    message?: string;
    room?: string;
}