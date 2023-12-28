import { TestBed } from '@angular/core/testing';

import { DisputesService } from './disputes.service';

describe('DisputesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisputesService = TestBed.get(DisputesService);
    expect(service).toBeTruthy();
  });
});
