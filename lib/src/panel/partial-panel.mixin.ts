import { Input } from '@angular/core';

export class PartialPanelMixin {

  @Input() debug;
  @Input() width = '';
  @Input() height = '';
  @Input() padding = 0;
  @Input() margin = 0;
  @Input() alignItems = 'center';
  @Input() justifyContent = 'space-between';

  get debugClass() { return this.debug || this.debug === '' ? 'debug' : ''; }

}
