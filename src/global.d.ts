// Minimal React type declarations for TypeScript
declare module "react" {
    export const useState: any;
    export type ChangeEvent<T = any> = any;
    export type FormEvent<T = any> = any;
    export const Fragment: any;
}

// Allow any JSX intrinsic elements
declare namespace JSX {
    interface IntrinsicElements {
        [elem: string]: any;
    }
}
