import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  standalone: false
})
export class SelectComponent implements ControlValueAccessor, OnInit {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() options: Array<{ id: string; value: string }> = [];
  @Input() multiple: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  value: any;
  selectedOptions: Array<{ id: string; value: string }> = [];

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() { }

  ngOnInit() {
    if (this.multiple) {
      this.selectedOptions = [];
    }
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.selectedOptions = value || [];
    } else {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSingleChange(event: any) {
    this.value = event.detail.value;
    this.onChange(this.value);
    this.onTouch();
  }

  onMultipleChange(event: any) {
    this.selectedOptions = event.detail.value;
    this.onChange(this.selectedOptions);
    this.onTouch();
  }
}