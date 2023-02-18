import { TestBed } from '@angular/core/testing';

import { SalesentryserviceService } from './salesentryservice.service';

describe('SalesentryserviceService', () => {
  let service: SalesentryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesentryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
