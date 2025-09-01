import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  try {
    const user = await userService.getCurrentUser();
    
    if (user) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error('Error en authGuard:', error);
    router.navigate(['/login']);
    return false;
  }
};