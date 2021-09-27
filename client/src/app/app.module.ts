import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatSliderModule} from '@angular/material/slider';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
import { DocumentDetailsComponent } from './components/document-details/document-details.component';
import { ParagraphTabComponent } from './components/paragraph-tab/paragraph-tab.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


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
    ColorLegendComponent,
    DocumentDetailsComponent,
    ParagraphTabComponent
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
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
