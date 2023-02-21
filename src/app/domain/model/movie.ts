import { formatISO, parseISO } from "date-fns";
import { RxDocument } from "rxdb";

/* eslint-disable @typescript-eslint/naming-convention */
export interface Movie {
  movieId: string;
  name: string;
  description: string;
  genre: string;
  director: string;
  year: number;
}

export interface MovieDocument {
  movieId: string;
  name: string;
  description: string;
  genre: string;
  director: string;
  year: number;
}

export interface Genre {
  name: string;
}

export const mapDocumentToMovie = (movie: MovieDocument): Movie => {
  return {
    movieId: movie.movieId,
    name: movie.name,
    description: movie.description,
    genre: movie.genre,
    director: movie.director,
    year: movie.year,
  } as Movie;
}

export const mapMovieToDocument = (movie: Movie): MovieDocument => {
  return {
    movieId: movie.movieId,
    name: movie.name,
    description: movie.description,
    genre: movie.genre,
    director: movie.director,
    year: movie.year,
  } as MovieDocument;
}

export const compareMoviesByYear = (movie1: Movie, movie2: Movie): number => {
  if(movie1.year === movie2.year) {
    return movie1.genre.toLocaleLowerCase().localeCompare(movie2.genre.toLocaleLowerCase())
  }

  if (movie1.year > movie2.year) {
    return 1;
  }
  else {
    return -1;
  }
}

