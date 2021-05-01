import { Component } from '@angular/core';

import { PartialPanelLayout } from './partial-panel';

@Component({
  selector: 'ColPanel',
  templateUrl: './partial-col-panel.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialColPanelComponent extends PartialPanelLayout {

  constructor() {
    super();
    this.flexDirection = 'column';
  }

}
