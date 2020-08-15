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
  @Input('size') inputSize: string;

  heroClass = {};
  heroImgClass = {};

  heroInfo: typeof heroes[0];

  constructor() {}

  ngOnInit(): void {
    if (this.hero) {
      this.heroInfo = this.hero;
    } else {
      this.heroInfo = heroes.find((d) => d.keyword === this.heroKeyword);
    }

    if (this.inputSize === 'sm') {
      this.heroClass['hero--sm'] = true;
    }

    this.heroClass[`hero--cost-${this.heroInfo.price}`] = true;
  }
}
