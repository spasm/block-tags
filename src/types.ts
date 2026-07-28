export interface TagStyleRule {
  id: string;
  tag: string;
  enabled: boolean;
  palette: PaletteName;
}

export type PaletteName =
  | "gray"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "blue"
  | "purple"
  | "pink";

export interface BlockTagsSettings {
  rules: TagStyleRule[];
}

export interface TagMatch {
  from: number;
  to: number;
  rule: TagStyleRule;
}
