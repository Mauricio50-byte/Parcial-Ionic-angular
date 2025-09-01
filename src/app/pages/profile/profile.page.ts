import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../interfaces/user.interface';
import { ToastProvider } from '../../shared/providers/toast.provider';
import { LoaderProvider } from '../../shared/providers/loader.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  user?: User;
  isLoading = true;

  constructor(
    private userService: UserService,
    private toast: ToastProvider,
    private loader: LoaderProvider,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.loadUser();
  }

  async loadUser() {
    try {
      this.user = await this.userService.getCurrentUser();
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onUpdateUser(user: User) {
    const loading = await this.loader.present('Actualizando perfil...');
    
    try {
      const success = await this.userService.updateUser(user);
      
      if (success) {
        this.toast.present('Perfil actualizado correctamente');
        this.user = user;
      } else {
        this.toast.present('Error al actualizar perfil', 3000, 'danger');
      }
    } catch (error) {
      this.toast.present('Error al actualizar perfil', 3000, 'danger');
    } finally {
      this.loader.dismiss();
    }
  }

  async logout() {
    await this.userService.logout();
    this.router.navigate(['/login']);
  }
}