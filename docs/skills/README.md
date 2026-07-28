# Project-Local Skills

Put reusable, specialized agent workflows in `.agents/skills/<skill-name>/SKILL.md`. A skill is appropriate when the behavior needs procedural steps, domain references, scripts, templates, or validation—not for a one-sentence repository rule that belongs in `AGENTS.md`.

When the user asks for a new project behavior:

1. Decide whether it is a concise rule, an explained behavior, or a reusable skill.
2. Capture concise mandatory rules in the user-maintained section of `AGENTS.md`.
3. Capture behaviors needing examples or rationale in `docs/agent-behaviors.md`.
4. Create a project-local skill for repeatable specialized workflows, with YAML frontmatter containing a clear `name` and trigger-focused `description`.
5. Keep executable work in Beads and record the user decision or rationale in the relevant document.

Do not edit vendor-managed skills such as `beads` or `likec4-dsl` to store project policy; upgrades may replace them.
