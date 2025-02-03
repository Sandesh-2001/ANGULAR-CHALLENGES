import { JsonPipe, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgTemplateOutlet, JsonPipe],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent implements AfterViewInit {
  isDropdownOpen: boolean = true;
  @Input('options') options: any = [];
  @Input('enableSearch') enableSearch: boolean = false;
  @Input('placeholder') placeholder: string = '';
  @Output('selectionChange') selectionChange: EventEmitter<any> =
    new EventEmitter<any>();

  @ContentChild(TemplateRef) optionTemplate: TemplateRef<any> | null = null; // Custom option template

  onOptionChange(option: any) {
    this.selectionChange.emit(option);
  }
  ngAfterViewInit(): void {
    console.log('template', this.optionTemplate);
  }
}
