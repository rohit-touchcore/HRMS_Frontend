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

const modules = [
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  NgxMatFileInputModule,
  MatFormFieldModule,
  MatDividerModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
