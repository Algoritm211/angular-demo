import { Component, OnInit } from '@angular/core';
import {Hero} from "../types/hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(val => this.heroes = val)
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
