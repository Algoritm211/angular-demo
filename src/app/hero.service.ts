import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Hero} from "./types/hero";
import {HEROES} from "./mocks/mock-heroes";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private HEROES_URL = 'api/heroes'
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.HEROES_URL).pipe(
        tap(() => this.log('heroes were fetched')),
        catchError(this.handleError('getHeroes', []))
      )
  }

  getById(id: number): Observable<Hero> {
    const url = `${this.HEROES_URL}/${id}`;
    return this.http.get<Hero>(url).pipe(
        tap(() => this.log(`hero with id=${id} was fetched`)),
        catchError(this.handleError<Hero>(`getById. Id=${id}`)),
      )
  }

  updateHero(hero: Hero): Observable<any> {
    const { id, name } = hero;
    return this.http.put(this.HEROES_URL, hero, this.httpOptions).pipe(
      tap(() => this.log(`hero with id=${id} and name=${name} was updated`)),
      catchError(this.handleError(`updateHero. Id=${id}`))
    )
  }

  addHero(hero: Partial<Hero>) {
    return this.http.post<Hero>(this.HEROES_URL, hero, this.httpOptions).pipe(
      tap(({name, id}) => this.log(`hero with id=${id} and name=${name} was added`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: number) {
    const deleteUrl = `${this.HEROES_URL}/${id}`
    return this.http.delete(deleteUrl, this.httpOptions).pipe(
      tap(() => this.log(`hero with id ${id} was deleted`)),
      catchError(this.handleError('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.HEROES_URL}/?name=${term}`).pipe(
      tap(() => term.length
        ? this.log(`found heroes matching terms with name=${term}`)
        : this.log(`no heroes with name ${term}`)
      ),
      catchError(this.handleError('searchHeroes', []))
    )
  }

  private log(message: string) {
    this.messageService.add(`[HeroService]: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
