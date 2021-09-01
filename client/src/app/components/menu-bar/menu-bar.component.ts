import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  userIds: string[] = [];
  documentIds: string[] = [];

  constructor() { 
  }

  ngOnInit(): void {
  }

}
