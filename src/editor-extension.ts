import type { Extension } from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView, ViewPlugin, type ViewUpdate } from "@codemirror/view";

import { paletteStyle } from "./palettes";
import { findTagMatches, isListItemSourceLine } from "./tag-rules";
import type { TagStyleRule } from "./types";

export function createBlockTagsEditorExtension(rules: TagStyleRule[]): Extension {
  return [
    ViewPlugin.fromClass(
      class {
        decorations: DecorationSet;

        constructor(view: EditorView) {
          this.decorations = buildListItemDecorations(view, rules);
        }

        update(update: ViewUpdate): void {
          if (update.docChanged || update.viewportChanged) {
            this.decorations = buildListItemDecorations(update.view, rules);
          }
        }
      },
      {
        decorations: (plugin) => plugin.decorations,
      },
    ),
    EditorView.outerDecorations.of((view) => buildTagDecorations(view, rules)),
  ];
}

function buildListItemDecorations(view: EditorView, rules: TagStyleRule[]): DecorationSet {
  const ranges = [];

  for (const visibleRange of view.visibleRanges) {
    let line = view.state.doc.lineAt(visibleRange.from);

    while (line.from <= visibleRange.to) {
      const matches = findTagMatches(line.text, rules);
      const listItemRule = matches[0]?.rule;

      if (listItemRule && isListItemSourceLine(line.text)) {
        ranges.push(
          Decoration.line({
            attributes: {
              class: "block-tags-editor-list-item",
              style: paletteStyle(listItemRule.palette),
            },
          }).range(line.from),
        );
      }

      if (line.to >= visibleRange.to || line.number === view.state.doc.lines) {
        break;
      }
      line = view.state.doc.line(line.number + 1);
    }
  }

  return Decoration.set(ranges, true);
}

function buildTagDecorations(view: EditorView, rules: TagStyleRule[]): DecorationSet {
  const ranges = [];

  for (const visibleRange of view.visibleRanges) {
    let line = view.state.doc.lineAt(visibleRange.from);

    while (line.from <= visibleRange.to) {
      for (const match of findTagMatches(line.text, rules)) {
        ranges.push(
          Decoration.mark({
            attributes: {
              class: "block-tags-editor-tag",
              style: paletteStyle(match.rule.palette),
            },
          }).range(line.from + match.from, line.from + match.to),
        );
      }

      if (line.to >= visibleRange.to || line.number === view.state.doc.lines) {
        break;
      }
      line = view.state.doc.line(line.number + 1);
    }
  }

  return Decoration.set(ranges, true);
}
