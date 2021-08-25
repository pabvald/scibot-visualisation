import { Component } from '@angular/core';
import { Participant } from 'src/app/models/participant';
import { Article } from 'src/app/models/article';
import { DataService } from 'src/app/services/data/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  participant: Participant | undefined;
  article: Article | undefined;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

  }

  /** Loads the data */
  loadData(params: any) {
    let participant = params.participant;
    let group = params.group;
    let stimulus = params.stimulus;
    this.dataService.getArticle(group, stimulus).subscribe(
      (article: Article) => { this.article = article;},
      (error: any) => { /* handle error */});
  }
}
