# Architecture

Read `boundaries.md` before changing component ownership, dependencies, data flow, interfaces, trust boundaries, persistence, or deployment structure.

LikeC4 sources belong in `docs/architecture/model/`. Create them when a visual will clarify components, dependencies, data flow, deployment or trust boundaries, or a consequential architecture decision.

Use the project-local `likec4-dsl` agent skill before editing the model.

```bash
npx likec4 validate docs/architecture/model
npx likec4 serve docs/architecture/model
```

Keep the LikeC4 source canonical. Generated images or sites are derived artifacts and should only be committed when the repository explicitly requires them.
