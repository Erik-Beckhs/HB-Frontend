import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

const MaterialComponents = [
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule, 
    MatInputModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatDividerModule,
    MatPaginatorModule,
    CommonModule,
    MatStepperModule
];

@NgModule({
    //imports:MaterialComponents,
    exports:MaterialComponents
})

export class MaterialModule{}