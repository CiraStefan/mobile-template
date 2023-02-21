import { GameItemComponent } from './components/game-item/game-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameLibraryListPageRoutingModule } from './game-library-list-routing.module';

import { GameLibraryListPage } from './game-library-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameLibraryListPageRoutingModule,
  ],
  declarations: [GameLibraryListPage, GameItemComponent]
})
export class GameLibraryListPageModule {}
