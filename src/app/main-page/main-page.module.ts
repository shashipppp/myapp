import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatLineModule, MatNavList, MatTabsModule, MatListModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';


import { routingComponents } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [routingComponents,HeaderComponent],
  imports: [
    CommonModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule,HttpClientModule,MatButtonModule,MatCheckboxModule,MatInputModule,MatSidenavModule,MatIconModule,MatToolbarModule,MatListModule,MatSelectModule,MatCardModule
  ]
})
export class MainPageModule { }
