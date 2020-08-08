import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import heroes from '../../assets/heroes.zh-CN.json';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero: typeof heroes[0];

  goBack() {
    this.location.back();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private location: Location
  ) {}

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
    this.router.navigate([]);
  }
}
