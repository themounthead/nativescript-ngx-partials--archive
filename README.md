# Nativescript-Ngx-Partials

A Nativescript Angular module to quickly create Pages and Layout fragments


## Setup

`npm install nativescript-ngx-partials --save`

Import the module into your _app-module_ 

```
import { PartialsModule, RowPanel, ColPanel } from 'ngx-partials';

import { registerElement } from 'nativescript-angular/element-registry';

registerElement('RowPanel', () => RowPanel);
registerElement('ColPanel', () => ColPanel);

```

## Getting Started

### Page

The page layout consists of a root tag and nested attribute containers:
- Page (root element)
- page-header
- page-content
- page-footer
- page-toolbar

The _Page_ has the following options:
- header=flow/float/fixed
- footert=flow/float/fixed
- toolbar=top-left/bottom-left (any combination of horizontal and vertical properties)
- debug (highlights the container elements)

### Panel

The Panel is a NativeScript Flex-box layout view that simplifies the process of nested elements by using row and column tags

| You can add the native Flexbox css styles to the Row/Col Panel 

### Row

#### RowPanel

The _RowPanel_ has the following nested containers:
- panel-left
- panel-middle
- panel-right

### Col

#### ColPanel

The _ColPanel_ has the following nested containers:
- panel-top
- panel-middle
- panel-bottom

# Examples

Provided in the demo app

