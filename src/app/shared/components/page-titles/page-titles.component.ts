import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonActionTypes, IActionButton } from 'src/app/core/model/table.model';

@Component({
  selector: 'app-page-titles',
  templateUrl: './page-titles.component.html',
  styleUrls: ['./page-titles.component.scss']
})
export class PageTitlesComponent implements OnInit {

  @Input() title: string;
  @Input() titleActionButtons: IActionButton[];
  @Input() showBackButton: boolean = true;
  @Output() onactionTrigger: EventEmitter<ButtonActionTypes> = new EventEmitter()
  
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {}

  goBack() {
    history.back()
  }

  matchedRoutes() {
    return (
        !this.router.url.includes('dashboard') &&
        !this.router.url.includes('customers/profile')
      )
  }

  triggerAction(action: ButtonActionTypes) {
    this.onactionTrigger.emit(action)
  }

}
