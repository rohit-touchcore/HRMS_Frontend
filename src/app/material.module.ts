import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

const modules = [
  MatCardModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatChipsModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  NgxMatFileInputModule,
  MatListModule,
  MatFormFieldModule,
  MatDividerModule,
  MatTabsModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
  MatDatepickerModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
