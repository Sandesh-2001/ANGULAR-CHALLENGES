import {
  AfterViewInit,
  Component,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './general-modal.component.html',
  styleUrl: './general-modal.component.css',
})
export class GeneralModalComponent implements AfterViewInit {
  @ViewChild('cancelModel', { static: true }) cancelModal!: HTMLButtonElement;
  @ViewChild('submitModel', { static: true }) submitModal: any;
  // formInputValue: string = '';
  @Output('isShowModal') isShowModal: EventEmitter<any> = new EventEmitter();
  onCancelClick() {
    console.log('cancel clicked');
    this.isShowModal.emit(false);
  }
  onSubmitClick() {
    this.isShowModal.emit(true);
  }
  ngAfterViewInit(): void {
    console.log('submit modla', this.submitModal);
  }
}
