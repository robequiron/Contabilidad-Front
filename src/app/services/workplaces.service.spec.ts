import { TestBed } from '@angular/core/testing';

import { WorkplacesService } from './workplaces.service';

describe('WorkplacesService', () => {
  let service: WorkplacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkplacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
