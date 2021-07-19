import { Inject, forwardRef, Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { distinctUntilChanged, skipWhile, take } from 'rxjs/operators';

interface Position { x: number; y: number; }

@Injectable({ providedIn: 'root' })
export class ScrollService {

  private scrollSubject = new BehaviorSubject({ x: undefined, y: undefined });
  private scroll$: Observable<Position> = this.scrollSubject.asObservable();

  public scrollToPosition(position: Position) {
    this.scrollSubject.next(position);
  }

  public watchScrollPosition$() { return this.scroll$; }

}
