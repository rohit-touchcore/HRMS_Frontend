import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';
import { IndexComponent } from 'src/app/index/index.component';

import { SharedModule } from './shared.module';
import { SideNavModule } from './sidenav.module';

@NgModule({
  imports: [CommonModule, SharedModule, SideNavModule],
  declarations: [IndexComponent, HeaderComponent],
  exports: [IndexComponent, HeaderComponent, SideNavModule],
  providers: [],
})
export class CoreModule {}
