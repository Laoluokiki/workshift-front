import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  ButtonActionTypes,
  IActionButton,
  IPagination,
  IPaginationData,
  ITableColumn,
} from 'src/app/core/model/table.model';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableUiComponent implements OnInit {
  @Input() columns: ITableColumn[];
  @Input() actionButtons: IActionButton[];
  @Input() pagination: IPagination;
  @Input() showPagination: boolean = true;
  @Input() set data(payload: any) {
    this.dataSource = new MatTableDataSource(payload);
  }
  @Output() onRouteArrayTrigger: EventEmitter<{
    column: string;
    record: any;
    item: string;
  }> = new EventEmitter();
  @Output() retry: EventEmitter<{ column: string; record: any }> =
    new EventEmitter();
  @Output() onRouteTrigger: EventEmitter<{ column: string; record: any }> =
    new EventEmitter();
  @Output() onactionTrigger: EventEmitter<{
    action: ButtonActionTypes;
    record: any;
  }> = new EventEmitter();
  @Output() onPaginate: EventEmitter<IPaginationData> = new EventEmitter();
  @Output() onPerPage: EventEmitter<number> = new EventEmitter();

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;

  public filter: FormControl = new FormControl();

  constructor(
    private clipboard: Clipboard,
    private notification: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'])
      this.displayedColumns = changes['columns'].currentValue.map(
        (col: any) => col.key
      );
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((col) => col.key);
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    this.notification.success('Copied to clipboard!');
  }
  initiateAction(action: ButtonActionTypes, record: any) {
    this.onactionTrigger.emit({ action, record });
  }
  routeHandler(column: string, record: any) {
    this.onRouteTrigger.emit({ column, record });
  }
  routeArrayHandler(column: string, record: any, item: string) {
    this.onRouteArrayTrigger.emit({ column, record, item });
  }
  paginate(pageData: IPaginationData) {
    this.onPaginate.emit(pageData);
  }
  viewPerPage(perPage: number) {
    this.onPerPage.emit(perPage);
  }
}
