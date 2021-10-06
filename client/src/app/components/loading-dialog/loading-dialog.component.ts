import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataFacade } from 'src/app/facade/data/data.facade';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent {


  constructor(public dialog: MatDialog, private dataFacade: DataFacade) {
    this.dataFacade.isUpdating$().subscribe((isUpdating) => {
      if (isUpdating) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    })
  }

  /** Opens the dialog */
  openDialog() {
    this.dialog.open(LoadingDialogContent, { disableClose: true });
  }

  /** Closes the dialog */
  closeDialog() {
    this.dialog.closeAll();
  }
  
}


@Component({
  selector: 'loading-dialog-content',
  templateUrl: './content/loading-dialog-content.html',
  styleUrls: ['./content/loading-dialog-content.scss']
})
export class LoadingDialogContent {}