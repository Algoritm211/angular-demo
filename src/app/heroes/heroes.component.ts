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

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(val => this.heroes = val)
  }

  addHero(rawName: string) {
    const name = rawName.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name})
      .subscribe((hero) => {
        this.heroes.push(hero)
      })
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id)
      .subscribe(() => this.heroes = this.heroes.filter((hero) => hero.id !== id))
  }

}
