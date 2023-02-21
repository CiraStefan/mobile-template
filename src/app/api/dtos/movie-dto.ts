import { formatISO, parseISO } from "date-fns";
import { Activity } from "src/app/domain/model/activity";
import { Movie } from "src/app/domain/model/movie";

export interface MovieDto {
  id: number;
  name: string;
  description: string;
  genre: string;
  director: string;
  year: number;
}

// export interface IntensityBodyDto {
//   id: number;
//   intensity: string;
// }

export const mapDtoToModel = (movie: MovieDto): Movie => {
  return {
    movieId: movie.id.toString(),
    name: movie.name,
    description: movie.description,
    genre: movie.genre,
    director: movie.director,
    year: movie.year,
  } as Movie;
}

export const mapModelToDto = (movie: Movie): MovieDto => {
  return {
    id: +movie.movieId,
    name: movie.name,
    description: movie.description,
    genre: movie.genre,
    director: movie.director,
    year: movie.year,
  } as MovieDto;
}
