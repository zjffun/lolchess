import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.css'],
})
export class BackNavigationComponent implements OnInit {
  goBack() {
    this.location.back();
  }

  constructor(
    private location: Location,
    public navigation: NavigationService
  ) {}

  ngOnInit(): void {}
}
