import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SocketService } from "../_services/socket.service";

@Component({
    templateUrl: 'connect.component.html',
    styleUrls: ['connect.component.scss']
})
export class ConnectPageComponent {
    ride: string;

    constructor(private snackBar: MatSnackBar, private socket: SocketService) {
        this.socket.io.on('test-return', () => {
            console.log('RETURN');
        })
    }

    submitRideID() {
        console.log(this.ride);
        
        this.socket.io.emit('submit-room', this.ride);
    }
}