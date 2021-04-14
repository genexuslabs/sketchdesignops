declare const NSMakeRect: (x: any, y: any, width: any, height: any) => any;
declare const NSMakeSize: (width: any, height: any) => void;

declare const NSUTF8StringEncoding: any;
declare const NSSelectorFromString: any;
declare const AppController: any;

/**
 * 给 Store 部分的 key
 */
declare interface SketchStore {
  // Sketch 调整微调间距
  nudgeDistanceSmall: string;
}
declare type SketchStoreKey = keyof SketchStore;

declare const COScript: any;

declare namespace NodeJS {
  interface ProcessVersions {
    plugin: string;
    sketch: string;
  }
  interface Process {
    type: string;
  }
}
