import { Input, Output, EventEmitter } from '@angular/core';

type TViewConfig = 'fixed' | 'float' | 'flow';

type TToolbarConfig = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export class PartialPageMixin {

  @Input() debug;
  @Input() width = '';
  @Input() height = '';
  @Input() padding = 0;
  @Input() margin = 0;

  @Input() header: TViewConfig = 'flow';
  @Input() footer: TViewConfig = 'flow';
  @Input() toolbar: TToolbarConfig = 'bottom-right';

  @Output() actionBarReadyEmitter = new EventEmitter();
  @Output() headerReadyEmitter = new EventEmitter();
  @Output() footerReadyEmitter = new EventEmitter();

  get isDebug() { return this.debug || this.debug === ''; }

  get debugClass() { return this.debug || this.debug === '' ? 'debug' : ''; }

  get toolbarVAlign() { return this.toolbar.split('-')[0]; }

  get toolbarHAlign() { return this.toolbar.split('-')[1]; }

}
