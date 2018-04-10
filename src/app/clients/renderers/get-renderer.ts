import { DefaultRendererComponent } from './default-renderer.component';
import { JsonRendererComponent } from './json-renderer.component';
import { CommandsRendererComponent } from './commands-renderer.component';

const RENDERERS = {
  json: JsonRendererComponent,
  commands: CommandsRendererComponent,
  default: DefaultRendererComponent
};

export const getRenderer = (type: string) =>
  RENDERERS[type] || RENDERERS.default;
