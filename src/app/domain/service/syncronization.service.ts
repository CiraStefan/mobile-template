import { ActivityDto } from 'src/app/api/dtos/activity-dto';
import { Category, ActivityDocument, mapActivityToDocument } from './../model/activity';
import { combineLatest, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { MovieApiService } from './../../api/services/activity-api.service';
import { MovieRepository } from './../repository/activity.repo';
import { LoadingService } from './loading.service';
import { mapDtoToModel, MovieDto } from 'src/app/api/dtos/movie-dto';
import { Genre, mapMovieToDocument, MovieDocument } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class SyncronizationService {

  constructor(
    private movieRepo: MovieRepository,
    private movieApiService: MovieApiService,
    private loadingService: LoadingService
  ) { }

  public updateLocalFromServerGenres() {
    combineLatest([this.movieRepo.getAllGenres(), this.movieApiService.getGenres()]).pipe(
      tap(([localGenres, serverGenres]) => {
        serverGenres.forEach((genreServer: Genre) => {
          if (!localGenres.some((genreLocal: Genre) => genreLocal.name === genreServer.name)) {
            this.movieRepo.insertGenre(genreServer).subscribe();
          }
        })
      })
    ).subscribe(() => {
    });
    // const allActivitiesByCategory = this.activityApiService.getCategories().pipe(
    //   exhaustMap(categories => {
    //     const activitiesArray: Observable<ActivityDto[]>[] = []
    //     categories.forEach(category => {
    //       activitiesArray.push(this.activityApiService.getActivitiesByCategory(category.name));
    //     })
    //     return combineLatest(activitiesArray).pipe(map(result => flat(result)));
    //   })
    // )
    // combineLatest([this.activityRepo.getAll(), allActivitiesByCategory]).pipe(
    //   tap(([localActivities, serverActivities]) => {
    //     serverActivities.forEach((activity: ActivityDto) => {
    //       if (!localActivities.some((activityDb: ActivityDocument) => +activityDb.activityId === activity.id)) {
    //         this.activityRepo.insert(mapActivityToDocument(mapDtoToModel(activity))).pipe(first()).subscribe();
    //       }
    //     })
    //   }),
    //   first()
    // ).subscribe();
  }

  public updateLocalFromServerMoviesByGenres(genre: string) {
    combineLatest([this.movieRepo.getAllByGenre(genre), this.movieApiService.getMoviesByGenre(genre)]).pipe(
      tap(([localMovies, serverMovies]) => {
        serverMovies.forEach((movieServer: MovieDto) => {
          if (!localMovies.some((movieLocal: MovieDocument) => movieServer.id === +movieLocal.movieId)) {
            this.movieRepo.insert(mapMovieToDocument(mapDtoToModel(movieServer))).subscribe();
          }
        })
      })
    ).subscribe(() => {
    });
  }
}
