import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false
})
export class ButtonComponent {

  @Input() type: 'button' | 'submit' = 'button';
  @Input() color: string = 'primary';
  @Input() expand: 'block' | 'full' | null = null;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: Event): boolean {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    return true; // Agregar esta línea
  }
}