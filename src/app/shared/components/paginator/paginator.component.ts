import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import {
  IPagination,
  IPaginationData,
  PageType,
} from 'src/app/core/model/table.model';
import { Unsubscribe } from 'src/app/core/services/unsubscribe.class';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent extends Unsubscribe implements OnInit {
  @Input() pagination: IPagination;
  @Output() onPaginate: EventEmitter<IPaginationData> = new EventEmitter();
  @Output() onPerPage: EventEmitter<number> = new EventEmitter();
  public perPage: FormControl = new FormControl('10');

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.perPageListener();
  }

  paginate(page: PageType, pageValue: string) {
    this.onPaginate.emit({ value: pageValue, pageType: page });
  }

  perPageListener() {
    this.perPage.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (value) => this.onPerPage.emit(Number(value)),
      });
  }
}
