import { TestBed } from '@angular/core/testing';

import { PostalService } from './postal.service';

describe('PostalService', () => {
  let service: PostalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
