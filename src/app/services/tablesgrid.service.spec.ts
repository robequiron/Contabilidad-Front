import { TestBed } from '@angular/core/testing';

import { TablesgridService } from './tablesgrid.service';

describe('TablesgridService', () => {
  let service: TablesgridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablesgridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
