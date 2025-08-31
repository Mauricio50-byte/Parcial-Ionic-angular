import { TestBed } from '@angular/core/testing';

import { EncryptProvider } from './encrypt.provider';

describe('EncryptProvider', () => {
  let service: EncryptProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
