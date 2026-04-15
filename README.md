# Deliberate

**Engineering discipline for AI harnesses.**

A drop-in skill library for LLM coding agents (Claude Code, Codex, Cursor, Gemini, and anything else that reads markdown) that mitigates the failure modes that show up once you're mostly programming in English: silent assumptions, sycophancy, overcomplication, orthogonal edits, runaway loops, half-finished migrations, tautological tests, and confidence without calibration.

One foundational file. Seven specialized skills. Drop them into any project. Reference from your agent's config.

Cousin repo to [Impeccable](https://github.com/pbakaus/impeccable) - which does this for design. Deliberate does it for engineering.

---

## Why this exists

In late 2025, [Andrej Karpathy](https://x.com/karpathy) posted [a thread](https://x.com/karpathy/status/1915485966336389126) on what changed - and what didn't - as agent coding crossed a coherence threshold:

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."

> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code… implement a bloated construction over 1000 lines when 100 would do."

> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."

Those are the failure modes Deliberate pushes against. Credit for the diagnosis is Karpathy's - this repo is the practical extrapolation into planning files you can drop into a project.

---

## What's in the repo

### The foundation

**[`deliberate.md`](./deliberate.md)** — nine principles for how an agent should write code. The default load for any project.

| # | Principle | Counters |
|---|---|---|
| 1 | Think Before Coding | Silent assumptions, hidden confusion |
| 2 | Push Back When Warranted | Sycophancy |
| 3 | Plan Inline | Jumping to code on multi-step tasks |
| 4 | Simplicity First | Overcomplication, bloated abstractions |
| 5 | Surgical Changes | Orthogonal edits, scope creep, dead-code leftovers |
| 6 | Goal-Driven Execution | Weak success criteria, lost leverage |
| 7 | Know When to Stop | Runaway tenacity, grinding on a broken approach |
| 8 | Confidence Calibration | Guessing in an authoritative tone |
| 9 | Maintain Context Integrity | Silently reversing earlier decisions |

### The specialized skills

Load these alongside `deliberate.md` when the task calls for them. Each is a standalone file; take what you need.

| Skill | Use when | Counters |
|---|---|---|
| [`skills/spec.md`](./skills/spec.md) | Building a feature against a PRD or design doc | Reverse-engineering intent from code |
| [`skills/debug.md`](./skills/debug.md) | Fixing a bug, triaging a symptom | Random fixes until symptoms go away |
| [`skills/review.md`](./skills/review.md) | Reviewing a PR (yours or someone else's) | Rubber-stamp LGTMs, nit-only reviews |
| [`skills/test.md`](./skills/test.md) | Writing or auditing tests | Over-mocking, tautological suites |
| [`skills/architect.md`](./skills/architect.md) | Crossing component boundaries, shaping contracts | Premature abstraction, boundary blur |
| [`skills/migrate.md`](./skills/migrate.md) | DB schema, framework upgrade, API version bump | Big-bang rewrites, half-finished migrations |
| [`skills/incident.md`](./skills/incident.md) | Production is on fire, paging alert is active | Shotgun fixes under pressure, lost evidence |

Each skill has a short rule per section and a one-line test you can apply in the moment.

---

## How to use it

### Claude Code

```md
# CLAUDE.md

Follow the guidelines in @deliberate.md for all code changes.
When working on features against a PRD or design doc, also follow @skills/spec.md.
When debugging, also follow @skills/debug.md.
When reviewing PRs, also follow @skills/review.md.
When writing tests, also follow @skills/test.md.
When crossing component boundaries, also follow @skills/architect.md.
When planning a migration, also follow @skills/migrate.md.
When responding to an incident, also follow @skills/incident.md.
```

### Cursor

Reference from `.cursor/rules/deliberate.mdc` and the individual skill files as separate rules.

### Codex / Gemini / other agents

Include the relevant files in project context or the system prompt. Plain markdown - no tool-specific syntax.

### Team usage

Commit to your repo. Treat it like a linter config for agent behavior: shared, versioned, reviewed.

---

## When *not* to use it

- **Trivial one-liners.** Deliberate biases toward caution over speed. For throwaway scripts or obvious edits, the overhead isn't worth it.
- **Rapid prototyping where correctness doesn't matter yet.** Plan-first gets in the way of exploration.
- **You disagree with a principle.** Fork it. Delete sections. Rewrite for your taste. It's a starting point, not scripture.

---

## Signals it's working

- Diffs contain fewer unrelated changes.
- Clarifying questions arrive *before* implementation, not after a wrong turn.
- Fewer rewrites triggered by "couldn't you just…?"
- The agent says "I don't know" or "this might be wrong" when appropriate.
- The agent stops and escalates instead of grinding on a broken approach.
- Debugging sessions come with named causes, not just changed lines.
- Reviews surface architectural concerns before nits.
- Migrations ship in revertable steps, not big-bang cutovers.
- Incident postmortems produce concrete, dated follow-ups.

---

## Credits & references

- **Andrej Karpathy** - the original observations this work extrapolates from. Follow him on [x.com/karpathy](https://x.com/karpathy).
- **Paul Bakaus / [Impeccable](https://github.com/pbakaus/impeccable)** - the shape of a drop-in skill library for AI harnesses. Deliberate is the engineering-side sibling to Impeccable's design-side focus.

This repo owes its existence to both. None of the diagnosis is mine; the packaging into drop-in planning files is.

---

## Contributing

Found a failure mode that isn't covered? Have a tighter phrasing for a principle? PRs welcome. Keep it short - each file earns its place by being readable in a single sitting.

---

## License

MIT. Use it, fork it, rewrite it, ship it.
