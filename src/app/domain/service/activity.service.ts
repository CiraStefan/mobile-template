import { LoadingService } from './loading.service';
import { SyncronizationService } from './syncronization.service';
import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { unique } from 'radash';
import { catchError, EMPTY, exhaustMap, finalize, first, from, map, Observable, of, shareReplay, tap, throwError } from 'rxjs';
import { MovieRepository } from '../repository/activity.repo';
import { MovieApiService } from './../../api/services/activity-api.service';
import { compareActivitiesByIntensity, mapActivityToDocument, mapDocumentToActivity } from './../model/activity';
import { NotificationService } from './notification.service';
import { compareMoviesByYear, Genre, mapDocumentToMovie, mapMovieToDocument, Movie } from '../model/movie';
import { mapDtoToModel, mapModelToDto, MovieDto } from 'src/app/api/dtos/movie-dto';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(
    private repo: MovieRepository,
    private notificationService: NotificationService,
    private movieApiService: MovieApiService,
    private syncronizationService: SyncronizationService,
    private loadingService: LoadingService
  ) { }

  public getAll(): Observable<Movie[]> {
    console.log('getAll() entered');
    return this.repo.getAll().pipe(
      map(movieDocuments => movieDocuments.map(movieDocument => mapDocumentToMovie(movieDocument))),
      catchError(() => {
        this.notificationService.displayToastMessage('Error', 'Error on fetching movies');
        console.log('getAll() error');
        return of([])
      }),
      finalize( () => {
        console.log('getAll() exited');
      }),
    );
  }

  public getById(id: string): Observable<Movie> {
    console.log(`getById() entered id=${id}`);
    return this.repo.getById(id).pipe(
      map(movieDocument => mapMovieToDocument(movieDocument)),
      catchError(() => {
        this.notificationService.displayToastMessage('Error', 'Error on fetching movies');
        console.log('getById() error');
        return EMPTY;
      }),
      finalize( () => {
        console.log('getById() exited');
      }),
    );
  }

  public getAllByGenre(genre: string): Observable<Movie[]> {
    console.log(`getAllByCategory() entered, category: ${genre}`);
    return from(Network.getStatus()).pipe(
      first(),
      exhaustMap(networkStatus => {
        if (networkStatus.connected) {
          this.syncronizationService.updateLocalFromServerMoviesByGenres(genre);
        }
        return this.getAllByGenreDb(genre);
      })
    );

  }

  private getAllByGenreDb(genre: string): Observable<Movie[]> {
    console.log(`getAllByCategoryDb() entered, category: ${genre}`);
    return this.repo.getAllByGenre(genre).pipe(
      map(movieDocuments => movieDocuments.map(movieDocument => mapDocumentToMovie(movieDocument))),
      catchError(() => {
        this.notificationService.displayToastMessage('Error', 'Error on fetching movies by genre');
        console.log('getAllByCategoryDb() error');
        return of([]);
      }),
      finalize(() => {
        console.log('getAllByCategoryDb() exited');
      })
    );
  }

  public getAllGenres(): Observable<Genre[]> {
    console.log(`getAllGenres() entered`);
    return from(Network.getStatus()).pipe(
      exhaustMap(networkStaus => {
        if (networkStaus.connected) {
          this.syncronizationService.updateLocalFromServerGenres();
        }
        return this.getAllGenresDb();
      })
    )
  }

  private getAllGenresDb(): Observable<Genre[]> {
    console.log(`getAllGenresDb() entered`);
    return this.repo.getAllGenres().pipe(
      catchError(() => {
        this.notificationService.displayToastMessage('Error', 'Error on fetching genres');
        console.log('getAllGenresDb() error');
        return of([]);
      }),
      finalize(() => {
        console.log('getAllGenresDb() exited');
      })
    );
  }

  public insert(movie: Movie): void {
    from(Network.getStatus()).pipe(
      tap(networkStaus => {
        if (networkStaus.connected) {
          this.movieApiService.insert(mapModelToDto(movie)).pipe(first()).subscribe((movie: MovieDto) => {
            this.insertDb(mapDtoToModel(movie));
          });
        }
        else {
          this.notificationService.displayToastMessage('Error', 'Inserting a new movie is not available offline');
        }
      })
    ).subscribe();
  }

  private insertDb(movie: Movie) {
    console.log(`insert() entered, movie: ${movie}`);
    this.repo.insert(mapMovieToDocument(movie)).pipe(
      catchError((er) => { console.error(er); return throwError(() => movie); })
    )
      .subscribe({
        next: (movie) => { this.notificationService.displayToastMessage('Success', `The movie ${movie.name} was added successfully`); },
        error: (err) => { this.notificationService.displayToastMessage('Error', `Error on adding ${err.name}`); },
        complete: () => { console.log(`insert() exited`); }
      });
    this.repo.insertGenre({name: movie.genre}).pipe(first()).subscribe()
  }

  public remove(movieId: string): void {
    from(Network.getStatus()).pipe(
      tap(networkStaus => {
        if (networkStaus.connected) {
          this.movieApiService.delete(+movieId).pipe(first()).subscribe((movie: MovieDto) => {
            this.removeDb(movie.id.toString());
          });
        }
        else {
          this.notificationService.displayToastMessage('Error', 'Deleting a new movie is not available offline');
        }
      })
    ).subscribe();
  }

  private removeDb(movieId: string) {
    console.log(`remove() entered, movieId: ${movieId}`);
    this.repo.remove(movieId).pipe(
      catchError(() => throwError(() => movieId))
    )
      .subscribe({
        next: () => { this.notificationService.displayToastMessage('Success', `The movie was removed successfully`); },
        error: () => this.notificationService.displayToastMessage('Error', `Error on removing activity`),
        complete: () => { console.log(`remove() exited`); }
      });
  }

  public update(movie: Movie): void {
    console.log(`update() entered, movie: ${movie}`);
    this.repo.update(mapMovieToDocument(movie)).pipe(
      catchError(() => throwError(() => movie)),
    )
    .subscribe({
      next: () => {this.notificationService.displayToastMessage('Success', `The movie ${movie.name} was updated successfully`)},
      error: () => this.notificationService.displayToastMessage('Error', `Error on updating movie ${movie.name}`),
      complete: () => {console.log(`update() exited`)}

    })
  }

  public getAllMovies(): Observable<Movie[]> {
    console.log('getAllMovies() api call started');
    return this.movieApiService.getAll().pipe(
      map(movies => movies.map(movie => mapDtoToModel(movie))),
      map(movies => movies.slice(0, 10)),
      catchError((er) => {
        this.notificationService.displayToastMessage('Error', 'Error on fetching all movies');
        console.log('getAllMovies() api call error');
        return of(er);
      }),
      finalize(() => console.log('getAllMovies() api call finished'))
    );
  }

  public updateIntensityAPI(intensityAndId: {activityId: string; newIntensity: string}): Observable<void> {
    console.log(`updateIntensityAPI() api call started, intensityAndId=${intensityAndId}`);
    return this.movieApiService.updateIntensity({id: +intensityAndId.activityId, intensity: intensityAndId.newIntensity}).pipe(
      catchError((er) => {
        console.log('updateIntensityAPI() api call error');
        return of(er);
      }),
      finalize(() => console.log('updateIntensityAPI() api call finished'))
    )

  }

  public subscribeToWebsocket(): void {
    this.movieApiService.subscribeToWebSocket().subscribe({
      next: (movie: MovieDto) => {
        this.repo.getById(movie.id.toString()).pipe(
          first(),
        ).subscribe((result) => {
          if (result === null) {
            this.notificationService.displayMovieModal(mapDtoToModel(movie));
          }
        });
      },
      error: () => {},
      complete: () => {}
    })
  }

}
