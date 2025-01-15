import { Routes } from '@angular/router';
import { Child01Component } from './ch02-content-projection/components/child01/child01.component';
import { Ch01DynamicFormBuilderComponent } from './ch01-dynamic-form-generate/components/ch01-dynamic-form-builder/ch01-dynamic-form-builder.component';
import { Ch02ContentProjectionParentComponent } from './ch02-content-projection/ch02-content-projection-parent/ch02-content-projection-parent.component';

export const routes: Routes = [
  {
    path: 'ch01-dynamic-form',
    component: Ch01DynamicFormBuilderComponent,
  },
  {
    path: 'ch02-content-projection',
    component: Ch02ContentProjectionParentComponent
  },
  // {

  // }
];
