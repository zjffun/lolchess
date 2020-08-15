import { Injectable } from '@angular/core';
import items from '../assets/items.zh-CN.json';

type itemType = typeof items[0];

const idItemMap = new Map<number, itemType>();

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

  getAll() {
    return items;
  }

  getById(id: number): itemType {
    if (id === 0) {
      return item({
        id: 0,
      });
    }
    return idItemMap.get(id);
  }
}
