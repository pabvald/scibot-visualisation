import { Component, OnInit } from '@angular/core';
import { DataFacade } from 'src/app/facade/data/data.facade';
import { IDocument, Document} from 'src/app/models/document.model';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  document: IDocument | undefined;

  constructor(private dataFacade: DataFacade) { 
    this.dataFacade.getDocument$().subscribe((doc) => {this.document = new Document(doc)});
  }

  ngOnInit(): void {

  }

}
