import { Component, OnDestroy } from "@angular/core";
import { MatSliderChange } from "@angular/material/slider";
import { SocketService } from "../_services/socket.service";
import { environment } from "../../environments/environment";
@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomePageComponent implements OnDestroy{
    url: string = environment.socket;
    volume: number;
    setVolume: number = 0;
    locked: boolean = false;

    status: Status = {
        playing: false
    }

    songs: Song[] = [];

    constructor(private socket: SocketService) {
        console.log(socket.io);
        
        this.socket.io.on('set-volume', (setVol: SetVolume) => {
            console.log(setVol);
            
            if(setVol.emitter && setVol.emitter == this.socket.io.id) return;
            this.volume = this.setVolume = setVol.volume;
            this.locked = setVol.locked;
        });

        this.socket.io.on('status', (status: Status) => {
            if(status.emitter != undefined && status.emitter == this.socket.io.id) return;
            this.status = status;
            console.log('STATUS', status);
            
        });

        this.socket.io.on('client-music', (songs: Song[]) => {
            this.songs = songs;
            console.log('SONGS', this.songs);
            
        });

        this.socket.io.on('requested-song', (song: Song) => {
            this.songs.push(song);
        })

        this.socket.io.emit('get-client-music');
        this.socket.io.emit('get-status');
        this.socket.io.emit('get-volume');
    }

    ngOnDestroy() {
        this.socket.io.off('client-music');
        this.socket.io.off('status');
        this.socket.io.off('set-volume');
        this.socket.io.off('requested-song');
    }

    testLock() {
        this.socket.io.emit('test-lock');
    }

    onTogglePlay() {
        this.status.playing = !this.status.playing;
        this.socket.io.emit('set-status', {playing: this.status.playing});
    }

    onNext() {
        this.socket.io.emit('request-next');
    }

    playSong(song: Song) {
        this.socket.io.emit('request-play', song);
    }

    volumeUpdate(ev: MatSliderChange) {
        this.setVolume = ev.value;
        this.socket.io.emit('volume', ev.value);
    }
}

interface Status {
    song?: Song;
    playing: boolean;
    emitter?: string;
}

interface Song {
    id: number;
    video_id: string;
    title: string;
    artist: string;
    tags: string;
    client: boolean;
    added: Date;
    last_played: Date;
    requested?: boolean;
}

interface SetVolume {
    volume: number;
    locked: boolean;
    emitter?: string;
}