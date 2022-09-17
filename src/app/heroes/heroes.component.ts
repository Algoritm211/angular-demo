import { Component, OnInit } from '@angular/core';
import {Hero} from "../types/hero";
import {HEROES} from "../mocks/mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = HEROES
  selectedHero?: Hero

  constructor() { }

  ngOnInit(): void {
  }

  onSelectHero(hero: Hero) {
    this.selectedHero = hero;
  }

}
