import { Component, OnInit, Input } from '@angular/core';
import heroes from '../../assets/heroes.zh-CN.json';

@Component({
  selector: 'app-hero-figure',
  templateUrl: './hero-figure.component.html',
  styleUrls: ['./hero-figure.component.scss'],
})
export class HeroFigureComponent implements OnInit {
  @Input('hero') hero;
  @Input('hero-keyword') heroKeyword: string;

  heroInfo;

  constructor() {}

  ngOnInit(): void {
    console.log(this.hero, this.heroKeyword);
    if (this.hero) {
      this.heroInfo = this.hero;
    } else {
      this.heroInfo = heroes.find((d) => d.keyword === this.heroKeyword);
    }
  }
}
