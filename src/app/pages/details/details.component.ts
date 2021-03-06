import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IFilm, IFilmShort } from "../../models";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;
  loading: boolean = false;
  imdbID: string;
  film$: IFilm = null;
  films: IFilmShort[] = [];
  fSub: Subscription;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.routeSubscription = this.route.paramMap
      .subscribe(params => {
        this.imdbID = params.get('id');
      });
  }

  /**
   * Получение фильма по его ID
   * @param id {string} ID фильма.
   */
  searchFilms(id) {
    this.loading = true;
    this.fSub = this.searchService.searchFilmById(id)
      .subscribe(data => {
        this.film$ = data;
        this.loading = false;
      });
  }

  /** Добавить выбранный фильм в свой список */
  addToList() {
    if (this.films.length
      && this.films.find(i => i.imdbID === this.film$.imdbID) !== undefined) {
      return;
    } else {
      const data: IFilmShort = {
        Poster: this.film$.Poster,
        Title: this.film$.Title,
        Type: this.film$.Type,
        Year: this.film$.Year,
        imdbID: this.film$.imdbID,
      };
      this.films.push(data);
      localStorage.films = JSON.stringify(this.films);
      this.router.navigate(['/list']);
    }
  }

  /** Проверка есть ли данный фильм в нашем списке */
  filmNotFind() {
    return !!(this.films.find(item => item.imdbID === this.imdbID) === undefined);
  }

  /** Получить список фильмов из локального хранилища */
  getMyFilms() {
    const localFilms = localStorage.films;
    if (localFilms && localFilms !== '[]') {
      this.films = JSON.parse(localFilms);
    }
  }

  /** Удалить фильм из списка */
  removeFromList() {
    const newFilmsList = this.films.filter(item => item.imdbID !== this.imdbID);
    this.films = newFilmsList;
    localStorage.films = JSON.stringify(newFilmsList);
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    this.imdbID && this.searchFilms(this.imdbID);
    this.getMyFilms();
  }

  ngOnDestroy(): void {
    if (this.fSub) this.fSub.unsubscribe();
  }
}
