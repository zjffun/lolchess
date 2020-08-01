import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

const firstLine = [0, ...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent {
  itemsList = [
    firstLine.map((itemId) => {
      return {
        id: itemId,
        src: `/assets/items/${itemId}.png`,
      };
    }),
    ...Array.from({ length: 9 }, (_, i) => {
      let t = 1 << (i * 2);
      return [
        ...Array.from({ length: 10 }, (_, i2) => {
          let itemId = firstLine[i2] + t;
          return {
            id: itemId,
            src: `/assets/items/${itemId}.png`,
          };
        }),
      ];
    }),
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}
}
