import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import heroes from '../../assets/heroes.zh-CN.json';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent {
  heroes = heroes.map((d) => {
    return {
      ...d,
      avatarSrc: `/assets/heroes/imgs/${d.keyword}.png`,
    };
  });

  placeholders = Array.from({ length: 60 - (this.heroes.length % 60) });

  constructor(private breakpointObserver: BreakpointObserver) {}
}
