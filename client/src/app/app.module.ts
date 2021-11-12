/** Angular */
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Angular Material imports  */
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatSliderModule} from '@angular/material/slider';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/** Application Components */ 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
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
import { LoadingDialogComponent, LoadingDialogContent } from './components/loading-dialog/loading-dialog.component';


/* Application services */
import { GlobalHttpInterceptorService } from './services/global-http-interceptor/global-http-interceptor.service';
import { GlobalErrorHandlerService } from './services/global-error-handler/global-error-handler.service';

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
    ParagraphTabComponent,
    LoadingDialogComponent,
    LoadingDialogContent
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
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
