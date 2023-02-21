import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Activity } from 'src/app/domain/model/activity';
import { Movie } from 'src/app/domain/model/movie';

@Component({
  selector: 'app-activity-item-easy',
  templateUrl: './activity-item-easy.component.html',
  styleUrls: ['./activity-item-easy.component.scss'],
})
export class ActivityItemEasyComponent implements OnInit {
  @Input() movieArray: Movie[] | undefined;
  @Input() year: number;
  @Output() updateMovieEmitter = new EventEmitter<{movieId: string}>();
  intensityValue = '';
  shouldDisplayEdit = false;
  constructor() { }

  ngOnInit() {
    console.log(this.movieArray)
  }

  onItemClick() {
    this.shouldDisplayEdit = !this.shouldDisplayEdit;
  }

  isIntensityValid(): boolean {
    return this.intensityValue === 'easy' || this.intensityValue === 'medium' || this.intensityValue === 'hard';
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  // updateIntensity() {
  //   this.updateMovieEmitter.emit({activityId: this.movie.activityId, newIntensity: this.intensityValue});
  // }
}
