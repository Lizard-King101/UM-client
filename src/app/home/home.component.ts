import { Component } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { SocketService } from "../_services/socket.service";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomePageComponent {
    volume: number;
    setVolume: number = 0;
    locked: boolean = false;

    constructor(private socket: SocketService) {
        console.log(socket.io);
        
        this.socket.io.on('set-volume', (setVol: SetVolume) => {
            if(setVol.emitter && setVol.emitter == this.socket.io.id) return;
            this.volume = this.setVolume = setVol.volume;
            this.locked = setVol.locked;
        })

        this.socket.io.emit('get-volume');
    }

    testLock() {
        this.socket.io.emit('test-lock');
    }

    volumeUpdate(ev: MatSliderChange) {
        this.setVolume = ev.value;
        this.socket.io.emit('volume', ev.value);
    }
}

interface SetVolume {
    volume: number;
    locked: boolean;
    emitter?: string;
}