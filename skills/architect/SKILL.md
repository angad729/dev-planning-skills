---
name: architect
description: "Architectural thinking. Load when crossing component boundaries, reshaping contracts, introducing a service, or deciding where code belongs. Covers naming boundaries, locating code by ownership and change cadence, changing contracts carefully, measuring coupling and cohesion, and not abstracting until the pattern is real."
---

# Architect

Architectural thinking skill for LLM coding agents. Load this when the task crosses component boundaries, introduces a new service, reshapes a contract, or asks "where should this code live?"

Where [`deliberate`](../deliberate/SKILL.md) keeps code honest and [`spec`](../spec/SKILL.md) keeps product intent honest, this skill keeps *structural* decisions honest. Counters premature abstraction, boundary violations, and the silent blurring of component responsibilities.

---

## 1. Name the Boundary Before You Cross It

**Every non-trivial change touches a boundary. State which one.**

Before editing, identify:

- Which component(s) own this code today.
- Which boundary this change sits inside, crosses, or creates.
- What the contract at that boundary is (API, event, schema, function signature).

If the change crosses a boundary that didn't exist before, you're introducing architecture. That's a bigger decision than an implementation. Slow down.

**Test:** Can I draw a box diagram of the touched components and point to the line my change crosses?

---

## 2. Put Code Where It Belongs, Not Where It's Convenient

**Where code lives determines who can use it, change it, and break it.**

Decide based on:

- **Ownership** - which team or module is responsible for this behavior?
- **Change cadence** - does this change with the UI, with the business rule, with the database?
- **Dependencies** - what does this need to know about? The fewer the better.
- **Reuse** - is this one-off, or will multiple callers need it?

Common anti-patterns:

- Business logic in the controller/handler layer because it was "just faster."
- Helpers that know about the database *and* the UI.
- "Utils" dumping grounds that have no coherent responsibility.
- Feature code in shared libraries because one other feature "might need it someday."

**Test:** If this code needs to change for a business-rule reason, does it live near other business-rule code?

---

## 3. Contracts Are Promises - Change Them Carefully

**An API, an event, a schema, a function signature - each is a promise to every caller.**

Before changing a contract:

- List the known callers. For public contracts, assume unknown callers exist.
- Is this additive (safe) or breaking (not safe)?
- If breaking, what's the migration path? Dual-write? Versioned endpoints? Deprecation window?
- Can this be a new contract alongside the old, with callers migrated over time?

"Just change it, nothing important depends on it" is how production breaks at 3am.

**Test:** If a caller I don't know about exists, will this change break them silently?

---

## 4. Coupling and Cohesion Are the Two Measures

**Every structural choice increases one or decreases the other.**

- **Cohesion** (good, more): code that changes together lives together.
- **Coupling** (bad, less): unrelated modules entangled through shared state, shared types, or chatty calls.

When evaluating a design:

- High cohesion, low coupling → the design is right.
- Low cohesion, low coupling → probably fine, slightly scattered.
- High coupling, high cohesion → a tight module that's earning its complexity.
- High coupling, low cohesion → the worst case. Break it up.

Don't wave hands at "separation of concerns." Name the cohesion you're gaining and the coupling you're reducing.

**Test:** Does this change make related code more cohesive, or does it just move things around?

---

## 5. Don't Abstract Until the Pattern Is Real

**Three instances, not one. Not two.**

Premature abstraction is the dominant architectural failure in AI-assisted code. It looks like:

- Extracting a "generic handler" from the first handler you write.
- Adding strategy/factory patterns for a single concrete type.
- Building a framework when you need a function.
- Parameterizing things that have only ever had one value.

The abstraction you imagine on day one almost never fits what day-three needs. Write the concrete thing. When the third similar case appears, *then* extract the pattern.

**Test:** Do I have at least three real callers with diverging needs, or am I inventing flexibility for a future I can't see?

---

## 6. State Is the Enemy - Locate It Deliberately

**Where state lives is the most important architectural decision you make.**

For any piece of mutable state, ask:

- **Who owns it?** There should be one owner, always.
- **Where does it live?** Memory, DB, cache, client, queue - each has different durability and consistency semantics.
- **Who can write it?** Fewer writers is almost always better.
- **What's the source of truth?** Derived state should be clearly marked as derived.

Shared mutable state without a clear owner is where race conditions, stale reads, and "it works on my machine" live. Name the owner before you write the code.

**Test:** For every piece of state in this change, can I name a single owner and a single source of truth?

---

## 7. Prefer Boring, Proven Patterns

**"Interesting" architecture is a red flag in most contexts.**

- CRUD over event sourcing, unless you have a real audit or replay requirement.
- Monolith over microservices, until scale or team size forces the split.
- Synchronous over async, until latency or throughput forces it.
- A library over a service, until you need independent deployment or scaling.
- Postgres over [newer database], until Postgres actually can't do it.

Each escape from boring adds operational weight, failure modes, and cognitive load. Earn each one with a concrete constraint - not a hypothetical.

**Test:** Can I name the specific constraint that forces this to be non-boring?

---

## 8. Document the "Why" of the Structure

**Code shows what. Commit messages show when. Only docs show why.**

For non-obvious architectural choices - a boundary, a pattern, a constraint - leave a short note where a future reader will find it:

- An ADR (architecture decision record) in the repo.
- A module-level README.
- A header comment at the contract boundary.

Three lines is enough: *what we chose, what we considered, why we chose it.* This is one of the few places comments earn their keep - because the *why* can't be read off the code.

**Test:** Would a new engineer joining in six months understand why the boundary is where it is?

---

## These Guidelines Are Working If

- Cross-cutting changes land in predictable places.
- Contract changes come with migration plans, not surprises.
- Premature abstractions get caught in review and collapsed back to concrete code.
- "Where should this live?" stops being a recurring question - the codebase answers it.
- Future engineers can trace the shape of the system from the code and a handful of short docs.

---

*Part of [Deliberate](https://github.com/angad-kandhari/deliberate). Load alongside [`deliberate`](../deliberate/SKILL.md) and [`spec`](../spec/SKILL.md).*
