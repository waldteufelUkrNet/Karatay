import { TestBed } from '@angular/core/testing';

import { SpecialitiesService } from './specialities.service';

describe('SpecialitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialitiesService = TestBed.get(SpecialitiesService);
    expect(service).toBeTruthy();
  });
});
