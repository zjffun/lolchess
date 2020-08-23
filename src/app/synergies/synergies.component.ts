import { Component, OnInit } from '@angular/core';
import { SynergiesService } from '../synergies.service';

@Component({
  selector: 'app-synergies',
  templateUrl: './synergies.component.html',
  styleUrls: ['./synergies.component.scss'],
})
export class SynergiesComponent implements OnInit {
  constructor(public synergiesService: SynergiesService) {}

  ngOnInit(): void {}
}
