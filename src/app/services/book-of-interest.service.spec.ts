import { TestBed } from '@angular/core/testing';

import { BookOfInterestService } from './book-of-interest.service';

describe('BookOfInterestService', () => {
  let service: BookOfInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookOfInterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
