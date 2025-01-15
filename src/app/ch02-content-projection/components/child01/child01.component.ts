import { Component } from '@angular/core';

@Component({
  selector: 'app-child01',
  standalone: true,
  imports: [],
  templateUrl: './child01.component.html',
  styleUrl: './child01.component.css',
})
export class Child01Component {
  name: any = 'sandesh';
}
