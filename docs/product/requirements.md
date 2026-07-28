# Requirements

## Context

The [product brief](brief.md) defines the need to visually distinguish tagged text blocks while preserving portable Markdown.

## Functional requirements

### BT-001 — Configure tag rules

A user can add, enable/disable, edit, and remove a rule identified by an Obsidian tag. Each rule selects one high-chroma color family; theme-aware tag surface/text and bullet shades are derived from that family. A leading `#` is optional in settings.

### BT-002 — Decorate Reading view

For each rendered configured tag, the tag receives its coordinated surface/text colors in a continuous label with vertically centered text. The plugin suppresses borders and border-like shadows contributed by the active theme on that label. If the tag is in a list item, only that item's bullet receives the family color. A collapsed item retains a stronger inner bullet and lighter same-family outer ring.

### BT-003 — Decorate the editor

For each configured tag on a visible source line, one outer decoration wraps Obsidian's internal syntax spans and renders the exact tag token as a continuous, modestly rounded label with vertically centered text. The wrapper and internal syntax spans suppress borders and border-like shadows contributed by the active theme. On a list-item line, only the bullet receives the family color, with a lighter same-family ring in the collapsed state.

### BT-004 — Refresh without restart

Saving a settings change updates open editor and Reading views without requiring Obsidian to restart.

### BT-005 — Preserve Markdown

Enabling, configuring, disabling, or uninstalling the plugin does not modify note content.

## Quality attributes

- Decoration work is limited to rendered Reading-view sections and visible editor ranges.
- Legacy color settings migrate to the nearest supported Radix family instead of preventing plugin load.
- Dark-theme families use a deeply saturated surface and bright same-hue foreground. Light-theme families use a pale saturated surface and darker same-hue foreground. The foreground also colors the bullet, while a translucent foreground creates the collapsed ring.
- The plugin makes no network requests and stores only rule settings.

## Interfaces and data

- Input: standard inline Obsidian tags in Markdown and user-managed rules in plugin data.
- Output: ephemeral CSS classes and variables in Obsidian's rendered DOM.
- Obsidian owns note content, rendering lifecycle, settings persistence, and editor lifecycle.

## Edge cases and failure behavior

- Empty or syntactically invalid tag names do not match content.
- Duplicate tag rules are resolved in settings order; the first enabled rule wins.
- If a list item contains multiple configured tags, the first tag in document order controls the bullet; each tag token keeps its own rule.
- Code-fence-aware matching and multiline editor-block expansion are deferred; the initial editor behavior is line-based.

## Open questions

- Should a future release associate a tag on a continuation line with the owning list item's bullet?
- Should users be able to reorder rules or add custom palettes?
