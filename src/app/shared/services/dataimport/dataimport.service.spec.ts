import { TestBed } from '@angular/core/testing';

import { DataimportService } from './dataimport.service';

describe('DataimportService', () => {
  let service: DataimportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataimportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
