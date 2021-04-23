import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { PartialColPanelComponent } from './panel/partial-col-panel.component';
import { PartialRowPanelComponent } from './panel/partial-row-panel.component';
import { PartialPageComponent } from './page/partial-page.component';
import { PartialPageComponentDirective, ActionBarQueryDirective, ActionBarService } from './page/partial-page.directives';

const COMPONENTS = [
  PartialColPanelComponent,
  PartialRowPanelComponent,
  PartialPageComponent,
];

const DIRECTIVES = [
  PartialPageComponentDirective,
  ActionBarQueryDirective,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...DIRECTIVES,
    ...COMPONENTS,
  ],
  providers: [
    ActionBarService,
  ],
  exports: [
    ...DIRECTIVES,
    ...COMPONENTS,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NgxPartialsModule { }
