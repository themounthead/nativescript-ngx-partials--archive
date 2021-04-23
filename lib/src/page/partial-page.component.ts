import { Component, Directive, ContentChild, Optional, AfterViewInit, ElementRef } from '@angular/core';

import { PartialPageMixin } from './partial-page.mixin';

@Component({
  selector: 'ngx-page',
  templateUrl: './partial-page.component.html',
  styleUrls: ['../partial-component.scss'],
})
export class PartialPageComponent extends PartialPageMixin { }

