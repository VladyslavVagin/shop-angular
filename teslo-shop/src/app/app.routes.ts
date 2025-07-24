import { Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
        canMatch: [AuthGuard]
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes').then(m => m.storeFrontRoutes)
    }
];
