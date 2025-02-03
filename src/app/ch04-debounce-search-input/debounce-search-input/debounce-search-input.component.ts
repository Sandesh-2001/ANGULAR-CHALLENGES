import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';

@Component({
  selector: 'app-debounce-search-input',
  standalone: true,
  imports: [SearchInputComponent],
  templateUrl: './debounce-search-input.component.html',
  styleUrl: './debounce-search-input.component.css',
})
export class DebounceSearchInputComponent {
  onSelectionChange(event: any) {
    console.log('inside parent', event);
  }
}
