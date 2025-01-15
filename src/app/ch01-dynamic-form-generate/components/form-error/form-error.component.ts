import { JsonPipe } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent {
  @Input('errorGroup') errorGroup: any;
  errorsArr: any[] = [];
  ngOnInit() {
    console.log('error group for form control', this.errorGroup);
    // this.prepareErrors();
  }
  ngOnChanges(change: SimpleChanges) {
    this.errorsArr = [];
    this.prepareErrors();
  }
  // ngDoCheck() {
  //   this.prepareErrors();
  // }
  prepareErrors() {
    for (let key in this.errorGroup) {
      console.log('key is ', key);
      switch (key) {
        case 'required':
          this.errorsArr.push({ message: 'This field is required.' });
          break;
        case 'min':
          console.log('min value', `${this.errorGroup.min.actual}`);
          this.errorsArr.push({
            message: `The min value is ${this.errorGroup.min.min} and actual value is ${this.errorGroup.min.actual}`,
          });
          break;
        default:
          this.errorsArr.push({ message: 'INVALID FIELD' });
          return;
          break;
      }
    }
  }
}
