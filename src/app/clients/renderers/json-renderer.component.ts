import { Component, ViewEncapsulation } from '@angular/core';

const syntaxHighlight = (json: any) => {
  const escappedJson = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escappedJson.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match: any) => {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
};

@Component({
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="json-renderer">
      <mat-card>
        <mat-card-content>
          <pre *ngIf="prettyPrint; else rawJson" [innerHtml]="prettyPrint(context)"></pre>
          <ng-template #rawJson>
            <pre>{{context | json}}</pre>
          </ng-template>
        </mat-card-content>
      </mat-card>
    </div>    `,
  styles: [
    `
    .json-renderer mat-card { background-color: #eee; }
    .json-renderer .json-string { color: grey; }
    .json-renderer .json-number { color: blue; }
    .json-renderer .json-boolean { color: red; }
    .json-renderer .json-null { color: magenta; }
    .json-renderer .json-key { color: purple; }
  `
  ]
})
export class JsonRendererComponent {
  context: any;

  prettyPrint(obj: any) {
    const json = JSON.stringify(obj, null, 2);
    return syntaxHighlight(json);
  }
}
