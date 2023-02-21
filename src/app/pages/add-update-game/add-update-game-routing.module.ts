import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateGamePage } from './add-update-game.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateGamePageRoutingModule {}
