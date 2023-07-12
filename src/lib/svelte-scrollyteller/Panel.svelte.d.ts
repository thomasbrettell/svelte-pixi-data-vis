import { SvelteComponentTyped } from "svelte";
import type { PanelDefinition } from './types';
declare const __propDef: {
    props: {
        props: PanelDefinition;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type PanelProps = typeof __propDef.props;
export declare type PanelEvents = typeof __propDef.events;
export declare type PanelSlots = typeof __propDef.slots;
export default class Panel extends SvelteComponentTyped<PanelProps, PanelEvents, PanelSlots> {
}
export {};
