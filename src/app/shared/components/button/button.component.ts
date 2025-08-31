import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: string = 'primary';
  @Input() expand: 'block' | 'full' | null = null;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }
}