import { TestBed } from '@angular/core/testing';

import { SubgruposService } from './subgrupos.service';

describe('SubgruposService', () => {
  let service: SubgruposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubgruposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
