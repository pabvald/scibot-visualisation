import { TestBed } from '@angular/core/testing';

import { LabelLevelState } from './label-level.state';

describe('LabelLevelState', () => {
  let service: LabelLevelState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelLevelState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
