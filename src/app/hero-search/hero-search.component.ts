import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Hero} from "../types/hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>
  private searchNameValue = new Subject<string>()

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchNameValue.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => this.heroService.searchHeroes(value)),
    )
  }

  search(value: string) {
    this.searchNameValue.next(value);
  }

}
