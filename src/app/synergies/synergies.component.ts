import { Component, OnInit } from '@angular/core';
import { SynergiesService } from '../synergies.service';

@Component({
  selector: 'app-synergies',
  templateUrl: './synergies.component.html',
  styleUrls: ['./synergies.component.scss'],
})
export class SynergiesComponent implements OnInit {
  synergies = this.synergiesService.synergies.map((synergy) => {
    return {
      ...synergy,
      stats: Object.entries(synergy.stats).map(
        (stat) => `【${stat[0]}】${stat[1]}`
      ),
    };
  });

  panelOpenState = false;

  constructor(private synergiesService: SynergiesService) {}

  ngOnInit(): void {}
}
