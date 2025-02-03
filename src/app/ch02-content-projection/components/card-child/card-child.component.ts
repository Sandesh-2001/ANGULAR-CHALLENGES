import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-card-child',
  standalone: true,
  imports: [],
  templateUrl: './card-child.component.html',
  styleUrl: './card-child.component.css',
})
export class CardChildComponent {
  @Input('headerBg') headerBg!: string;
  @Input('bodyBg') bodyBg!: string;
  @Input('footerBg') footerBg!: string;
  @Input('closable') closable: boolean = true;
  @Input('id') id: number = 0;
  @Output('close') close: EventEmitter<number> = new EventEmitter<number>();
  @ContentChild('footer') footer!: ElementRef;

  onCloseCard() {
    this.close.emit(this.id);
  }
  ngAfterContentInit() {
    console.log('this footer', this.footer);
  }
  ngAfterViewInit() {}
}
