import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { ReconnectingModal } from './_modals/reconnecting/reconnecting.modal';
import { SocketService, Connection } from './_services/socket.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'uber-music-client';
    connecting: MatDialogRef<ReconnectingModal>;

    backButton: boolean = false;

    constructor(
        private socket: SocketService, 
        private snackBar: MatSnackBar, 
        private router: Router,
        private dialogue: MatDialog
    ) {
        let io = this.socket.io;

        this.socket.io.on('request-auth', () => {
            if(this.connecting) {
                this.connecting.close();
                delete this.connecting
            }
            let data: any = {
                client: true
            }
            let room = localStorage.getItem('room');
            if(room) data.room = room;
            this.socket.io.emit('auth', data);
        });

        this.socket.io.on('connected', (connection: Connection) => {
            console.log('CONNECTED');
            if(connection.client_auth) {
                this.socket.connected = true;
                if(connection.room) localStorage.setItem('room', connection.room);
                this.router.navigate(['home'], {replaceUrl: true});
            } else {
                this.socket.connected = false;
                localStorage.removeItem('room');
                this.router.navigate([''], {replaceUrl: true});
                this.socket.thanks = connection.thanks ? true : false;
                if(connection.message) this.snackBar.open(connection.message, 'Okay', {duration: 1000});
            }
        });

        this.socket.io.on('reset', () => {
            console.log('RESET');
            
            this.socket.connected = false;
            localStorage.removeItem('room');
            this.router.navigate([''], {replaceUrl: true});
        })

        this.socket.io.on('disconnect', () => {
            this.socket.connected = false;
            let data: any = {
                client: true
            }
            let room = localStorage.getItem('room');
            if(room) data.room = room;
            this.connecting = this.dialogue.open(ReconnectingModal, {disableClose: true});
            setTimeout(() => {
                this.socket.io.emit('auth', data);
            }, 1000)
        });

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.backButton = event.url.toLocaleLowerCase().includes('search');
        });
    }

    backToPlaylist() {
        this.router.navigate(['home'], {replaceUrl: true});
    }
}