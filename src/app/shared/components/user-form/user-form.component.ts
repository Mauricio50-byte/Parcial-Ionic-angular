import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Country } from '../../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: false
})
export class UserFormComponent implements OnInit {

  @Input() user!: User;
  @Output() submitForm = new EventEmitter<User>();

  userForm!: FormGroup;
  countries: Country[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.initForm();
    await this.loadCountries();
    
    if (this.user) {
      this.patchForm();
    }
  }

  private initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      country: [null, Validators.required]
    });
  }

  private async loadCountries() {
    try {
      this.countries = await this.userService.getCountries();
    } catch (error) {
      console.error('Error al cargar países:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private patchForm() {
    this.userForm.patchValue({
      name: this.user.name,
      lastName: this.user.lastName,
      email: this.user.email,
      country: this.user.contry.id
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const formValue = this.userForm.value;
    const country = this.countries.find(c => c.id === formValue.country);
    
    const user: User = {
      id: this.user ? this.user.id : '',
      name: formValue.name,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      contry:  country!
    };

    this.submitForm.emit(user);
  }
}