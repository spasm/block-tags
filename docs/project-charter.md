# Project Charter

Read this document before adding new feature surface area or changing what the project owns.

## Purpose

Make tagged ideas visually recognizable in Obsidian without adding proprietary syntax to Markdown notes.

## Project ownership

Block Tags owns tag-to-color-family rules, the settings experience for those rules, and visual decoration of matching inline tags and list bullets in Obsidian's editor and Reading view.

## Boundaries

Obsidian owns Markdown parsing, tag indexing, editor behavior, and note persistence. Themes own general vault styling. Block Tags does not rewrite note content or maintain a separate tag index.

## In scope

- Configuring a coordinated color family for a tag.
- Decorating matching tag text and the bullet of a list item that contains it.
- Remaining compatible with desktop and mobile Obsidian APIs.

## Out of scope

- Changing the semantic meaning of Obsidian tags.
- Editing, moving, or indexing notes.
- General-purpose callouts, highlighting, or theme management unrelated to tags.

## Principles for admitting new work

Before expanding the project, answer:

1. Which user outcome does this enable?
2. Why is this project the correct owner?
3. Can the outcome be achieved through an existing capability or interface?
4. What permanent complexity, maintenance, or support burden does it introduce?
5. Which requirement and Beads initiative authorize the work?

If the answers are unclear or move a boundary, ask the user before implementation.

## Constraints

- Notes must remain valid, portable Markdown and must never be rewritten merely to add color.
- Settings remain local to the Obsidian vault through the standard plugin data API.
- The initial release has no network access and is not desktop-only.
