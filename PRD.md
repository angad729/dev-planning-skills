# PRD

Spec-driven companion to `dev-planning-skills.md`. Load this when a feature has a PRD, design doc, or solution architecture. It tells the agent how to read the spec, translate it into code, and stay honest to the product intent.

Where `dev-planning-skills.md` governs *how* to code, this file governs *what* is being built and *why*. Use both together.

---

## 0. Find the Spec Before You Plan

**No spec, no feature work.**

Before any non-trivial change, locate the source of product intent:

- `PRD.md`, `docs/prd/`, `docs/specs/`, `.product/`, `specs/`
- Linked docs in `README.md` (Notion, Linear, Confluence, Google Docs)
- A ticket referenced in the request (Linear, Jira, GitHub issue)

If none exists and the task is more than a bug fix or tweak, stop and ask:

> "I can't find a PRD or spec for this. Should I write one first, or is there one I'm missing?"

Don't reverse-engineer product intent from code. Code tells you what exists, not what's wanted.

**Test:** Can I point to the sentence in the spec that justifies this change?

---

## 1. Extract Before You Build

**Read the PRD for four things. Flag what's missing.**

Every PRD worth coding from answers:

1. **Problem** - what's broken or missing for the user today.
2. **Persona(s)** - who feels the problem, and what job they're trying to do.
3. **Success criteria** - how we'll know it worked (metric, behavior, or acceptance test).
4. **Non-goals** - what this feature explicitly does *not* do.

If any of the four is missing or vague, name the gap before planning:

> "The PRD defines the persona and problem, but success is stated as 'better UX.' Can we pin that to a measurable behavior before I start?"

Don't silently fill gaps with your own judgment. Product decisions aren't yours to make.

**Test:** Could I explain this feature to a new engineer using only the PRD?

---

## 2. Reconcile Spec and Architecture

**The PRD says what. The architecture says where. Map one to the other.**

Before coding, state:

- Which component(s) this change touches.
- Which existing contracts or boundaries it crosses.
- What new contracts (APIs, events, schemas) it introduces.
- Where it conflicts with existing architecture, if anywhere.

If the PRD implies something the architecture doesn't support cleanly, surface it:

> "The PRD asks for real-time sync, but the current job queue is batch-only. Options: (a) add a streaming path, (b) reduce batch interval, (c) renegotiate the requirement. Which direction?"

Don't quietly bend the architecture to fit the PRD, or quietly clip the PRD to fit the architecture.

**Test:** If an architect read my plan, would they know exactly where the code lands and why?

---

## 3. Persona-Check the Implementation

**Restate the feature in the persona's words. Verify the diff delivers it.**

Before calling a feature done:

- Write the user-visible behavior as the persona would describe it: *"As a [persona], I can now [do X] so that [outcome]."*
- Trace each success criterion to a concrete, testable behavior in the code.
- If a criterion has no corresponding test, write one or flag it.

A passing test suite that doesn't exercise the persona's actual workflow is not evidence the feature works.

**Test:** Could the target persona use this feature end-to-end without a developer present?

---

## 4. Traceability

**Every meaningful change maps to a line in the spec.**

Extending Section 5 of `dev-planning-skills.md` (Surgical Changes):

- If a change doesn't trace to a PRD bullet, user story, or success metric, it's scope creep.
- New helpers, new config options, new abstractions all need a spec-level justification, not just a code-level one.
- When you notice the PRD is silent on something you had to decide, call it out in the PR description so product can confirm or correct.

Don't smuggle product decisions into implementation PRs.

**Test:** For each hunk in the diff, can I point to the PRD line it serves?

---

## 5. Keep the Spec Honest

**The PRD is a living document. Update it when reality diverges.**

If during implementation you discover:

- A requirement is infeasible as written.
- A non-goal turned out to be load-bearing.
- A persona assumption was wrong.
- A success metric can't actually be measured.

Don't just work around it in code. Flag it so the PRD can be updated:

> "The PRD says X, but implementing it surfaced Y. I'd suggest we update the PRD to reflect [new constraint] before I continue. Otherwise the next person reading this will be confused."

Code and spec drifting apart silently is how features decay.

**Test:** If someone reads the PRD six months from now, will it match what was actually built?

---

## These Guidelines Are Working If

- Feature work starts with "here's what the PRD says" rather than "here's what I'll build."
- Gaps in the spec get surfaced before implementation, not discovered in review.
- PRs reference PRD sections, not just ticket IDs.
- Architecture conflicts get raised as options, not resolved unilaterally.
- The PRD gets updated when implementation reveals it was wrong.

---

*Companion to [`dev-planning-skills.md`](./dev-planning-skills.md). Load both when doing feature work against a spec; load just `dev-planning-skills.md` for maintenance, refactors, and bug fixes.*
