import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Activity } from 'src/app/domain/model/activity';
import { Movie } from 'src/app/domain/model/movie';
import { MoviesService } from 'src/app/domain/service/activity.service';
import { LoadingService } from './../../domain/service/loading.service';
import { NotificationService } from './../../domain/service/notification.service';

@Component({
  selector: 'app-easiest-activities',
  templateUrl: './easiest-activities.page.html',
  styleUrls: ['./easiest-activities.page.scss'],
})
export class EasiestActivitiesPage implements OnInit {
  easiestMovies$: Observable<Movie[]>;
  activeYearMovies: Map<number, Movie[]> = new Map<number, Movie[]>(); 
  loading$ = this.loadingService.loading$;
  constructor(
    private movieService: MoviesService,
    private location: Location,
    private notificationService: NotificationService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    let auxMap = new Map([...this.activeYearMovies]);
    this.movieService.getAllMovies().subscribe(movies => {
      movies.forEach(movie => {
        if (this.activeYearMovies.get(movie.year) === undefined){
          auxMap.set(movie.year, []);
        }
        auxMap.get(movie.year)?.push(movie);
    });
      let sortedMap = new Map([...auxMap.entries()].sort((a, b) => b.length - a.length));
      this.activeYearMovies = sortedMap;
      
      console.log(this.activeYearMovies)
  });
  }

  navigateBack(): void {
    this.location.back();
  }

  updateIntensity(intensityAndActivityId: {activityId: string; newIntensity: string}) {
    this.movieService.updateIntensityAPI(intensityAndActivityId).subscribe(() =>{
      this.notificationService.displayToastMessage('Success', 'The intensity was updated!')
      this.easiestMovies$ = this.movieService.getAllMovies();
    });
  }
}
