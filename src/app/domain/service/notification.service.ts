import { ActivityItemEasyComponent } from './../../pages/easiest-activities/components/activity-item-easy/activity-item-easy.component';
import { Activity } from 'src/app/domain/model/activity';
import { Injectable } from '@angular/core';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { exhaustMap, from } from 'rxjs';
import { format } from 'date-fns';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController, private modalController: ModalController) { }

  public displayToastMessage(header: string, message: string) {
    from(this.toastController.create({
      header: header,
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: 'toast'
    })).pipe(exhaustMap((toast) => from(toast.present()))).subscribe();
  }

  public displayMovieModal(movie: Movie) {
    from(this.modalController.create({
      component: ActivityItemEasyComponent,
      componentProps: {movie: movie},
      handle: true,
      breakpoints: [.5],
      initialBreakpoint: .5
    })).pipe(exhaustMap((modal) => from(modal.present()))).subscribe()
  }
}
