import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";
import { Subscription } from "rxjs";
import { IFilm, IFilmShort } from "../../models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  search: string = '';
  loading: boolean;
  fSub: Subscription;
  totalResults: number = 0;
  films$: IFilmShort[] = [];

  constructor(
    private searchService: SearchService,
    private route: Router,
  ) { }

  /**
   * Получение списка фильмов с подходящими названиями
   * @param title {string} название фильма.
   */
  searchFilms(title) {
    if (title) {
      this.loading = true;
      this.fSub = this.searchService.searchFilmByTitle(title)
        .subscribe(data => {
          this.films$ = data.Search;
          this.totalResults = +data.totalResults;
          this.loading = false;
        });
    }
  }

  /**
   * Поереход на страницу детальной информации о фильме.
   * @param id {string} уникальный номер фильма.
   */
  getFilmDetails(id) {
    this.route.navigate([`/details/${id}`]);
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    if (this.fSub) this.fSub.unsubscribe();
  }

}
