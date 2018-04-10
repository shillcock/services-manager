import { Component, ViewEncapsulation } from '@angular/core';

import { ServiceRenderer, ServiceResponse } from '@app/core/models';

@Component({
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="json-renderer">
      <pre [innerHtml]="prettyPrint(context)"></pre>
    </div>
  `,
  styles: [
    `
    .json.string { color: green; }
    .json.number { color: blue; }
    .json.boolean { color: red; }
    .json.null { color: magenta; }
    .json.key { color: purple; }
  `
  ]
})
export class JsonRendererComponent implements ServiceRenderer {
  context: ServiceResponse;

  prettyPrint(obj) {
    const json = JSON.stringify(obj, null, 2);
    return syntaxHighlight(json);
  }
}

const syntaxHighlight = json => {
  const escappedJson = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escappedJson.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    match => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="json ' + cls + '">' + match + '</span>';
    }
  );
};
