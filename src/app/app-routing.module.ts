import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RideEnabled } from './_services/ride-enabled.gaurd';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'connect',
        pathMatch: 'full'
    },
    {
        path: 'connect',
        loadChildren: () => import('./connect/connect.module').then(m => m.ConnectPageModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),

        canActivate: [RideEnabled]
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.HomePageModule),
        canActivate: [RideEnabled]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
