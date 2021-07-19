import { Component } from '@angular/core';

import { PartialFlexPanelLayout } from './partial-flex-panel';

@Component({
  selector: 'ColPanel',
  templateUrl: './partial-col-panel.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialColPanelComponent extends PartialFlexPanelLayout {

  constructor() {
    super();
    this.flexDirection = 'column';
  }

}
