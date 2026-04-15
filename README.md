# dev-planning-skills

A drop-in `dev-planning-skills.md` for LLM coding agents (Claude Code, Codex, Cursor, etc.) that mitigates the specific failure modes that show up once you're mostly programming in English: silent assumptions, sycophancy, overcomplication, orthogonal edits, runaway loops, and confidence without calibration.

One file. Drop it into any project. Reference it from your agent's config.

---

## Why this exists

In late 2025, [Andrej Karpathy](https://x.com/karpathy) posted [a thread](https://x.com/karpathy/status/1915485966336389126) on what changed - and what didn't - as agent coding crossed a coherence threshold. The observations were sharp:

> "The models make wrong assumptions on your behalf and just run along with them without checking. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should."

> "They really like to overcomplicate code and APIs, bloat abstractions, don't clean up dead code… implement a bloated construction over 1000 lines when 100 would do."

> "They still sometimes change/remove comments and code they don't sufficiently understand as side effects, even if orthogonal to the task."

Those are the failure modes this file pushes against. Credit for the diagnosis is Karpathy's - this repo is just a practical extrapolation into a planning file you can actually drop into a project.

I'm not claiming the observations. I'm claiming the shape of the file.

---

## What's in the file

Nine principles, tuned to counter specific failure modes:

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

Each principle has a short rule, concrete guidance, and a one-line test you can apply in the moment.

See → [`dev-planning-skills.md`](./dev-planning-skills.md)

---

## How to use it

### Claude Code

Drop the file into your project and reference it from `CLAUDE.md`:

```md
# CLAUDE.md

Follow the guidelines in @dev-planning-skills.md for all code changes.
```

Or paste its contents into `CLAUDE.md` directly.

### Cursor

Reference it from `.cursorrules` or `.cursor/rules/dev-planning.mdc`.

### Codex / other agents

Include it in your project context or system prompt. It's plain markdown - no tool-specific syntax.

### Team usage

Commit it to your repo. Treat it like a linter config for agent behavior: shared, versioned, and reviewed.

---

## When *not* to use it

- **Trivial one-liners.** The file biases toward caution over speed. For throwaway scripts or obvious edits, it adds overhead you don't need.
- **Rapid prototyping where correctness doesn't matter yet.** Plan-first gets in the way of exploration.
- **You disagree with a principle.** Fork it. Delete sections. Rewrite for your taste. It's a starting point, not scripture.

---

## Signals it's working

- Diffs contain fewer unrelated changes.
- Clarifying questions arrive *before* implementation, not after a wrong turn.
- Fewer rewrites triggered by "couldn't you just…?"
- The agent says "I don't know" or "this might be wrong" when appropriate.
- The agent stops and escalates instead of grinding on a broken approach.

---

## Credits & references

- **Andrej Karpathy** - the original observations this file extrapolates from. Follow him on [x.com/karpathy](https://x.com/karpathy).
- Specifically the thread on LLM coding workflow, tenacity, leverage, and failure modes as of late 2025 - the source for nearly every failure mode this file targets.

This repo owes its existence to that thread. None of the diagnosis is mine; the packaging into a drop-in planning file is.

---

## Contributing

Found a failure mode that isn't covered? Have a tighter phrasing for a principle? PRs welcome. Keep it short - the file earns its place by being readable in a single sitting.

---

## License

MIT. Use it, fork it, rewrite it, ship it.
