import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-item-detail-popper',
  templateUrl: './item-detail-popper.component.html',
  styleUrls: ['./item-detail-popper.component.css'],
})
export class ItemDetailPopperComponent implements OnInit {
  @ViewChild('tooltip') tooltip: ElementRef;

  @Input('item') item;
  @Input('itemDom') itemDom;

  popper = null;
  show = false;

  handleDocClick = function (event) {
    this.show = false;
    this.destroyPopper();
  }.bind(this);

  destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  constructor() {}

  ngOnInit() {
    document.addEventListener('click', this.handleDocClick);
  }

  ngOnChanges() {
    if (this.itemDom) {
      this.show = true;
      this.popper = createPopper(this.itemDom, this.tooltip.nativeElement, {});
    } else {
      this.show = false;
      this.destroyPopper();
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocClick);
  }
}
