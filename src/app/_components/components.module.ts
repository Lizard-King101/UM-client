import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { MatSliderModule } from '@angular/material/slider'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog'; 

const MaterialModules = [
    MatSliderModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
]

@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        ...MaterialModules
    ],
    exports: [
        ...MaterialModules
    ]
})
export class ComponentsModule {}