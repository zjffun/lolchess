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
    if (this.popper) {
      this.show = false;
      this.popper.destroy();
    }
  }.bind(this);

  constructor() {}

  ngOnInit() {
    document.addEventListener('click', this.handleDocClick);
  }

  ngOnChanges() {
    if (this.itemDom) {
      this.show = true;
      this.popper = createPopper(this.itemDom, this.tooltip.nativeElement, {});
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocClick);
  }
}
