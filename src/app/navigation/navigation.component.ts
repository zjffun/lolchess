import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, merge, of, Subscription } from 'rxjs';
import { map, shareReplay, filter, mergeMap, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from '../navigation.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  @ViewChild('drawer') drawer: MatSidenav;

  title$: Observable<string>;

  isHandset;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      tap((d) => (this.isHandset = d)),
      shareReplay()
    );

  handleLinkClick() {
    if (this.isHandset) {
      this.drawer.close();
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    public navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.title$ = merge(
      // set title for first load page
      of(this.getTitle()),
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getTitle())
      )
    );
  }

  getTitle() {
    let route = this.route.snapshot.firstChild;
    while (route.firstChild) route = route.firstChild;
    return route?.data?.title;
  }

  ngOnDestroy() {}
}
