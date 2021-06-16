import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SocketService } from "./socket.service";

@Injectable()
export class RideEnabled implements CanActivate {
    constructor(private socket: SocketService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
        return new Promise((res) => {
            if(!this.socket.connected) this.router.navigate([''], {replaceUrl: true})
            res(this.socket.connected);
        })
      }
}