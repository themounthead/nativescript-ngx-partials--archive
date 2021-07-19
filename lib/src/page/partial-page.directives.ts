import { Injectable, Inject, forwardRef, Directive, Optional, ContentChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { ActionBar } from 'tns-core-modules/ui/action-bar';
import { screen, isIOS, isAndroid } from 'tns-core-modules/platform';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';

import { PartialPageComponent } from './partial-page.component';

import { Observable, Subscription, timer, interval, Subject } from 'rxjs';

import { combineLatest, throttleTime, filter, debounceTime, tap, takeUntil, skipWhile, distinctUntilChanged, delay, skip } from 'rxjs/operators';

import { KeyboardService } from '../keyboard.service';
import { ScrollService } from '../scroll.service';

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
  selector: '[partial-page]',
})
export class PartialPageComponentDirective implements AfterViewInit, OnDestroy {

  private keyboardSubscription: Subscription;
  private scrollSubscription: Subscription;

  @ContentChild('pageView', { read: ElementRef, static: false }) pageView: ElementRef;
  @ContentChild('scrollView', { read: ElementRef, static: false }) scrollView: ElementRef;
  @ContentChild('contentView', { read: ElementRef, static: false }) contentView: ElementRef;
  @ContentChild('headerView', { read: ElementRef, static: false }) headerView: ElementRef;
  @ContentChild('footerView', { read: ElementRef, static: false }) footerView: ElementRef;

  constructor(
    @Inject(forwardRef(() => ActionBarService)) private actionBarService,
    @Inject(forwardRef(() => KeyboardService)) private keyboardService: KeyboardService,
    @Inject(forwardRef(() => ScrollService)) private scrollService: ScrollService,
    @Inject(forwardRef(() => PartialPageComponent)) private pageComponent: PartialPageComponent,
  ) { }


  ngAfterViewInit() {
    this.watchViewEmitters();
  }

  ngOnDestroy() {
    if (this.keyboardSubscription) { this.keyboardSubscription.unsubscribe(); }
    if (this.scrollSubscription) { this.scrollSubscription.unsubscribe(); }
  }

  private watchViewEmitters(actionBarEvt?) {
    setTimeout(() => this.onViewsLoaded(), 350);
  }

  private onViewsLoaded() {
    if (!this.scrollView || !this.contentView) { return; }
    const scale = screen.mainScreen.scale;

    const headerState = this.pageComponent.header;
    const footerState = this.pageComponent.footer;

    const pageView = <StackLayout>this.pageView.nativeElement;
    const headerView = <StackLayout>this.headerView.nativeElement;
    const footerView = <StackLayout>this.footerView.nativeElement;
    const contentView = <StackLayout>this.contentView.nativeElement;
    const scrollView = <ScrollView>this.scrollView.nativeElement;

    const actionBar = this.actionBarService.getActionBar();

    const screenHeight = screen.mainScreen.heightDIPs;
    const actionBarHeight = actionBar ? actionBar.getMeasuredHeight() : 0;
    const pageHeight = pageView.getMeasuredHeight() / scale;
    const headerHeight = (headerView) ? headerView.getMeasuredHeight() / scale : 0;
    const footerHeight = (footerView) ? footerView.getMeasuredHeight() / scale : 0;
    let scrollHeight = pageHeight - (headerHeight + footerHeight);
    scrollHeight = (isIOS) ? scrollHeight + IOS_NOTCH_OFFSET : scrollHeight;
    const contentHeight = scrollHeight + headerHeight;

    if (isAndroid) {
      this.watchKeyboard(pageView, pageHeight);
      this.watchScroll(scrollView, scrollHeight);
    }

    if (this.pageComponent.height) { pageView.height = this.pageComponent.height; }
    if (this.pageComponent.width) { pageView.width = this.pageComponent.width; }
    if (this.pageComponent.padding) { pageView.padding = this.pageComponent.padding; }
    if (this.pageComponent.margin) { pageView.margin = this.pageComponent.margin; }

    if (this.pageComponent.isDebug) {
      console.dir({ screenHeight, actionBarHeight, pageHeight, headerHeight, footerHeight, contentHeight, scrollHeight });
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

  private watchKeyboard(pageView, pageHeight) {
    this.keyboardService.trackKeyboard();
    this.keyboardSubscription = this.keyboardService.isKeyboardShowing$()
      .pipe(throttleTime(150))
      .subscribe(isShowing => {
        setTimeout(() => {
          const pageOffset = pageHeight - this.keyboardService.getKeyboardSize();
          pageView.height = isShowing ? pageOffset : pageHeight;
          pageView.verticalAlignment = isShowing ? 'top' : 'stretch';
        }, 0);
      });
  }

  private watchScroll(scrollView: ScrollView, scrollHeight) {
    this.scrollSubscription = this.scrollService.watchScrollPosition$()
      .pipe(
        skip(1),
        filter(position => position.y > 0)
      )
      .subscribe(position => {
        const offset = position.y + scrollView.verticalOffset;
        scrollView.scrollToVerticalOffset(offset - scrollHeight / 3, true);
      });
  }

  private markViewDebug() {
    this.headerView.nativeElement.className = 'debug';
    this.footerView.nativeElement.className = 'debug';
    this.contentView.nativeElement.className = 'debug';
    this.scrollView.nativeElement.className = 'debug';
  }

}
