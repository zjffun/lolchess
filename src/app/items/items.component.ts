import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { createPopper, popper } from '@popperjs/core';
import items from '../../assets/items.zh-CN.json';

const firstLine = [0, ...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

const item = {
  id: -1,
  name: '',
  raws: [],
  desc: '',
  attrs: [],
};

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent {
  @ViewChild('tooltip') tooltip: ElementRef;

  currentItem = item;

  popper = null;

  handleDocClick = function (event) {
    event.stopPropagation();
    this.currentItem = item;
    if (this.popper) {
      this.popper.destroy();
    }
  }.bind(this);

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
          return {
            id: itemId,
            src: `/assets/items/imgs/${itemId}.png`,
            info: items.find((info) => info.id === itemId),
          };
        }),
      ];
    }),
  ];

  handleItemClick(id, event) {
    event.stopPropagation();
    this.currentItem = items.find((info) => info.id === id) || item;
    this.popper = createPopper(event.target, this.tooltip.nativeElement, {});
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    document.addEventListener('click', this.handleDocClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocClick);
  }
}
