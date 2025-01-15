import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ch01DynamicFormBuilderComponent } from './ch01-dynamic-form-generate/components/ch01-dynamic-form-builder/ch01-dynamic-form-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ch01DynamicFormBuilderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ANGULAR-CHALLENGES';
}
