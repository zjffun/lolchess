import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  @Input('item') item;
  @Input('size') inputSize: string;

  public rowItem0 = null;
  public rowItem1 = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.item.raws[1]) {
      this.rowItem0 = this.itemService.getById(this.item.raws[0]);
      this.rowItem1 = this.itemService.getById(this.item.raws[1]);
    } else {
      this.rowItem0 = null;
      this.rowItem1 = null;
    }
  }
}
