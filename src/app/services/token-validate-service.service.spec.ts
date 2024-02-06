import { TestBed } from '@angular/core/testing';

import { TokenValidateServiceService } from './token-validate-service.service';

describe('TokenValidateServiceService', () => {
  let service: TokenValidateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenValidateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
