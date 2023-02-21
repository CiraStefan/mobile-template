import { Category } from './../model/activity';
import { RxDocument } from 'rxdb';
import { DatabaseService } from '../db/rxdb.service';
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { catchError, EMPTY, first, from, mergeMap, Observable, of } from 'rxjs';
import { Activity, ActivityDocument } from '../model/activity';
import { Genre, Movie, MovieDocument } from '../model/movie';

@Injectable({
  providedIn: 'root'
}
)
export class MovieRepository {

  constructor(private databaseService: DatabaseService) {}


  getAllByGenre(genre: string) {
    return from(this.databaseService.get()).pipe(
      mergeMap(dbInstance => dbInstance['movies'].find().where('genre').eq(genre).$)
      )
    }

    public getAll(): Observable<MovieDocument[]> {
      return from(this.databaseService.get()).pipe(
        mergeMap(dbInstance => dbInstance['movies'].find().$)
        )
    }

    public getAllGenres(): Observable<Genre[]> {
      return from(this.databaseService.get()).pipe(
        mergeMap(dbInstance => dbInstance['genres'].find().$)
        )
    }

    public insertGenre(genre: Genre): Observable<Genre> {
      return from(this.databaseService.get()).pipe(
        mergeMap(dbInstance => dbInstance['genres'].insert(genre)),
        first()
      )
    }

    public getById(id: string): Observable<MovieDocument> {
        return from(this.databaseService.get()).pipe(
          mergeMap(dbInstance => dbInstance['movies'].findOne().where('movieId').eq(id).$)
        )
      }

  public insert(movie: MovieDocument): Observable<MovieDocument> {
    return from(this.databaseService.get()).pipe(
      mergeMap(dbInstance => dbInstance['movies'].insert(movie)),
      first()
    )
  }

  public remove(movieId: string): Observable<boolean> {
    return from(this.databaseService.get()).pipe(
      mergeMap(dbInstance => from(dbInstance['movies'].findByIds([movieId]))),
      mergeMap((movies: Map<string, RxDocument<MovieDocument>>) => {
        const movieToRemove: RxDocument<MovieDocument> | undefined = movies.get(movieId);
        if (movieToRemove !== undefined) {
          return movieToRemove.remove()
        }
        return of(false);
      }),
      first()
    )
  }

  public update(movie: MovieDocument): Observable<Movie> {
    return from(this.databaseService.get()).pipe(
      mergeMap(dbInstance => from(dbInstance['movies'].findByIds([movie.movieId]))),
      mergeMap((movies: Map<string, RxDocument<MovieDocument>>) => {
        const movieToUpdate: RxDocument<MovieDocument> | undefined = movies.get(movie.movieId);
        if (movieToUpdate !== undefined) {
          return movieToUpdate.update({
            $set: {
              name: movie.name,
              description: movie.description,
              genre: movie.genre,
              director: movie.director,
              year: movie.year
            }
          })
        }
        return of(false);
      }),
      first()
    )
  }
}
