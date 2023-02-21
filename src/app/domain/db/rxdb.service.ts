import { Injectable } from '@angular/core';
import {
  addRxPlugin,
  createRxDatabase, RxDatabase
} from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { MOVIE_SCHEMA } from './movie.schema';
import { GENRE_SCHEMA } from './genre.schema';


@Injectable({
  providedIn: 'root'
}
)
export class DatabaseService {
  static dbPromise: Promise<RxDatabase>;

  private async _create(): Promise<RxDatabase> {
    console.log('DatabaseService: creating database..');
    addRxPlugin(RxDBQueryBuilderPlugin);
    const db = await createRxDatabase({
      name: 'moviedb',
      storage: getRxStorageDexie()
    });
    console.log('DatabaseService: created database');

    // create collections
    console.log('DatabaseService: create collections');
    const myCollections = await db.addCollections({
      movies: {
        schema: MOVIE_SCHEMA
      },
      genres: {
        schema: GENRE_SCHEMA
      }
    });



    return db;
  }

  get(): Promise<RxDatabase> {
    if (DatabaseService.dbPromise)
      return DatabaseService.dbPromise;

    // create database
    DatabaseService.dbPromise = this._create();
    return DatabaseService.dbPromise;
  }
}
