import { Component } from '@angular/core';

import { PartialFlexPanelLayout } from './partial-flex-panel';

@Component({
  selector: 'RowPanel',
  templateUrl: './partial-row-panel.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialRowPanelComponent extends PartialFlexPanelLayout { }

