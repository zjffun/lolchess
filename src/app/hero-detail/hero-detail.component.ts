import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import heroes from '../../assets/heroes.zh-CN.json';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero: typeof heroes[0];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          const keyword = params.get('keyword');
          return heroes.find((hero) => hero.keyword === keyword);
        })
      )
      .subscribe((hero) => {
        this.hero = hero;
      });
  }
}
