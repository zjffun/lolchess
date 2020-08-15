import { Component, OnInit } from '@angular/core';
import { SynergiesService } from '../synergies.service';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'app-synergies-table',
  templateUrl: './synergies-table.component.html',
  styleUrls: ['./synergies-table.component.scss'],
})
export class SynergiesTableComponent implements OnInit {
  constructor(public synergiesService: SynergiesService, public heroesService: HeroesService) {}

  ngOnInit(): void {}
}
