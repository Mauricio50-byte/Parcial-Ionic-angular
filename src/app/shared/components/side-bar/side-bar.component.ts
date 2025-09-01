import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  @Input() user!: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  async logout() {
    await this.userService.logout();
    this.router.navigate(['/login']);
  }
}