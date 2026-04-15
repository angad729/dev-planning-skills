# Review

Code review skill for LLM coding agents. Load this when reviewing a PR, reviewing your own diff before handing it back, or auditing code someone else wrote.

Where [`deliberate.md`](../deliberate.md) keeps writing honest, this skill keeps *reviewing* honest. Counters rubber-stamp "LGTM" reviews, nitpick-only reviews, and missing the forest for the trees.

---

## 1. Read the Intent First, Code Second

**Know what the change is trying to do before judging how it does it.**

- Read the PR description, linked ticket, or commit message before the diff.
- If you can't state the goal in one sentence, ask - don't review blind.
- A clean implementation of the wrong thing is worse than a messy implementation of the right thing.

If intent is missing:

> "I can review the code, but I need the goal first. What problem is this solving?"

**Test:** Can I say in one sentence what this change is for?

---

## 2. Review in Layers, Top-Down

**Don't start with nits. Start with correctness.**

Review in this order, and stop at the first layer that has a blocking issue:

1. **Does it solve the stated problem?** If not, nothing else matters.
2. **Is the approach sound?** Right abstraction, right layer, right trade-offs.
3. **Is it correct?** Edge cases, error paths, concurrency, data integrity.
4. **Is it safe?** Auth, input validation, injection, secrets, PII.
5. **Is it maintainable?** Naming, structure, testability.
6. **Is it consistent?** Matches surrounding code style and conventions.
7. **Nits.** Formatting, spelling, preferences.

Leaving an architectural concern to the end while drowning the author in nits is a failure mode. Start at the top.

**Test:** Are my highest-priority comments about the highest-priority concerns?

---

## 3. Distinguish Blocking From Non-Blocking

**Label every comment so the author knows what to act on.**

Use clear prefixes:

- **`blocking:`** must be addressed before merge.
- **`question:`** genuine ask, not a veiled critique.
- **`suggestion:`** take it or leave it.
- **`nit:`** cosmetic, optional.
- **`praise:`** noting what's good. Worth doing.

A review that's all unlabeled comments forces the author to guess severity. That wastes everyone's time.

**Test:** For each comment, would the author know whether to fix it, discuss it, or ignore it?

---

## 4. Hunt for What Isn't There

**Good reviews notice omissions, not just mistakes.**

The easy review spots what's wrong with the code in front of you. The hard review spots what's missing:

- A new code path with no test.
- An error case the code can hit but doesn't handle.
- A migration with no rollback plan.
- A new API with no consumer documentation.
- A removed function with lingering callers elsewhere in the repo.
- A security-sensitive change with no corresponding audit log.

Absence is invisible by default. Force yourself to ask: *what would I expect to see here that I don't?*

**Test:** What would a senior engineer notice is missing from this diff?

---

## 5. Pull the Thread on Anything Unfamiliar

**If you don't understand a line, don't skip it. Don't approve it.**

- "I don't understand why this works" is a review comment, not a failure on your part.
- Unfamiliar patterns might be genius, might be wrong. Ask.
- If the author says "it's fine, trust me," that's a reason for *more* scrutiny, not less.

An LGTM on code you didn't understand is a lie. Own the gap:

> "I'm not confident I understand the locking here. Can you walk me through why this can't deadlock?"

**Test:** Did I approve any line I couldn't explain?

---

## 6. Review the Tests Like Code

**A weak test suite makes a strong review meaningless.**

For each test, ask:

- Does it actually exercise the new behavior, or just import it?
- Would it fail if the feature were broken? Try mentally deleting the implementation - would the test still pass?
- Does it over-mock to the point of testing nothing real?
- Are the assertions specific, or is it checking "didn't throw"?
- Is there a test for the failure path, not just the happy path?

A green CI on a tautological test suite is noise, not signal.

**Test:** If I deleted the feature, would these tests fail?

---

## 7. Keep Your Own Reviews Honest

**Don't sycophant. Don't grandstand. Don't relitigate.**

- Don't approve because the author is senior to you or because the PR is old.
- Don't block because the author is junior and you want to teach - teach in a way that unblocks.
- Don't relitigate architectural decisions made in a prior PR. If you missed it then, file a follow-up now.
- Don't suggest rewrites for taste. Match existing style unless the existing style is broken.

If you find yourself writing a long comment chain, move to a call or a design doc. Review tools are bad at nuance.

**Test:** Would I stand by each of my comments if the author pushed back thoughtfully?

---

## 8. Self-Review Before Submit

**Review your own diff with the same rigor before handing it to a human.**

Before pushing or requesting review:

- Re-read the full diff top to bottom. Not the files you changed - the diff.
- Does every hunk trace to the stated goal? If not, why is it here?
- Did I leave debug prints, commented-out code, TODOs I should resolve now?
- Would I approve this if someone else wrote it?
- What's the first question a reviewer will ask? Answer it in the PR description.

Self-review catches more issues than any linter. Do it.

**Test:** If I were the reviewer, what would I hate about this PR?

---

## These Guidelines Are Working If

- Blocking concerns surface early in the review, not after 40 nits.
- Authors know exactly what to fix before merge.
- Missing tests and edge cases get caught in review, not in production.
- "LGTM" disappears from reviews on non-trivial PRs.
- Self-review cuts reviewer workload noticeably.

---

*Part of [Deliberate](https://github.com/angad729/deliberate). Load alongside [`deliberate.md`](../deliberate.md).*
