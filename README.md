# Nativescript-Ngx-Partials

A Nativescript Angular module to quickly create Pages and Layout fragments


## Setup

`npm install nativescript-ngx-partials --save`

Import the module into your _app-module_ 

`import { ngx-partials } from 'nativescript-ngx-partials';`

## Getting Started

### Page

`<ngx-page>`

The page layout consists of a root tag and nested attribute containers:
- ngx-page (root element)
- page-header
- page-content
- page-footer
- page-toolbar

The _ngx-page_ has the following options:
- header=flow/float/fixed
- footert=flow/float/fixed
- toolbar=top-left/bottom-left (any combination of horizontal and vertical properties)
- debug (highlights the container elements)

### Panel

The panel layout is a flex-box container that simplifies the process of nested elements by using row and column tags

### Row

`<ngx-row-panel>`

The _ngx-row-panel_ has the following nested containers:
- panel-left
- panel-middle
- panel-right

### Col

`<ngx-col-panel>`

The _ngx-col-panel_ has the following nested containers:
- panel-top
- panel-middle
- panel-bottom

# Examples
Provided in the source code app

