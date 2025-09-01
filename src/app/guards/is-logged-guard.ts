import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    const user = await this.userService.getCurrentUser();
    if (user) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}