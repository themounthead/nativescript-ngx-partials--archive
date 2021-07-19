import { Inject, forwardRef, Injectable } from '@angular/core';

import { TViewConfig, TToolbarConfig } from './page/partial-page';

import { Observable, Subject } from 'rxjs';

interface IPageSetting {
  header?: TViewConfig;
  footer?: TViewConfig;
  toolbar?: TToolbarConfig;
}

@Injectable({ providedIn: 'root' })
export class PageService {

  private pageSubject = new Subject();
  private page$: Observable<IPageSetting> = this.pageSubject.asObservable();

  public setPageLayout(setting: IPageSetting) { this.pageSubject.next(setting); }
  public getPageLayout$() { return this.page$; }

}
