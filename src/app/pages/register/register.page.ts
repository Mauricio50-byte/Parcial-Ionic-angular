import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ToastProvider } from '../../shared/providers/toast.provider';
import { LoaderProvider } from '../../shared/providers/loader.provider';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastProvider,
    private loader: LoaderProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      country: [null, Validators.required]
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { confirmPassword, ...userData } = this.registerForm.value;
    
    // Verificar que las contraseñas coincidan
    if (userData.password !== confirmPassword) {
      this.toast.present('Las contraseñas no coinciden', 3000, 'danger');
      return;
    }

    const loading = await this.loader.present('Registrando usuario...');
    
    try {
      // Generar un ID único (en una app real, esto vendría del backend)
      const id = this.generateUUID();
      
      const user: User = {
        id,
        ...userData
      };
      
      const success = await this.userService.register(user);
      
      if (success) {
        this.toast.present('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      } else {
        this.toast.present('Error al registrar usuario', 3000, 'danger');
      }
    } catch (error) {
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