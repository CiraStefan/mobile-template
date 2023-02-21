import { LoadingService } from './../../domain/service/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { Activity, Category } from 'src/app/domain/model/activity';
import { MoviesService } from 'src/app/domain/service/activity.service';
import { Genre, Movie } from 'src/app/domain/model/movie';

@Component({
  selector: 'app-game-library-list',
  templateUrl: './game-library-list.page.html',
  styleUrls: ['./game-library-list.page.scss'],
})
export class GameLibraryListPage implements OnInit {
  loading$ = this.loadingService.loading$;
  genresList$: Observable<Genre[]> = this.movieService.getAllGenres();
  shouldDisplayMovies: Map<string, boolean> = new Map<string, boolean>();
  currentlyExpanded: string = '';
  moviesByGenre$: Observable<Movie[]>;
  constructor(private router: Router, private movieService: MoviesService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.genresList$.pipe(first()).subscribe(genres =>
      genres.forEach(genre => this.shouldDisplayMovies.set(genre.name, false)));
  }

  public expandGenre(genre: string) {
    if (this.currentlyExpanded != undefined) {
      this.shouldDisplayMovies.set(this.currentlyExpanded, false);
    }
    if (genre === this.currentlyExpanded) {
      this.currentlyExpanded = '';
      return;
    }
    this.currentlyExpanded = genre;
    this.moviesByGenre$ = this.movieService.getAllByGenre(this.currentlyExpanded)
    this.shouldDisplayMovies.set(genre, true);
  }

  public navigateToAddMovie() {
    this.router.navigate(['add-movie']);
  }

  public navigateToMoviesByYear() {
    this.router.navigate(['movies-by-year']);
  }

  public onDeleteMovie(movieId: string) {
    this.movieService.remove(movieId);
  }
}
