import { Component, Directive, ContentChild, Optional, AfterViewInit, ElementRef } from '@angular/core';

import { PartialPage } from './partial-page';

@Component({
  selector: 'Page',
  templateUrl: './partial-page.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialPageComponent extends PartialPage { }
