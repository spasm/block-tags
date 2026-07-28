# Block Tags

Block Tags is an Obsidian plugin that gives inline tags and their list bullets a coordinated color family without changing the note source.

For example:

```markdown
- This is an idea I want to come back to #Idea
```

Create an `Idea` rule in **Settings → Community plugins → Block Tags**, then choose a vivid Tana-inspired color family. The plugin derives theme-aware tag, bullet, and collapsed-ring shades from that family.

## Current behavior

- Works in the Markdown editor and Reading view.
- Renders each tag as one continuous, theme-aware label with modest corners and vertically centered text.
- Colors only the bullet of a tagged list item; surrounding block background and text are untouched.
- Preserves Obsidian's collapsed-bullet hierarchy with a lighter same-family outer ring.
- Matches tags case-insensitively and supports nested tags such as `#idea/later`.
- Leaves Markdown source untouched; rules are stored in the plugin's `data.json`.
- If a list item has multiple configured tags, the first matching tag controls the bullet. Each inline tag uses its own rule.

## Install with BRAT

1. Install and enable **BRAT** from Obsidian's Community plugins browser.
2. Run **BRAT: Add a beta plugin for testing** from the command palette.
3. Enter `spasm/block-tags` and select **Add Plugin**.
4. Enable **Block Tags** under **Settings → Community plugins**.

BRAT installs the latest GitHub release and can check it for future updates.

Block Tags supports Obsidian 1.8.0 or newer on desktop and mobile.

## Development

```bash
npm install
npm run check
npm run dev
```

The development copy is linked into the ObsidiBrain vault at `.obsidian/plugins/block-tags`. Reload it after a build with:

```bash
obsidian vault="ObsidiBrain" plugin:reload id=block-tags
```
