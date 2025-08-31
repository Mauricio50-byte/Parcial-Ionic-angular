import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { interceptorsGuard } from './interceptors-guard';

describe('interceptorsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => interceptorsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
