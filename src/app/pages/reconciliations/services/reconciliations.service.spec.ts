import { TestBed } from '@angular/core/testing';

import { ReconciliationsService } from './reconciliations.service';

describe('ReconciliationsService', () => {
  let service: ReconciliationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReconciliationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
