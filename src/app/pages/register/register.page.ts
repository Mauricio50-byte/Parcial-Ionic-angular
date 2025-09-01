import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ToastProvider } from '../../shared/providers/toast.provider';
import { LoaderProvider } from '../../shared/providers/loader.provider';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  constructor(
    private userService: UserService,
    private toast: ToastProvider,
    private loader: LoaderProvider,
    private router: Router
  ) { }

  ngOnInit() {
    // Inicialización si es necesaria
  }

  async onSubmit(userData: User) {
    const loading = await this.loader.present('Registrando usuario...');
    
    try {
      // Generar un ID único (en una app real, esto vendría del backend)
      const id = this.generateUUID();
      
      const user: User = {
        ...userData,
        id
      };
      
      const success = await this.userService.register(user);
      
      if (success) {
        this.toast.present('Usuario registrado correctamente');
        // Esta línea es la que te envía a la página de login.
        this.router.navigate(['/login']);
      } else {
        this.toast.present('Error al registrar usuario', 3000, 'danger');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      this.toast.present('Error al registrar usuario', 3000, 'danger');
    } finally {
      this.loader.dismiss();
    }
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}