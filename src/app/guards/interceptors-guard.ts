import { CanActivateFn } from '@angular/router';

export const interceptorsGuard: CanActivateFn = (route, state) => {
  return true;
};
