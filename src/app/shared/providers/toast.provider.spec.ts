import { TestBed } from '@angular/core/testing';

import { ToastProvider } from './toast.provider';

describe('ToastProvider', () => {
  let service: ToastProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
