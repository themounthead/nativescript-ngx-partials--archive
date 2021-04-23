import { Component } from '@angular/core';

import { PartialPanelMixin } from './partial-panel.mixin';

@Component({
  selector: 'ngx-row-panel',
  templateUrl: './partial-row-panel.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialRowPanelComponent extends PartialPanelMixin { }

