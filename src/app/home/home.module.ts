import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ComponentsModule } from "../_components/components.module";
import { HomePageComponent } from "./home.component";

const Routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    }
]

@NgModule({
    entryComponents: [HomePageComponent],
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        FontAwesomeModule,
        RouterModule.forChild(Routes)
    ]
})
export class HomePageModule {}