import { Component, OnInit } from '@angular/core';
import {Hero} from "../types/hero";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 221,
    name: 'Alex',
  }

  constructor() { }

  ngOnInit(): void {
  }

}
