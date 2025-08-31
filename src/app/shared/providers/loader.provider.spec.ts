import { TestBed } from '@angular/core/testing';

import { LoaderProvider } from './loader.provider';

describe('LoaderProvider', () => {
  let service: LoaderProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
