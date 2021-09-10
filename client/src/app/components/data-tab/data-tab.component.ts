import { Component, OnInit } from '@angular/core';
import { DataFacade } from 'src/app/facade/data/data.facade';

@Component({
  selector: 'app-data-tab',
  templateUrl: './data-tab.component.html',
  styleUrls: ['./data-tab.component.scss']
})
export class DataTabComponent implements OnInit {


  userIds: string[] = [];
  documentIds: string[] = [];
  isUpdating: boolean = false;
  selUserId: string | undefined; // selected participant
  selDocumentId: string | undefined; // selected article

  constructor(private dataFacade: DataFacade) { 
    this.dataFacade.isUpdating$().subscribe((value) => {this.isUpdating = value});
    this.dataFacade.getUserIds$().subscribe((data) => {this.userIds = data});
    this.dataFacade.getDocumentIds$().subscribe((data) => {this.documentIds = data});
  }

  /** Load button is disabled */
  get loadDisabled(): boolean {
    return (this.selUserId === undefined) || (this.selDocumentId === undefined);
  }

  /**
   * Methods
   */
  
  ngOnInit() {}

  /** Load document */
  loadData(): void {
    if (this.selUserId && this.selDocumentId) {
      this.dataFacade.loadDocument(this.selUserId, this.selDocumentId);
    }   
  }

}
