import { Component, OnInit } from '@angular/core';
import { DataFacade } from 'src/app/facade/data/data.facade';
import { IDocument, Document} from 'src/app/models/document.model';
import { DataState } from 'src/app/state/data/data.state';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  document: IDocument | undefined;

  constructor(private dataState: DataState) { 
    this.dataState.getDocument$().subscribe((doc) => {this.document = new Document(doc)});
  }

  ngOnInit(): void {

  }

}
