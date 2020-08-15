import { TestBed } from '@angular/core/testing';

import { SynergiesService } from './synergies.service';

describe('SynergiesService', () => {
  let service: SynergiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynergiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
