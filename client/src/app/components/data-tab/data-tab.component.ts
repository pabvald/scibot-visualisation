import { Component, OnInit } from '@angular/core';
import { Participant, participants } from 'src/app/models/participant';
import { ArticleOption, ArticleOptionGroup, articleGroups } from 'src/app/models/article';
import { Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-data-tab',
  templateUrl: './data-tab.component.html',
  styleUrls: ['./data-tab.component.scss']
})
export class DataTabComponent implements OnInit {
  
  selParticipant: string | undefined; // selected participant
  selArticle: string | undefined; // selected article

  participants: Participant[] = participants; // all participants
  articleGroups: ArticleOptionGroup[] = articleGroups; // all articles
  @Output() notifyLoadData = new EventEmitter();

  constructor() { }

  /**
   * Computed properties
   */

  /** Group of the selected article  */
  get selGroup(): string | undefined {
    let group = undefined;
    let foundGroup0 = articleGroups[0].articles.find((art)=> art.id === this.selArticle);
    let foundGroup1 = articleGroups[1].articles.find((art)=> art.id === this.selArticle);
  
    if (foundGroup0) {
      group = articleGroups[0].name;
    } else if (foundGroup1) {
      group = articleGroups[1].name;
    }
    return group;
  }

  /** Load button is disabled */
  get loadDisabled(): boolean {
    return (this.selParticipant === undefined) || (this.selArticle === undefined);
  }

  /**
   * Methods
   */
  
  ngOnInit() {}

  /** Notify parent component to load data */
  loadData(): void {
    this.notifyLoadData.emit({participant: this.selParticipant, 
                              group: this.selGroup, 
                              stimulus: this.selArticle})
  }
}
