export const MOVIE_SCHEMA = {
    title: 'movie schema',
    version: 0,
    primaryKey: 'movieId',
    type: 'object',
    properties: {
        movieId : {
            type: 'string',
        },
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        genre: {
            type: 'string'
        },
        director: {
            type: 'string'
        },
        year: {
            type: 'integer'
        }
    },
    required: [],
  }
  