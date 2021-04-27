import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ResourcesComponent } from './resources/resources.component';
import { DonationComponent } from './donation/donation.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'resources', component: ResourcesComponent
  },
  {
    path: 'donation', component: DonationComponent
  },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule,BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
