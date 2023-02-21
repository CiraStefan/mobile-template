import { AddUpdateGamePage } from './pages/add-update-game/add-update-game.page';
import { GameLibraryListPage } from './pages/game-library-list/game-library-list.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/game-library-list/game-library-list.module').then( m => m.GameLibraryListPageModule)
  },
  {
    path: 'add-movie',
    loadChildren: () => import('./pages/add-update-game/add-update-game.module').then( m => m.AddUpdateGamePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'movies-by-year',
    loadChildren: () => import('./pages/easiest-activities/easiest-activities.module').then( m => m.EasiestActivitiesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
