import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GeneralModalComponent } from '../../../shared/components/general-modal/general-modal.component';

@Component({
  selector: 'app-generate-form',
  standalone: true,
  imports: [ReactiveFormsModule, GeneralModalComponent, FormsModule],
  templateUrl: './generate-form.component.html',
  styleUrl: './generate-form.component.css',
})
export class GenerateFormComponent implements OnInit {
  typeOfField: any[] = [
    'number',
    'text',
    'email',
    'select',
    'radio',
    'checkbox',
    'group',
  ];
  isShowGeneralModal: boolean = false;
  isFormCreated: boolean = true;
  formName: string = 'login';
  generateForm: FormGroup = new FormGroup({});
  formArrayItems: FormArray = new FormArray<any>([]);
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.generateForm = this.generateCustomForm();
    console.log('generate form group', this.generateCustomForm());
  }
  createNewForm() {
    this.isShowGeneralModal = true;
  }

  generalModalShowHide(value: boolean) {
    console.log('value ');
    this.isFormCreated = value && this.formName.trim().length !== 0;
    this.isShowGeneralModal = false;
  }

  formNameChange() {
    console.log('form name change', this.formName);
    // console.log('cancel modal', this.GeneralModalComponent);
  }
  generateCustomForm() {
    let group: any = {
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
      placeholder: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
    };
    return new FormGroup(group);
  }
  addControl(controlName?: string, validators?: any[]) {}
  createControl(validators: any = ['required']): FormControl {
    return new FormControl('', [Validators.required]);
  }
}
