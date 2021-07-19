import { Input, Output, EventEmitter } from '@angular/core';

import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';

export type TViewConfig = 'fixed' | 'float' | 'flow';

export type TToolbarConfig = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export class PartialPage extends StackLayout {

  @Input() debug;

  @Input() header: TViewConfig = 'flow';
  @Input() footer: TViewConfig = 'flow';
  @Input() toolbar: TToolbarConfig = 'bottom-right';

  @Output() actionBarReadyEmitter = new EventEmitter();
  @Output() pageReadyEmitter = new EventEmitter();
  @Output() headerReadyEmitter = new EventEmitter();
  @Output() footerReadyEmitter = new EventEmitter();

  constructor() { super(); }

  onLoaded() { super.onLoaded(); }

  get isDebug() { return this.debug || this.debug === ''; }

  get debugClass() { return this.debug || this.debug === '' ? 'debug' : ''; }

  get toolbarVAlign() { return this.toolbar.split('-')[0]; }

  get toolbarHAlign() { return this.toolbar.split('-')[1]; }

}
