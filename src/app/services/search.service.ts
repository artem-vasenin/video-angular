import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {IFilm, ISearch} from "../models";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  /**
   * Поиск фильмов по наименованию
   * @param title {string} наименование фильма.
   */
  searchFilmByTitle(title): Observable<ISearch> {
    const url = `${environment.baseUrl}?apikey=${environment.apiKey}&s=${title}`;
    return this.http.get<ISearch>(url);
  }

  /**
   * Получение информации о фильме по id
   * @param id {string} уникальный номер фильма.
   */
  searchFilmById(id): Observable<IFilm> {
    const url = `${environment.baseUrl}?apikey=${environment.apiKey}&i=${id}`;
    return this.http.get<IFilm>(url);
  }
}
