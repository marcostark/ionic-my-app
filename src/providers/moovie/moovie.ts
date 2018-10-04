import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MoovieProvider {

  private baseEndpoint = 'https://api.themoviedb.org/3';
  private apiKey = 'f68473c740a0492a5b058938bbfa9351';

  constructor(public http: Http) { }

  getLatestMovies(pageAtual = 1) {
    return this.http.get(this.baseEndpoint + `/movie/popular?page=${pageAtual}&api_key=` + this.apiKey);
  }

  getMovie(filmeId) {
    return this.http.get(this.baseEndpoint + `/movie/${filmeId}?api_key=` + this.apiKey);
  }
}
