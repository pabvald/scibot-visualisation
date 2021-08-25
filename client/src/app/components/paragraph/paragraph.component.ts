import { Component, OnInit, Input } from '@angular/core';
import { Paragraph } from 'src/app/models/paragraph';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() paragraph: Paragraph | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
