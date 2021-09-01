import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { DataTabComponent } from './components/data-tab/data-tab.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { DocumentComponent } from './components/document/document.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { LabelComponent } from './components/label/label.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    DataTabComponent,
    MainPanelComponent,
    DocumentComponent,
    ParagraphComponent,
    LabelComponent
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
