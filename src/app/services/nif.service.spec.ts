import { TestBed } from '@angular/core/testing';

import { NifService } from './nif.service';

describe('NifService', () => {
  let service: NifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
