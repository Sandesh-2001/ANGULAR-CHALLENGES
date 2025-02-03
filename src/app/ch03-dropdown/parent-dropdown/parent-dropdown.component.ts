import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-parent-dropdown',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './parent-dropdown.component.html',
  styleUrl: './parent-dropdown.component.css',
})
export class ParentDropdownComponent {
  dropdownOptions: any[] = [
    { value: 1, display: 'Option 1', icon: 'assets/icon1.png' },
    { value: 2, display: 'Option 2', icon: 'assets/icon2.png' },
    { value: 3, display: 'Option 3', icon: 'assets/icon3.png' },
  ];

  onOptionSelected(option: any) {
    console.log('Selected Option:', option);
  }
}
