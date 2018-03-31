import { Type } from '@angular/core';

export class Action {
  constructor(public component: Type<any>, public data: any) {}
}
