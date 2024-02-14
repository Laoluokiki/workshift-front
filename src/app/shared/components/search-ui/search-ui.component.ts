import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/core/services/unsubscribe.class';

@Component({
  selector: 'app-search-ui',
  templateUrl: './search-ui.component.html',
  styleUrls: ['./search-ui.component.scss'],
})
export class SearchUiComponent extends Unsubscribe implements OnInit {
  public search: FormControl = new FormControl();
  @Input() showSearchInput: boolean = true;
  @Input() placeholder: string = 'Search...';
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(800),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (searchVal) => this.onSearch.emit(searchVal),
      });
  }
}
