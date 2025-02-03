import { Routes } from '@angular/router';
import { DynamicFormComponent } from './ch01-dynamic-form-generate/components/dynamic-form/dynamic-form.component';
import { ParentComponent } from './ch02-content-projection/parent/parent.component';
import { ParentDropdownComponent } from './ch03-dropdown/parent-dropdown/parent-dropdown.component';
import { DebounceSearchInputComponent } from './ch04-debounce-search-input/debounce-search-input/debounce-search-input.component';

export const routes: Routes = [
  {
    path: 'ch01',
    component: DynamicFormComponent,
  },
  {
    path: 'ch02',
    component: ParentComponent,
  },
  {
    path: 'ch03',
    component: ParentDropdownComponent,
  },
  {
    path: 'ch04',
    component: DebounceSearchInputComponent,
  },
  // {

  // }
];
