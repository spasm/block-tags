# Ways of Working

Beads is the source of truth for initiatives, tasks, blockers, dependencies, discoveries, and handoffs. Markdown documents explain product intent, requirements, architecture, quality policy, and decisions—not task status.

## From idea to executable work

1. Confirm the user outcome in the product brief or requirements.
2. Check the project charter and architecture boundaries before expanding scope or ownership.
3. Create a Beads epic for a substantial initiative and child issues for testable increments.
4. Add acceptance criteria, design notes, blockers, and dependencies needed to execute safely.
5. Check `bd ready`, inspect the issue, and claim it before substantial implementation.
6. Link discovered work with a `discovered-from` relationship instead of silently expanding the current issue.

## Safe automation

- Prefer non-interactive commands and machine-readable output.
- Never use `bd edit`; use `bd update` flags, stdin, or body files.
- Do not assume permission to commit, push, sync, publish, deploy, alter external systems, or perform destructive cleanup.
- Ask the user when a decision changes scope, architecture, security, privacy, cost, irreversible state, or an external contract.

## Completion and handoff

### Wrap-up trigger

When the user says “let's wrap up,” “wrap up,” “wrap up this session,” “prepare a handoff,” “land the plane,” or a clear variation in the context of ending work, run the entire completion and handoff workflow below. Do not respond with only a conversational summary.

1. Capture remaining or discovered work in Beads.
2. Run every applicable canonical gate from `docs/quality.md`.
3. Update product, architecture, behavior, and decision documents affected by the change.
4. Close only issues whose acceptance criteria are actually met; otherwise record current state and the next action.
5. Report changed files, validation results, issue status, blockers, repository state, and a concrete resumption point.

Git commits, pushes, Beads sync, releases, and deployments occur only when the user or an explicit repository policy authorizes them.

### Next-session prompt

End every triggered wrap-up with a fenced, copy-pasteable prompt that lets a new agent resume without relying on the previous conversation. Use this structure and omit only sections that truly do not apply:

```text
Continue work on <beads-id>: <issue title>.

Start by running `bd prime` and `bd show <beads-id>`. Then read:
- <relevant file or durable project document>

Current state:
- <completed work and important decisions>

Next action:
- <one concrete next step>

Blockers or decisions needed:
- <blocker, question, or “None”>

Validation already performed:
- <command and result>
```

If no issue remains in progress, select the appropriate ready follow-up issue when one exists. Otherwise make the prompt start with `bd prime` and `bd ready` and state that no next issue has been selected.
