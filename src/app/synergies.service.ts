import { Injectable } from '@angular/core';
import synergies from '../assets/synergies.zh-CN.json';

export type syenrgyType = typeof synergies[0];

@Injectable({
  providedIn: 'root',
})
export class SynergiesService {
  constructor() {
    this.synergies.forEach((synergy) => {
      this.synergyKeywordMap.set(synergy.keyword, synergy);
    });
  }

  synergies = synergies;

  synergyKeywordMap = new Map<string, syenrgyType>();

  classes = synergies.filter((d) => d.type === 'classType');

  origins = synergies.filter((d) => d.type === 'origin');

  getSynergiesByKewords(keywords) {
    return keywords.map((synergyKw) => this.synergyKeywordMap.get(synergyKw));
  }
}
