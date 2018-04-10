import { Component } from '@angular/core';

import { ServiceRenderer, ServiceResponse } from '@app/core/models';

@Component({
  template: `
    <div class="default-renderer">
      <pre>{{context | json}}</pre>
    </div>
  `
})
export class DefaultRendererComponent implements ServiceRenderer {
  context: ServiceResponse;
}
