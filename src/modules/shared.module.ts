import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from 'src/app/table/table.component';
import { ExpansionComponent } from 'src/app/expansion/expansion.component';
import { LoaderComponent } from 'src/app/loader/loader.component';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IsArrayPipe } from 'src/app/helper/is-array.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    LoaderComponent,
    TableComponent,
    ExpansionComponent,
    DialogComponent,
    SnackbarComponent,
    IsArrayPipe,
  ],
  exports: [
    LoaderComponent,
    TableComponent,
    ExpansionComponent,
    DialogComponent,
    SnackbarComponent,
    MaterialModule,
    RouterModule,
    IsArrayPipe,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class SharedModule {}
