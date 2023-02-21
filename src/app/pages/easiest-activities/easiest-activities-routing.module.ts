import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EasiestActivitiesPage } from './easiest-activities.page';

const routes: Routes = [
  {
    path: '',
    component: EasiestActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EasiestActivitiesPageRoutingModule {}
