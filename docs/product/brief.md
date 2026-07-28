# Product Brief

## Problem

Inline tags identify the meaning of a note block, but visually scanning a note does not make those blocks distinct enough. Users need a consistent visual language for concepts such as ideas, questions, and follow-ups.

## Users

Obsidian users who organize paragraph- or list-item-sized thoughts with inline tags.

## Desired outcomes

- A configured tag and its list bullet are immediately recognizable without overpowering the surrounding text.
- The inline tag remains legible and visually distinct from its block.
- The same intent is visible while editing and reading.

## Scope

Per-tag high-chroma color families, coordinated inline tag and list-bullet styling, rule enablement, rule creation/removal, and rendering in the Markdown editor and Reading view.

## Non-goals

Automatic semantic classification, note mutation, synchronization beyond Obsidian's normal plugin settings, and a general-purpose CSS editor.

## Constraints and assumptions

The first release targets Obsidian 1.8 or newer, uses only the public plugin API and CodeMirror 6 extension surface, stores no secrets, and makes no network requests.

## Success signals

A user can configure `#Idea`, see one uniform tag pill and a matching list bullet in both editor and Reading view, change its color family without restarting Obsidian, and remove the rule to restore the normal theme.
