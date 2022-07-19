import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TableComponent } from './table/table.component';
import { ExpansionComponent } from './expansion/expansion.component';

import { TableService } from './table/table.service';
import { DialogService } from './dialog/dialog.service';
import { IsArrayPipe } from '../helper/is-array.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TableComponent,
    DialogComponent,
    LoaderComponent,
    SnackbarComponent,
    ExpansionComponent,
    IsArrayPipe,
  ],
  exports: [
    TableComponent,
    DialogComponent,
    LoaderComponent,
    SnackbarComponent,
    ExpansionComponent,
    IsArrayPipe,
  ],
  providers: [TableService, DialogService],
})
export class SharedModule {}
