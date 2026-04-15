# Debug

Debugging skill for LLM coding agents. Load this when the task is "fix the bug," "it's broken," "tests are failing," or any request that starts from a symptom rather than a feature.

Where [`deliberate.md`](../deliberate.md) keeps code honest, this skill keeps *diagnosis* honest. Counters the failure mode of trying random fixes until symptoms go away.

---

## 1. Reproduce Before You Reason

**No repro, no fix.**

- Get the bug to happen on demand before touching code. A failing test is ideal; a manual repro with exact steps is the floor.
- If you can't reproduce, that's the first bug to fix. Don't guess at root cause from a log snippet.
- Write the repro down. It's the acceptance test for your fix.

If the user hands you a flaky or intermittent bug, say so:

> "I can trigger this maybe 1 in 5 times. Before fixing, I want to find conditions that make it reliable - otherwise I can't tell if a fix worked."

**Test:** Can I make this bug happen whenever I want?

---

## 2. Symptom, Cause, Fix - Keep Them Separate

**The symptom is not the bug.**

State all three out loud before editing:

- **Symptom:** what the user sees (error message, wrong output, crash).
- **Cause:** why it happens (the actual defect in logic, state, or assumption).
- **Fix:** the minimum change that addresses the cause.

If you can name the fix but not the cause, you're pattern-matching, not debugging. Stop.

**Test:** Could I explain to a new engineer why this bug existed, not just what I changed?

---

## 3. Bisect, Don't Guess

**Narrow the search space systematically.**

When the cause isn't obvious:

- **Git bisect** when a behavior regressed. It's faster than reading diffs.
- **Binary search** the code path: add a log or assertion halfway through, see which side the bug is on, repeat.
- **Minimize the repro** until only the bug-relevant code remains.
- **Diff a working case against a broken case** - the delta is the bug, almost always.

Random print statements across the codebase is not bisection. It's noise.

**Test:** Is each debugging step cutting the search space roughly in half?

---

## 4. Don't Mask - Understand

**If the fix makes the symptom go away but you can't explain why, it's not a fix.**

Common masking anti-patterns:

- Wrapping in try/catch to swallow an error you don't understand.
- Adding a null check without knowing why the value was null.
- Tweaking timeouts, retries, or sleeps to make flakiness "go away."
- Pinning a dependency to an old version without knowing what broke.

Every one of those is a future bug with a longer fuse. If you must ship a temporary mitigation, mark it explicitly:

> "This silences the error, but I don't yet know why `x` is null here. Filed as tech debt. Need to revisit before [trigger]."

**Test:** If someone asked me *why* this fix works, could I give a mechanism, not a vibe?

---

## 5. Suspect Your Assumptions First

**The bug is usually where you're not looking.**

The reason a bug is hard is that something you believe is true isn't. Enumerate the load-bearing assumptions:

- "This function is pure." - Is it really? Does it read a global, a clock, a random source?
- "This runs in order." - Is there async, a scheduler, a retry?
- "This input can't be null." - Says who? Check at the boundary.
- "The library behaves like the docs say." - Read the source or test it.

Then pick the assumption you'd be most embarrassed to be wrong about, and verify that one first.

**Test:** What am I assuming that I haven't verified?

---

## 6. Fix the Class, Not the Instance

**Once you've found the cause, ask: where else does this pattern exist?**

Most bugs aren't unique. A null-deref here often means the same unchecked input exists in three sibling call sites. A race condition in one handler often lives in every handler that shares the pattern.

- Grep for the pattern, not just the file.
- If the fix is a one-off patch, name why this site is special.
- If the fix is a rule ("always validate X at Y boundary"), apply the rule everywhere, or explain why you're not.

Don't silently expand scope - surface it:

> "The same pattern exists in three other places. I can fix this one site now and file the others, or fix all four. Which?"

**Test:** Is this a one-of-one bug, or a class of bugs I'm only patching once?

---

## 7. Write the Regression Test

**A bug without a test is a bug that comes back.**

- The repro from Section 1 becomes a test that fails before your fix and passes after.
- If the bug can't be tested at the unit level, test it at the integration level. Don't skip.
- If the bug is genuinely untestable (UI timing, hardware, external service), say so explicitly and log what you did to manually verify.

Landing a fix with no test is a decision, not a default. Own it.

**Test:** Would this exact bug be caught on the next commit if it reappeared?

---

## These Guidelines Are Working If

- Fixes come with a named cause, not just a changed line.
- Debugging sessions get shorter over time because the first hypothesis is better.
- Regressions stop repeating because each bug leaves a test behind.
- "I don't know why it works" disappears from commit messages.

---

*Part of [Deliberate](https://github.com/angad729/deliberate). Load alongside [`deliberate.md`](../deliberate.md).*
