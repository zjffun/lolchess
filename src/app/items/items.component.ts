import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import items from '../../assets/items.zh-CN.json';

const firstLine = [0, ...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @ViewChild('tooltip') tooltip: ElementRef;

  currentItem = items[0];
  currentItemDom = null;

  itemsList = [
    firstLine.map((itemId) => {
      return {
        id: itemId,
        src: `/assets/items/imgs/${itemId}.png`,
        info: items.find((info) => info.id === itemId),
      };
    }),
    ...Array.from({ length: 9 }, (_, i) => {
      let t = 1 << (i * 2);
      return [
        ...Array.from({ length: 10 }, (_, i2) => {
          let itemId = firstLine[i2] + t;
          return items.find((info) => info.id === itemId);
        }),
      ];
    }),
  ];

  handleItemClick(item, event) {
    event.stopPropagation();
    this.currentItem = item;
    this.currentItemDom = event.target;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}
}
