import { Component, OnInit } from '@angular/core';
import { IFilmShort } from "../../models";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  loading: boolean;
  films: IFilmShort[] = [];

  constructor() { }

  /** Получить список фильмов из локального хранилища */
  getMyFilms() {
    const localFilms = localStorage.films;
    if (localFilms && localFilms !== '[]') {
      this.films = JSON.parse(localFilms);
    }
  }

  /**
   * Удаление фильма из списка и локального хранилища
   * @param id {string} Уникальный номер фильма
   */
  removeFilm(id) {
    const newFilmsList = this.films.filter(item => item.imdbID !== id);
    this.films = newFilmsList;
    localStorage.films = JSON.stringify(newFilmsList);
  }

  ngOnInit() {
    this.getMyFilms();
  }
}
