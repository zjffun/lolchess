import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-figure',
  templateUrl: './item-figure.component.html',
  styleUrls: ['./item-figure.component.scss'],
})
export class ItemFigureComponent implements OnInit {
  @Input('item') item;

  constructor() {}

  ngOnInit(): void {}
}
