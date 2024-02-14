import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export abstract class Unsubscribe implements OnDestroy {
    unsubscribe$ = new Subject<void>()

    constructor(){}

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}