import { Activity } from './../../../../domain/model/activity';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Movie } from 'src/app/domain/model/movie';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  @Input() movie!: Movie;
  @Output() deleteGameEmitter = new EventEmitter<string>();
  @Output() updateGameEmitter = new EventEmitter<string>();
  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async onDeleteItem() {
    console.log('ia de aici tarane')
    const deleteConfirmation = await this.alertController.create({
      header: 'Deleting Movie',
      message: `Are you sure you want to delete ${this.movie.name}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteGameEmitter.emit(this.movie.movieId);
          },
        },
      ],
    });
    await deleteConfirmation.present();
  }
}
