# Quality and Validation

Define one canonical path for each applicable validation activity. Agents should use these commands rather than inventing alternatives.

## Canonical commands

| Activity | Command | When required |
|---|---|---|
| Fast/full tests | `npm test` | During implementation and before handoff |
| Lint/static analysis | `npm run lint` | When code changes |
| Build/type check | `npm run build` | When compiled or typed code changes |
| Combined local gate | `npm run check` | Before handoff |
| Live plugin smoke test | `obsidian vault="ObsidiBrain" plugin:reload id=block-tags` followed by `obsidian vault="ObsidiBrain" dev:errors` | When plugin runtime behavior changes |
| Architecture validation | `npx likec4 validate docs/architecture/model` | When LikeC4 sources change |

Remove rows that do not apply and add project-specific gates when needed.

## Test isolation

- Use temporary directories, databases, repositories, homes, configuration, and credentials.
- Do not write test records to production or personal data stores.
- Do not depend on global Git hooks, shell aliases, editor settings, or ambient credentials.
- Stub or sandbox external side effects unless an integration test explicitly owns the environment and cleanup.
- Make destructive tests opt-in, narrowly scoped, and unmistakably documented.

## Behavior changes

When behavior changes, update the relevant tests, product requirements, architecture material, user documentation, and decision records in the same work item.

## Broken or unavailable gates

Do not conceal failures or claim a gate passed when it did not run. Report the exact command and result, distinguish pre-existing failures from regressions, and capture follow-up work in Beads.
