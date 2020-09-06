import { Component, OnInit } from '@angular/core';
import { SynergiesService } from '../synergies.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss'],
})
export class TeamBuilderComponent implements OnInit {
  constructor(
    public synergiesService: SynergiesService,
    public itemService: ItemService
  ) {}

  ngOnInit(): void {}
}
