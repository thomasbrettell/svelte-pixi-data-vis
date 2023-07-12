export declare type PanelAlignment = 'left' | 'right';
export interface PanelRef extends Element {
    scrollyData?: any;
}
export interface PanelDefinition {
    align?: PanelAlignment;
    panelClass?: string;
    data: any;
    nodes: Element[];
    steps?: PanelRef[];
}
export declare type ScrollytellerDefinition = {
    mountNode: Element;
    panels: PanelDefinition[];
};
