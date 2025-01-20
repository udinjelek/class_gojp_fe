import { TestBed } from '@angular/core/testing';

import { TitleScrollingService } from './title-scrolling.service';

describe('TitleScrollingService', () => {
  let service: TitleScrollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleScrollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
