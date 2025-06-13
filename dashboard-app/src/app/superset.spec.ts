import { TestBed } from '@angular/core/testing';

import { Superset } from './superset';

describe('Superset', () => {
  let service: Superset;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Superset);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
