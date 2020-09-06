import { Injectable } from '@angular/core';
import items from '../assets/items.zh-CN.json';

export type itemType = typeof items[0];

const idItemMap = new Map<number, itemType>();

const firstLine = [0, ...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

items.forEach((item) => {
  idItemMap.set(item.id, item);
});

function item(data = {}) {
  return {
    id: -1,
    name: '',
    keywords: '',
    proStatus: '',
    raws: [],
    desc: '',
    attrs: [],
    lolqqheroes: [],
    lolchessheroes: [],
    ...data,
  };
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor() {}

  emptyItem: itemType = item();

  items = items;

  getById(id: number): itemType {
    if (id === 0) {
      return item({
        id: 0,
      });
    }
    return idItemMap.get(id);
  }

  itemTable = [
    firstLine.map((itemId) => {
      return this.getById(itemId);
    }),
    ...Array.from({ length: 9 }, (_, i) => {
      let t = 1 << (i * 2);
      return [
        ...Array.from({ length: 10 }, (_, i2) => {
          let itemId = firstLine[i2] + t;
          return this.getById(itemId);
        }),
      ];
    }),
  ];
}
