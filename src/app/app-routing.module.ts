import { AboutUsComponent } from './components/about-us/about-us.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'latest', component:LatestNewsComponent},
  {path:'signup', component:SignupComponent},
  {path:'logout', component:LogoutComponent},
  {path:'about-us', component:AboutUsComponent},
  {path:'details/:id', component:NewsDetailsComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
