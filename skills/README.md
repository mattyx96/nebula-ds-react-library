# Nebula Design System consumer skill

The installable skill starts at [nebula-ds/SKILL.md](nebula-ds/SKILL.md).
Register or copy the whole `nebula-ds` folder through your agent's skill
mechanism, preserving `references/`. Installing the npm package also ships
this folder (`node_modules/nebula-ds-react-library/skills/nebula-ds/`), so
an agent with the dependency installed can read it there without any
registration.

This skill is for **consuming applications**. The repository's root
`AGENTS.md` is maintainer guidance and must not be copied into an app as
consumer rules.

## Ownership and progressive disclosure

`SKILL.md` owns the workflow, the consumer rules and the task routing. The
four cross-cutting references own visual decisions (design-language),
application composition, CSS/theme integration and accessibility. The
component index routes by intent to five family files; it is not a second
manual. **Load only what the task needs** — never the whole set.

One rule, one owner: a family file links to the owning reference instead of
restating it. The canonical visual authority is the repo's
[`docs/DESIGN_LANGUAGE.md`](../docs/DESIGN_LANGUAGE.md); the consumer
contract is the repo [`README.md`](../README.md); the API is owned by the
installed public declarations. This skill is a consumer translation of all
three — when they conflict, the source wins and this skill gets updated in
the same change.

## Grounding and maintenance

The skill was written against commit `94ede01` (branch
`feat/agent-usability`), which is the commit that introduced
`examples/app-shell` and the story/JSDoc documentation pass. Facts checked
against source at that revision: variant lists and defaults
(`src/variants/**`), Button/IconButton/Icon/Panel/FramePanel/FrameConnector/
Typography/Horizon prop surfaces, `Menu`'s built-in dropdown→sheet `mode`
switch, provider order, and the Toast hook surface.

Update rule: when a public prop or behaviour changes, update the owning
component family file **and** the grounding revision in the same change.
The skill folder is portable — its internal links stay within the folder;
upstream pointers use repo-relative paths that resolve on GitHub.

## Cold-start scenarios

[NEBULA_SCENARIOS.md](NEBULA_SCENARIOS.md) holds the evaluation prompts and
scoring criteria used to check that an agent given only this skill can
produce on-system UI. Run them after any significant change to the skill
or the library API. Task prompts stay separate from evaluator criteria so
the agent under test never sees the rubric.
