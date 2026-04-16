import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'practices',
        loadComponent: () => import('./features/practices/components/practices/practices.component').then(m => m.PracticesComponent)
    },
    {
        path: 'rxjs',
        loadComponent: () => import('./features/rxjs/components/rxjs/rxjs.component').then(m => m.RxjsComponent)
    },
    {
        path: 'ngrx',
        loadComponent: () => import('./features/ngrx/components/ngrx/ngrx.component').then(m => m.NgrxComponent)
    },
    {
        path: 'signals',
        loadComponent: () => import('./features/signals/components/signals/signals.component').then(m => m.SignalsComponent)
    },
    {
        path: '',
        redirectTo: 'practices',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'practices'
    }
];
