import { Injectable } from '@angular/core';
import synergies from '../assets/synergies.zh-CN.json';

@Injectable({
  providedIn: 'root',
})
export class SynergiesService {
  constructor() {}

  synergies = synergies;

  classes = synergies.filter((d) => d.type === 'classType');

  origins = synergies.filter((d) => d.type === 'origin');
}
