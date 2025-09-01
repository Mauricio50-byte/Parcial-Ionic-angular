import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {

  @Input() user!: User;

  constructor() { }
}