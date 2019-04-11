import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatLineModule, MatNavList, MatTabsModule, MatListModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatButtonModule,MatCheckboxModule,MatInputModule,MatSidenavModule,MatIconModule,MatToolbarModule,MatListModule,MatSelectModule,MatCardModule
  ]
})
export class MatmodulesModule { }
