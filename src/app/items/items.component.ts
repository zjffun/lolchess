import { Component, ViewChild, ElementRef } from '@angular/core';
import { ItemService } from '../item.service';

const firstLine = [0, ...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @ViewChild('tooltip') tooltip: ElementRef;

  currentItem = this.itemService.emptyItem;
  currentItemDom = null;

  itemsList = [
    firstLine.map((itemId) => {
      return this.itemService.getById(itemId);
    }),
    ...Array.from({ length: 9 }, (_, i) => {
      let t = 1 << (i * 2);
      return [
        ...Array.from({ length: 10 }, (_, i2) => {
          let itemId = firstLine[i2] + t;
          return this.itemService.getById(itemId);
        }),
      ];
    }),
  ];

  handleItemClick(item, event) {
    event.stopPropagation();
    this.currentItem = item;
    this.currentItemDom = event.target;
  }

  constructor(private itemService: ItemService) {}
}
