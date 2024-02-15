import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { PageTitlesComponent } from './components/page-titles/page-titles.component';
import { TableUiComponent } from './components/table/table.component';
import { SearchUiComponent } from './components/search-ui/search-ui.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherIconModule } from '../core/directives/feather-icon/feather-icon.module';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarComponent,
    PageTitlesComponent,
    TableUiComponent,
    SearchUiComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    TablerIconsModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FeatherIconModule
  ],
  exports: [
    CalendarComponent,
    PageTitlesComponent,
    TableUiComponent,
    SearchUiComponent,
    PaginatorComponent,
  ],
})
export class SharedModule {}
