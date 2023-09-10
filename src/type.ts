export type TargetNode = SectionNode | ComponentSetNode | ComponentNode | FrameNode;
export type AutoLayoutNode = ComponentSetNode | ComponentNode | FrameNode | InferredAutoLayoutResult | InstanceNode;

export type Name = string | null;

export type Size = DimensionAndPositionMixin['minWidth'] | DimensionAndPositionMixin['maxWidth'];
export type LayoutMode = AutoLayoutMixin['layoutMode'];
export type LayoutWrap = AutoLayoutMixin['layoutWrap']
export type PrimaryAxisAlignItems = AutoLayoutMixin['primaryAxisAlignItems'];
export type CounterAxisAlignItems = AutoLayoutMixin['counterAxisAlignItems'];
