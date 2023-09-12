export type TargetNode = SectionNode | ComponentSetNode | ComponentNode | FrameNode;
export type Name = string | null;

export type Size = DimensionAndPositionMixin['minWidth'] | DimensionAndPositionMixin['maxWidth'];
export type Fills = ReadonlyArray<Paint> | typeof figma.mixed;
export type LayoutMode = AutoLayoutMixin['layoutMode'];
export type LayoutWrap = AutoLayoutMixin['layoutWrap']
export type PrimaryAxisAlignItems = AutoLayoutMixin['primaryAxisAlignItems'];
export type CounterAxisAlignItems = AutoLayoutMixin['counterAxisAlignItems'];
