# Architecture Boundaries

Use this document to make ownership and dependency rules explicit. Update the examples to match the actual project.

## Components and ownership

For each significant component, record its responsibility, owned data, public interfaces, and upstream or downstream dependencies.

| Component | Owns | Exposes | Depends on |
|---|---|---|---|
| Plugin lifecycle | Settings loading/saving and extension registration | Obsidian `Plugin` entry point | Obsidian plugin API |
| Rule domain | Normalization, validation, matching, palette selection, and safe migration | Pure TypeScript functions and rule types | No runtime framework dependencies |
| Editor decorator | Visible tag-token and matching list-marker decorations | CodeMirror 6 extension | Rule domain, CodeMirror 6 |
| Reading decorator | Rendered tag and matching list-bullet decoration | Markdown post-processor function | Rule domain, rendered DOM |
| Settings tab | Rule creation and color-family selection | Obsidian settings UI | Plugin lifecycle, rule domain |
| Release packaging | BRAT-installable runtime bundle | GitHub release containing `main.js`, `manifest.json`, and `styles.css` | Tested source build and version metadata |

## Boundary rules

- Interact across boundaries through documented interfaces.
- Do not reach into another component's storage, private types, configuration, or implementation details.
- If an interface is insufficient, propose widening it or moving the responsibility to the correct owner instead of adding a local workaround.
- Keep domain policy separate from transport, persistence, framework, and deployment concerns unless the project deliberately combines them.
- Make data ownership, trust boundaries, and failure ownership explicit.
- Keep note source read-only. Visual state belongs only in editor/Reading-view DOM decorations.
- Keep the repository at `/Users/jscott/projects/block-tags`; the ObsidiBrain development vault discovers it through `.obsidian/plugins/block-tags`.
- Keep generated `main.js` out of normal source commits. Version tags publish the tested runtime bundle as GitHub release assets for BRAT.

## Prohibited shortcuts

- Do not rewrite Markdown to add HTML spans, callouts, CSS classes, or block IDs.
- Do not directly modify Obsidian's tag index or configuration files for runtime behavior.
- Do not copy a second editable source tree into the test vault.

## Human-decision triggers

Ask the user before adding note mutation, network access, non-rule persistence, automatic content classification, or a minimum-version increase that drops currently supported Obsidian versions.

## Visual model

Use the project-local `likec4-dsl` skill and keep canonical LikeC4 sources in `docs/architecture/model/`. Link important views and related decision records here.
