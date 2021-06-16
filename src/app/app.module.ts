import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SocketService } from './_services/socket.service';
import { RideEnabled } from './_services/ride-enabled.gaurd'
import { SearchService } from './_services/search.service';

import { ComponentsModule } from './_components/components.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ModalsModule } from './_modals/modals.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ComponentsModule,
        ModalsModule,
        NgbModule,
        HttpClientModule,
        FontAwesomeModule
    ],
    providers: [
        SocketService,
        SearchService,
        RideEnabled
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
