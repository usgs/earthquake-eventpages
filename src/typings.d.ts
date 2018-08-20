/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* Allow json files to be required. */
declare module '*.json' {
  const value: any;
  export default value;
}
