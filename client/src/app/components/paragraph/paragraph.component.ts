import { Component, Input, OnInit } from '@angular/core';
import { ParagraphLevelFacade } from 'src/app/facade/paragraph-level/paragraph-level.facade';
import { IParagraph } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {

  @Input() paragraph: IParagraph | undefined;

  constructor(private parLevelFacade: ParagraphLevelFacade) { }

  ngOnInit(): void {
  }

}
