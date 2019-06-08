import { TestBed } from '@angular/core/testing';

import { InvoiceDetailService } from './invoice-detail.service';

describe('InvoiceDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceDetailService = TestBed.get(InvoiceDetailService);
    expect(service).toBeTruthy();
  });
});
