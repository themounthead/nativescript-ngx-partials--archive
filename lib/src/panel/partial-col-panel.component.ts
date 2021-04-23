import { Component } from '@angular/core';

import { PartialPanelMixin } from './partial-panel.mixin';

@Component({
  selector: 'ngx-col-panel',
  templateUrl: './partial-col-panel.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialColPanelComponent extends PartialPanelMixin { }

