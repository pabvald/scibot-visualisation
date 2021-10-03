import { TestBed } from '@angular/core/testing';

import { ParagraphLevelFacade } from './paragraph-level.facade';

describe('ParagraphLevelFacade', () => {
  let service: ParagraphLevelFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphLevelFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
