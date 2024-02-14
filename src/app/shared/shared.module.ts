import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { PageTitlesComponent } from './components/page-titles/page-titles.component';
import { TableUiComponent } from './components/table/table.component';
import { SearchUiComponent } from './components/search-ui/search-ui.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarComponent,
    PageTitlesComponent,
    TableUiComponent,
    SearchUiComponent,
    PaginatorComponent,
  ],
  imports: [CommonModule],
  exports: [
    CalendarComponent,
    PageTitlesComponent,
    TableUiComponent,
    SearchUiComponent,
    PaginatorComponent,
  ],
})
export class SharedModule {}
