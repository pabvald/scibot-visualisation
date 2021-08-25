import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ArticleComponent } from './components/article/article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTabComponent } from './components/data-tab/data-tab.component';
import { LabelComponent } from './components/label/label.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTabComponent,
    LabelComponent,
    ArticleComponent,
    ParagraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
