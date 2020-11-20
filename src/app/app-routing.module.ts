import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeRoutes } from './modules/home/home.module';
import { LoginRoutes } from './modules/login/login.module';
import { AuthGuard } from './guards/auth.guard';
import { MultifactorGuard } from './guards/multifactor.guard';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0],
};

const routes: Routes = [
  {
    path: 'home',
    children: HomeRoutes,
    canActivate: [AuthGuard, MultifactorGuard]
  },
  {
    path: 'login',
    children: LoginRoutes,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
