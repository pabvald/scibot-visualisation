import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { Input } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article | undefined; 

  constructor() { }

  ngOnInit(): void {
  }


}
