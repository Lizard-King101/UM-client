import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ComponentsModule } from "../_components/components.module";
import { SearchPageComponent } from "./search.component";

const Routes: Routes = [
    {
        path: '',
        component: SearchPageComponent,
    }
]

@NgModule({
    entryComponents: [SearchPageComponent],
    declarations: [SearchPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        FontAwesomeModule,
        RouterModule.forChild(Routes)
    ]
})
export class HomePageModule {}