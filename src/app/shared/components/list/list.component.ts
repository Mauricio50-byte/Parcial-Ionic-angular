import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() routerLink: string | any[] = '';
  @Input() routerLinkActive: string = '';
  @Input() detail: boolean = false;

  constructor() { }
}