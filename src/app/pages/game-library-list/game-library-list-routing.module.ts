import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameLibraryListPage } from './game-library-list.page';

const routes: Routes = [
  {
    path: '',
    component: GameLibraryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameLibraryListPageRoutingModule {}
