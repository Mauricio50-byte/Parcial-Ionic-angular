import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { ToastProvider } from '../../shared/providers/toast.provider';
import { LoaderProvider } from '../../shared/providers/loader.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toast: ToastProvider,
    private loader: LoaderProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loading = await this.loader.present('Iniciando sesión...');
    const { email, password } = this.loginForm.value;
    
    try {
      const success = await this.userService.login(email, password);
      
      if (success) {
        this.toast.present('Sesión iniciada correctamente');
        this.router.navigate(['/home']);
      } else {
        this.toast.present('Credenciales inválidas', 3000, 'danger');
      }
    } catch (error) {
      this.toast.present('Error al iniciar sesión', 3000, 'danger');
    } finally {
      this.loader.dismiss();
    }
  }
}