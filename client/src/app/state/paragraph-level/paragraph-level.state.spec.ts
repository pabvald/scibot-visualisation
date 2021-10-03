import { TestBed } from '@angular/core/testing';

import { ParagraphLevelState } from './paragraph-level.state';

describe('ParagraphLevelState', () => {
  let service: ParagraphLevelState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphLevelState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
