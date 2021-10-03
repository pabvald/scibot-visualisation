import { Component, OnInit } from '@angular/core';
import { DataFacade } from 'src/app/facade/data/data.facade';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  userId: string = "";
  docId: string = "";
  query: string = ""; 

  constructor(private dataFacade: DataFacade) { 
    this.dataFacade.getDocument$()
                  .subscribe((document) => {
                    this.userId = document.userId;
                    this.docId = document.id;
                    this.query = document.query;
                  })
  }

  ngOnInit(): void {
  }

}
