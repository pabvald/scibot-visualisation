import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatSliderModule} from '@angular/material/slider';
import { MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { DataTabComponent } from './components/data-tab/data-tab.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { DocumentComponent } from './components/document/document.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { LabelComponent } from './components/label/label.component';
import { LabelTabComponent } from './components/label-tab/label-tab.component';
import { ColorLegendComponent } from './components/color-legend/color-legend.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    DataTabComponent,
    MainPanelComponent,
    DocumentComponent,
    ParagraphComponent,
    LabelComponent,
    LabelTabComponent,
    ColorLegendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
