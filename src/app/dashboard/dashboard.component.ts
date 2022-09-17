import { Component, OnInit } from '@angular/core';
import {HeroService} from "../hero.service";
import {Hero} from "../types/hero";
import {map, take} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .pipe(map(heroArr => heroArr.slice(0, 5)))
      .subscribe(val => this.heroes = val);
  }

}
