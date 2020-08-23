import { Component, OnInit, Input } from '@angular/core';
import { syenrgyType } from '../synergies.service';

@Component({
  selector: 'app-synergy-accordion',
  templateUrl: './synergy-accordion.component.html',
  styleUrls: ['./synergy-accordion.component.scss'],
})
export class SynergyAccordionComponent implements OnInit {
  @Input('synergy') rawSynergy: syenrgyType;

  synergy;

  constructor() {}

  ngOnInit(): void {
    this.synergy = {
      ...this.rawSynergy,
      stats: Object.entries(this.rawSynergy.stats).map(
        (stat) => `【${stat[0]}】${stat[1]}`
      ),
    };
  }
}
