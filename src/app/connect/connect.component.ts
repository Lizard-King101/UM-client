import { Component } from "@angular/core";
import { SocketService } from "../_services/socket.service";

@Component({
    templateUrl: 'connect.component.html',
    styleUrls: ['connect.component.scss']
})
export class ConnectPageComponent {
    ride: string;

    constructor( public socket: SocketService) {
    }

    submitRideID() {
        this.socket.io.emit('submit-room', this.ride.toLocaleLowerCase());
    }
}