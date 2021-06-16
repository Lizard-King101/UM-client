import { Component } from "@angular/core";
import { SearchService } from "../_services/search.service";
import { SocketService } from "../_services/socket.service";

@Component({
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.scss']
})
export class SearchPageComponent {
    query: string;
    pastQuery: string;
    searching: boolean = false;
    results: any[] = [];
    nextPageToken: string;
    constructor(private yt: SearchService, private socket: SocketService) {
        socket.io.on('song-progress', (data: {id: string, percent?: number}) => {
            this.results.forEach((result) => {
                if(result.id.videoId == data.id) {
                    result.adding = true;
                    if(data.percent) result.percent = data.percent;
                }
            })
        });

        socket.io.on('song-complete', (id: string) => {
            this.results.forEach((result) => {
                if(result.id.videoId == id) {
                    result.adding = false;
                    result.complete = true;
                }
            });
        })
    }

    submitSearch() {
        this.searching = true;
        this.pastQuery = this.query;
        this.yt.search(this.query).subscribe((data) => {
            this.searching = false;
            console.log(data);
            this.results = data.items;
            this.nextPageToken = data.nextPageToken ? data.nextPageToken : undefined;
        })
    }

    loadMore() {
        this.searching = true;
        this.yt.nextPage(this.pastQuery, this.nextPageToken).subscribe((data) => {
            this.searching = false;
            console.log(data);
            
            this.results = this.results.concat(data.items);
            this.nextPageToken = data.nextPageToken ? data.nextPageToken : undefined;
        })
    }

    addToPlaylist(result) {
        console.log(result);
        result.adding = true;
        this.socket.io.emit('request-song', result.id.videoId);
    }
}