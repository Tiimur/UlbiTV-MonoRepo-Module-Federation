declare module '*.module.scss' {
    interface IClassNames {
        [className: string]: string,
    }
    
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';
    const svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default svg;
}

declare const __PLATFORM__: 'mobile' | 'desktop';