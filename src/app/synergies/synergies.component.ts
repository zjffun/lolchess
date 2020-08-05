import { Component, OnInit } from '@angular/core';

import synergies from '../../assets/synergies/infos.en.json';

@Component({
  selector: 'app-synergies',
  templateUrl: './synergies.component.html',
  styleUrls: ['./synergies.component.css'],
})
export class SynergiesComponent implements OnInit {
  synergies = synergies;

  panelOpenState = false;

  constructor() {}

  ngOnInit(): void {}
}
