import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { createPopper } from '@popperjs/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail-popper',
  templateUrl: './item-detail-popper.component.html',
  styleUrls: ['./item-detail-popper.component.css'],
})
export class ItemDetailPopperComponent implements OnInit {
  @ViewChild('tooltip') tooltip: ElementRef;

  public show(item, event) {
    event.stopPropagation();
    this.item = item;
    this.isShow = true;
    this.popper = createPopper(event.target, this.tooltip.nativeElement, {});
  }

  public hide() {
    this.isShow = false;
    this.destroyPopper();
  }

  item = this.itemsServer.emptyItem;
  popper = null;
  isShow = false;

  handleDocClick = function () {
    this.isShow = false;
    this.destroyPopper();
  }.bind(this);

  destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  constructor(private itemsServer: ItemService) {}

  ngOnInit() {
    document.addEventListener('click', this.handleDocClick);
  }

  // ngOnChanges() {
  //   if (this.itemDom) {
  //   } else {
  //     this.isShow = false;
  //     this.destroyPopper();
  //   }
  // }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleDocClick);
  }
}
