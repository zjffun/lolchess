import { Injectable } from '@angular/core';
import { intersection } from 'lodash';
import heroes from '../assets/heroes.zh-CN.json';
import { SynergiesService } from './synergies.service';

export type heroType = typeof heroes[0];

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  readonly heroes = heroes;

  readonly heroKeywordMap = new Map<string, heroType>();

  readonly heroSynergiesMap = new Map<string, [string]>();

  private synergyHeroesMap = new Map();

  constructor(private synergiesService: SynergiesService) {
    this.synergiesService.synergies.forEach((synergy) => {
      this.synergyHeroesMap.set(synergy.keyword, synergy.heroes);
      synergy.heroes.forEach((hero) => {
        const synergies = this.heroSynergiesMap.get(hero);
        if (!synergies) {
          this.heroSynergiesMap.set(hero, [synergy.keyword]);
          return;
        }
        synergies.push(synergy.keyword);
      });
    });
    this.heroes.forEach((hero) => {
      this.heroKeywordMap.set(hero.keyword, hero);
    });
  }

  getHeroesByFilters(filters, sortField = 'keyword') {
    let heroes = this.heroes;

    // filter
    heroes = heroes.filter((hero) => {
      if (filters.costs?.length && !filters.costs.includes(hero.price)) {
        return false;
      }
      if (filters.classes?.length) {
        if (
          !intersection(
            this.heroSynergiesMap.get(hero.keyword),
            filters.classes
          ).length
        ) {
          return false;
        }
      }
      if (filters.origins?.length) {
        if (
          !intersection(
            this.heroSynergiesMap.get(hero.keyword),
            filters.origins
          ).length
        ) {
          return false;
        }
      }
      return true;
    });

    // sort
    heroes.sort((a, b) => {
      return a[sortField] > b[sortField] ? 1 : -1;
    });

    return heroes;
  }

  getHeroesBySynergiesKeyword(...synergiesKeyword) {
    let heroesKw = this.synergyHeroesMap.get(synergiesKeyword.pop());

    for (const skw of synergiesKeyword) {
      heroesKw = intersection(heroesKw, this.synergyHeroesMap.get(skw));
    }

    return heroesKw.map((heroKw) => this.heroKeywordMap.get(heroKw));
  }
}
