import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from "../_components/components.module";
import { ReconnectingModal } from "./reconnecting/reconnecting.modal";

@NgModule({
    declarations: [ReconnectingModal],
    entryComponents: [ReconnectingModal],
    imports: [
        CommonModule,
        FormsModule,
        ComponentsModule
    ],
    exports: [
        ReconnectingModal
    ]
})
export class ModalsModule { }