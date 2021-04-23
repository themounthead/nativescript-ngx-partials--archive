import { Injectable, Inject, forwardRef, Directive, Optional, ContentChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { screen, isIOS } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';
import { StackLayout } from 'tns-core-modules/ui/layouts';

import { PartialPageComponent } from './partial-page.component';

import { timer } from 'rxjs';

import { combineLatest, tap } from 'rxjs/operators';

const IOS_NOTCH_OFFSET = 46;


@Injectable({ providedIn: 'root' })
export class ActionBarService {
  private actionBar: ActionBar;
  getActionBar() { return this.actionBar; }
  setActionBar(o) { this.actionBar = o; }
}

@Directive({
  selector: 'ActionBar',
})
export class ActionBarQueryDirective {

  constructor(
    @Inject(forwardRef(() => ElementRef)) private actionBar,
    @Inject(forwardRef(() => ActionBarService)) private actionBarService,
  ) {
    const actionBarEl = this.actionBar ? this.actionBar.nativeElement : null;
    this.actionBarService.setActionBar(actionBarEl);
  }

}

@Directive({
  selector: '[ngx-partial-page]',
})
export class PartialPageComponentDirective implements AfterViewInit {

  @ContentChild('scrollView', { read: ElementRef, static: false }) scrollView: ElementRef;
  @ContentChild('contentView', { read: ElementRef, static: false }) contentView: ElementRef;
  @ContentChild('headerView', { read: ElementRef, static: false }) headerView: ElementRef;
  @ContentChild('footerView', { read: ElementRef, static: false }) footerView: ElementRef;

  constructor(
    @Inject(forwardRef(() => ActionBarService)) private actionBarService,
    @Inject(forwardRef(() => PartialPageComponent)) private pageComponent: PartialPageComponent,
    @Inject(forwardRef(() => Page)) private page: Page,
  ) { }


  ngAfterViewInit() {
    this.watchViewEmitters();
  }

  private watchViewEmitters(actionBarEvt?) {
    this.pageComponent.headerReadyEmitter
      .pipe(
        tap(),
        combineLatest(this.pageComponent.footerReadyEmitter),
      )
      .subscribe(([headerEvt, footerEvt]) => {
        const actionBar = this.actionBarService.getActionBar();
        if (actionBar) {
          actionBar.on('loaded', evt => setTimeout(() => { this.onViewsLoaded(actionBarEvt, headerEvt, footerEvt); }, 100));
        } else {
          setTimeout(() => this.onViewsLoaded(actionBarEvt, headerEvt, footerEvt), 100);
        }
      });
  }

  private onViewsLoaded(actionBarEvt, headerEvt, footerEvt) {
    if (!this.scrollView || !this.contentView) { return; }
    const headerState = this.pageComponent.header;
    const footerState = this.pageComponent.footer;
    const actionBar = (actionBarEvt) ? <StackLayout>actionBarEvt.object : null;
    const headerView = (headerEvt) ? <StackLayout>headerEvt.object : null;
    const footerView = (footerEvt) ? <StackLayout>footerEvt.object : null;
    const contentView = <StackLayout>this.contentView.nativeElement;
    const scrollView = <StackLayout>this.scrollView.nativeElement;
    const scale = screen.mainScreen.scale;
    const pageHeight = this.page.getMeasuredHeight() / scale;
    const actionBarHeight = (actionBar) ? actionBar.getMeasuredHeight() / scale : 0;
    const headerHeight = (headerView) ? headerView.getMeasuredHeight() / scale : 0;
    const footerHeight = (footerView) ? footerView.getMeasuredHeight() / scale : 0;
    let scrollHeight = pageHeight - (actionBarHeight + headerHeight + footerHeight);
    scrollHeight = (isIOS) ? scrollHeight + IOS_NOTCH_OFFSET : scrollHeight;
    const contentHeight = scrollHeight + headerHeight;

    if (this.pageComponent.isDebug) {
      console.dir({ actionBarHeight, headerHeight, footerHeight, pageHeight, scrollHeight, contentHeight });
      this.markViewDebug();
    }

    if (headerState !== 'fixed' && footerState !== 'fixed') { return; }
    if (headerState === 'fixed' && footerState === 'fixed') {
      this.scrollView.nativeElement.height = scrollHeight;
      this.contentView.nativeElement.height = scrollHeight;
    }
    if (headerState === 'flow' && footerState === 'fixed') { this.contentView.nativeElement.height = contentHeight; }
    if (headerState === 'float' && footerState === 'fixed') { this.contentView.nativeElement.height = contentHeight; }
  }

  private markViewDebug() {
    this.headerView.nativeElement.className = 'debug';
    this.footerView.nativeElement.className = 'debug';
    this.contentView.nativeElement.className = 'debug';
    this.scrollView.nativeElement.className = 'debug';
  }

}
