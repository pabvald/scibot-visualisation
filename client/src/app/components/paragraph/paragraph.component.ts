import { Component, Input, OnInit } from '@angular/core';
import { IParagraph } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() paragraph: IParagraph | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
