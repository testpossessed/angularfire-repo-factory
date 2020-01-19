import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
];
@NgModule({
    declarations: [],
    imports: modules,
    exports: modules
})
export class MaterialModule {}
