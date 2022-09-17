import { Component, OnInit } from '@angular/core';
import {Hero} from "../types/hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    ) {}

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(val => this.heroes = val)
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelectHero(hero: Hero) {
    this.selectedHero = hero;
    this.messageService.add(`[HeroesComponent] You have added hero with id ${hero.id}`)
  }

}
