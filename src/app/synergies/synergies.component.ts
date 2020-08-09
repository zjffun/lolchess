import { Component, OnInit } from '@angular/core';

import synergies from '../../assets/synergies.zh-CN.json';

@Component({
  selector: 'app-synergies',
  templateUrl: './synergies.component.html',
  styleUrls: ['./synergies.component.scss'],
})
export class SynergiesComponent implements OnInit {
  synergies = synergies.map((synergy) => {
    return {
      ...synergy,
      stats: Object.entries(synergy.stats).map(
        (stat) => `【${stat[0]}】${stat[1]}`
      ),
    };
  });

  panelOpenState = false;

  constructor() {}

  ngOnInit(): void {}
}
