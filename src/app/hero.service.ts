import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Hero} from "./types/hero";
import {HEROES} from "./mocks/mock-heroes";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const newHeroes = of(HEROES);
    this.messageService.add('[HeroService]: heroes were fetched')
    return newHeroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((hero) => hero.id === id)!;
    this.messageService.add(`[HeroService]: hero with id=${id} was fetched`)
    return of(hero)
  }
}
