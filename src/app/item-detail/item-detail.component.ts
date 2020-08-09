import { Component, OnInit, Input } from '@angular/core';
import items from '../../assets/items.zh-CN.json';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
})
export class ItemDetailComponent implements OnInit {
  @Input('item') item;
  @Input('size') inputSize: string;

  constructor() {}

  ngOnInit(): void {}
}
