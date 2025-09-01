import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

export const isLoggedGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  try {
    const user = await userService.getCurrentUser();
    
    if (user) {
      // Si el usuario ya está logueado, redirigir a home
      router.navigate(['/home']);
      return false;
    } else {
      // Si no está logueado, permitir acceso a login/register
      return true;
    }
  } catch (error) {
    console.error('Error en isLoggedGuard:', error);
    // En caso de error, permitir acceso para no bloquear la app
    return true;
  }
};