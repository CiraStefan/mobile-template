import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Genre } from 'src/app/domain/model/movie';
import { environment } from 'src/environments/environment';
import { ActivityDto } from '../dtos/activity-dto';
import { MovieDto } from '../dtos/movie-dto';
import { Category } from './../../domain/model/activity';
import { IntensityBodyDto } from './../dtos/activity-dto';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private apiEndpoint = environment.apiUrl;
  webSocketSubject: WebSocketSubject<MovieDto> = webSocket(environment.ws);
  constructor(private httpClient: HttpClient) { }

  public getGenres(): Observable<Genre[]> {
    return this.httpClient.get<string[]>(this.apiEndpoint + 'genres').pipe(
      map(genres => genres.map(genres => ({name: genres} as Genre)))
    );
  }

  public getMoviesByGenre(genre: string): Observable<MovieDto[]> {
    console.log('GetAllMovies with http...')
    return this.httpClient.get<MovieDto[]>(`${this.apiEndpoint}movies/${genre}`)
  }

  public insert(movieDto: MovieDto): Observable<MovieDto> {
    return this.httpClient.post<MovieDto>(`${this.apiEndpoint}movie`, movieDto);
  }

  public delete(movieId: number): Observable<MovieDto> {
    return this.httpClient.delete<MovieDto>(`${this.apiEndpoint}movie/${movieId}`);
  }

  public getAll(): Observable<MovieDto[]> {
    return this.httpClient.get<MovieDto[]>(this.apiEndpoint + 'all');
  }

  public updateIntensity(body: IntensityBodyDto): Observable<void> {
    return this.httpClient.post<void>(this.apiEndpoint + 'intensity', body);
  }

  public subscribeToWebSocket(): WebSocketSubject<MovieDto>  {
    return this.webSocketSubject;
  }
}
