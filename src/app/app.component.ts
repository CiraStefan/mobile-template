import { MoviesService } from 'src/app/domain/service/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {
  constructor(private activityService: MoviesService) {}

  ngOnInit(): void {
    this.activityService.subscribeToWebsocket();
  }

}
