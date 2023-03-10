import { Color, Curve, DeepReadonly, Scale } from './types';
export declare const removeComponentName: (str: string) => string;
export declare const removePseudoPostfix: (str: string) => string;
export declare function hexToColor(hex: string): Color;
export declare function colorToHex(color: Color): string;
export declare function randomIntegerInRange(min: number, max: number): number;
export declare function getColor(curves: Record<string, DeepReadonly<Curve>>, scale: DeepReadonly<Scale>, index: number): {
    hue: number;
    saturation: number;
    lightness: number;
};
export declare function getRange(type: Curve['type']): {
    min: number;
    max: number;
} | {
    min: number;
    max: number;
} | {
    min: number;
    max: number;
};
export declare function getContrastScore(contrast: number): "Fail" | "AA Large" | "AA" | "AAA";
//# sourceMappingURL=utils.d.ts.map