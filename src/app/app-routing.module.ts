import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';


const routes: Routes = [

  {
    path:'signup', component: SignupComponent, pathMatch:'full'
  },
  {
    path:'', component: HomeComponent, pathMatch:'full'
  },
  {
    path:'login', component: LoginComponent, pathMatch:'full'
  },
  //Admin Panel
  {
    path:'admin', component: DashboardComponent, canActivate:[AdminGuard],
    children:[
      {
        path: '', component: WelcomeComponent 
      },
      {
         path: 'profile', component: ProfilesComponent 
      },
      {
        path:'categories', component:ViewCategoriesComponent
      },
      {
        path:'add-category', component:AddCategoriesComponent
      },
      {
        path:'quizzes', component:ViewQuizzesComponent
      },
    ],
  },
  {
    path:'user-dashboard', component: UserDashboardComponent, pathMatch:'full', canActivate:[NormalGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
