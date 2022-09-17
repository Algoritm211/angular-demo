import {Component, OnInit} from '@angular/core';
import {Hero} from "../types/hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    public location: Location,
  ) { }


  ngOnInit(): void {
    this.getHero()
  }

  getHero() {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(heroId)
      .subscribe((hero) => this.hero = hero)
  }

}
