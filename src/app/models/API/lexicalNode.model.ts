export type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  children?: LexicalNode[];
}