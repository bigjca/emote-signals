import { TestBed } from '@angular/core/testing';

import { TmiService } from './tmi.service';

describe('TmiService', () => {
  let service: TmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
