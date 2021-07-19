import { Input } from '@angular/core';

import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout';

export class PartialFlexPanelLayout extends FlexboxLayout {

  @Input() debug;

  get isDebug() { return this.debug || this.debug === ''; }
  get debugClass() { return this.isDebug ? 'debug' : ''; }

  constructor() { super(); }

  onLoaded() {
    super.onLoaded();
    if (this.isDebug) { this.className = this.debugClass; }
  }

}
