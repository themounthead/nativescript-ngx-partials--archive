import { Component } from '@angular/core';

import { PartialPanelLayout } from './partial-panel';

@Component({
  selector: 'RowPanel',
  templateUrl: './partial-row-panel.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialRowPanelComponent extends PartialPanelLayout { }

