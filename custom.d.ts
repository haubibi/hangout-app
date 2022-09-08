declare module '*.svg' {
    import React = require('react');
    export const ReactSvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    // const srcUrl: string;
    // export default srcUrl;
  }