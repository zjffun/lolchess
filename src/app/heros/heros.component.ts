import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import heros from '../../assets/heros/details.en.json';

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
})
export class HerosComponent {
  heros = heros.map((d) => {
    return {
      ...d,
      avatarSrc: `/assets/heros/imgs/${d.keyword}.png`,
    };
  });

  constructor(private breakpointObserver: BreakpointObserver) {}
}
