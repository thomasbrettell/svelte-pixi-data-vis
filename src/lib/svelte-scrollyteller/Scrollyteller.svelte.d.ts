import { SvelteComponentTyped } from "svelte";
declare global {
    interface Window {
        __IS_ODYSSEY_FORMAT__: boolean;
    }
}
import type { SvelteComponent } from 'svelte/internal';
import type { PanelDefinition } from './types';
declare const __propDef: {
    props: {
        customPanel?: SvelteComponent | null;
        panels: PanelDefinition[];
        onProgress?: (progress: any) => void;
        onMarker: (marker: any) => void;
        observerOptions?: IntersectionObserverInit;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type ScrollytellerProps = typeof __propDef.props;
export declare type ScrollytellerEvents = typeof __propDef.events;
export declare type ScrollytellerSlots = typeof __propDef.slots;
export default class Scrollyteller extends SvelteComponentTyped<ScrollytellerProps, ScrollytellerEvents, ScrollytellerSlots> {
}
export {};
