/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'lodash';

/* Lodash */
declare var _: any;
