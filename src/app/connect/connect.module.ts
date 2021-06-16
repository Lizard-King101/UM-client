import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "../_components/components.module";
import { ConnectPageComponent } from "./connect.component";

const Routes: Routes = [
    {
        path: '',
        component: ConnectPageComponent,
    }
]

@NgModule({
    entryComponents: [ConnectPageComponent],
    declarations: [ConnectPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule,
        RouterModule.forChild(Routes)
    ]
})
export class ConnectPageModule {}