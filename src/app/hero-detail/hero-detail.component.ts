import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import heroes from '../../assets/heroes.zh-CN.json';
import items from '../../assets/items.zh-CN.json';
import { NavigationService } from '../navigation.service';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero: typeof heroes[0];
  lolqqitems: Array<typeof items[0]> = [];
  lolchessitems: Array<typeof items[0]> = [];

  currentItem = this.itemService.emptyItem;
  currentItemDom = null;

  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private itemService: ItemService
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
          const hero = heroes.find((hero) => hero.keyword === keyword);
          return hero;
        })
      )
      .subscribe((hero) => {
        this.hero = hero;

        setTimeout(() => {
          this.navigation.title = hero.displayName;
        }, 0);

        let lolqqitems: Array<typeof items[0]> = [];
        let lolchessitems: Array<typeof items[0]> = [];

        items.forEach((item) => {
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
