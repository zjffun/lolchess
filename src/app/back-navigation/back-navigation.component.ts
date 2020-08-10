import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.css'],
})
export class BackNavigationComponent implements OnInit {
  title;

  goBack() {
    this.location.back();
  }

  constructor(private location: Location) {}

  ngOnInit(): void {}
}
