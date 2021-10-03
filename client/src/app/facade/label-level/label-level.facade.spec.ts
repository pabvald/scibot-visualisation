import { TestBed } from '@angular/core/testing';

import { LabelLevelFacade } from './label-level.facade';

describe('LabelLevelFacade', () => {
  let service: LabelLevelFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelLevelFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
