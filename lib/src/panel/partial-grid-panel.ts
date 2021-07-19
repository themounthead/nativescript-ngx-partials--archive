import { Input } from '@angular/core';

import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';

export class PartialGridPanelLayout extends GridLayout {

  @Input() debug;

  get isDebug() { return this.debug || this.debug === ''; }
  get debugClass() { return this.isDebug ? 'debug' : ''; }

  constructor() { super(); }

  onLoaded() {
    super.onLoaded();
    if (this.isDebug) { this.className = this.debugClass; }
  }

}
