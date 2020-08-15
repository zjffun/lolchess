import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { NavigationService } from '../navigation.service';
import { ItemService, itemType } from '../item.service';
import { heroType, HeroesService } from '../heroes.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero: heroType;
  lolqqitems: Array<itemType> = [];
  lolchessitems: Array<itemType> = [];

  currentItem = this.itemService.emptyItem;
  currentItemDom = null;

  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private itemService: ItemService,
    private heroesService: HeroesService
  ) {}

  handleItemClick(item, event) {
    event.stopPropagation();
    this.currentItem = item;
    this.currentItemDom = event.target;
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => {
          const keyword = params.get('keyword');
          const hero = this.heroesService.heroKeywordMap.get(keyword);
          return hero;
        })
      )
      .subscribe((hero) => {
        this.hero = hero;

        setTimeout(() => {
          this.navigation.title = hero.displayName;
        }, 0);

        let lolqqitems: Array<itemType> = [];
        let lolchessitems: Array<itemType> = [];

        this.itemService.items.forEach((item) => {
          if (item.lolqqheroes.includes(hero.keyword)) {
            lolqqitems.push(item);
          }
          if (item.lolchessheroes.includes(hero.keyword)) {
            lolchessitems.push(item);
          }
        });
        this.lolqqitems = lolqqitems;
        this.lolchessitems = lolchessitems;

        // reset
        this.currentItem = this.itemService.emptyItem;
        this.currentItemDom = null;
      });
  }
}
