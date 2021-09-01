import { TestBed } from '@angular/core/testing';

import { DataState } from './data.state';

describe('DataState', () => {
  let service: DataState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
