import { TestBed } from '@angular/core/testing';

import { AuthomeService } from './authome.service';

describe('AuthomeService', () => {
  let service: AuthomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
