import { Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { IsAdminGuard } from '@auth/guards/is-admin.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
        canMatch: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.routes').then(m => m.adminDashboardRoutes),
        canMatch: [IsAdminGuard]
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes').then(m => m.storeFrontRoutes)
    }
];
