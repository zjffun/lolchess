import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, merge, of, Subscription } from 'rxjs';
import { map, shareReplay, filter, mergeMap } from 'rxjs/operators';
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

  title;
  private routerSubscription: Subscription;

  isHandset;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
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
    console.log('init');
    this.isHandset$.subscribe((val) => {
      this.isHandset = val;
    });

    this.setTitle();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setTitle();
      });
  }

  setTitle() {
    let route = this.route.snapshot.firstChild;
    while (route.firstChild) route = route.firstChild;
    this.title = route?.data?.title;
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
