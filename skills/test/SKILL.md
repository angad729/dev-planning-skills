---
name: test
description: "Testing discipline. Load when writing tests, deciding what to test, or auditing a test suite. Covers testing behavior not implementation, picking the right layer, mocking sparingly and honestly, one reason to fail, covering failure paths, staying deterministic, and not chasing coverage."
---

# Test

Testing skill for LLM coding agents. Load this when writing tests, deciding what to test, or evaluating an existing test suite.

Where [`deliberate`](../deliberate/SKILL.md) keeps implementation honest, this skill keeps *tests* honest. Counters the failure modes of over-mocking, tautological tests, testing implementation details, and shipping green CI that proves nothing.

---

## 1. Test Behavior, Not Implementation

**A test should fail when the feature breaks and pass when it works. Not when internals shuffle.**

- Assert on observable outputs: return values, emitted events, database state, HTTP responses.
- Don't assert on private helpers, internal call order, or exact log strings unless the logs *are* the contract.
- If a refactor that preserves behavior breaks your tests, your tests are coupled to implementation.

**Test:** If I rewrote the internals but kept the behavior, would this test still pass?

---

## 2. Pick the Right Layer

**Match test layer to the thing you actually want to verify.**

- **Unit** - pure logic, branching, edge cases. Fast, many.
- **Integration** - real collaborators (DB, queue, file system). Slower, fewer, higher signal.
- **End-to-end** - full user workflow across services. Expensive, sparse, use for critical paths only.
- **Contract** - boundaries between services. Cheap insurance against silent API drift.

Don't write a unit test for something that only fails under integration conditions. Don't write an e2e test for something a unit test would catch.

**Test:** Does this test catch the bug I'm worried about, at the level where it would actually occur?

---

## 3. Mock Sparingly, Mock Honestly

**Every mock is a lie you're promising to keep true.**

Mock when:

- The real dependency is slow, flaky, or external (third-party APIs, payment gateways, email).
- You need to force a specific error condition that's hard to reproduce for real.
- Determinism requires it (time, randomness, network).

Don't mock when:

- The thing is fast and local (your own functions, an in-memory DB, the file system in most cases).
- Mocking requires restating the real behavior in the test - at that point, use the real thing.
- You're mocking the code under test. That means you're testing the mock.

Over-mocked suites pass while production burns. If tests only talk to mocks, they're only testing mocks.

**Test:** If the real dependency silently changed its contract, would this test catch it?

---

## 4. One Reason to Fail

**When a test fails, its name should tell you what broke.**

- One assertion family per test. Multiple assertions on one behavior is fine; multiple behaviors per test is not.
- Name tests as sentences: `returns_empty_list_when_no_matches`, not `test_search`.
- If a test can fail for five reasons, failure tells you nothing. You'll re-run it in a debugger to find out - which means it was a debugging tool, not a test.

**Test:** When this test fails in CI, do I know what's broken without opening the file?

---

## 5. Cover the Failure Path

**Happy-path tests prove the feature exists. Failure-path tests prove it's robust.**

For every new behavior, ask:

- What happens on invalid input? Missing input? Wrong type?
- What happens when a dependency fails, times out, or returns garbage?
- What happens on the second call? The concurrent call?
- What's the boundary condition - empty, one, many, max?

If the failure path can't happen, document *why* it can't - that comment is more valuable than another happy-path test.

**Test:** Have I tested what happens when this goes wrong, or only when it goes right?

---

## 6. Keep Tests Deterministic

**A flaky test is worse than no test.**

Flakiness erodes trust in the suite, which erodes trust in CI, which erodes trust in merges. Sources of flake:

- Time (`Date.now()`, timezones, DST) - inject a clock.
- Randomness - seed it, or assert on properties, not exact values.
- Order dependence - each test should set up its own state and tear it down.
- Network / external services - mock or use contract tests.
- Concurrency / timing - don't assert on "this should take less than 100ms."

If a test is flaky, fix it or delete it. Don't retry-until-green. Don't skip it "temporarily."

**Test:** Could I run this test a thousand times in a row and get identical results?

---

## 7. Don't Chase Coverage

**100% coverage tests every line; it tests zero behaviors.**

Coverage is a floor indicator, not a goal. A suite at 95% coverage that asserts nothing meaningful is worse than a suite at 60% that hits every critical path.

- Prioritize coverage of: business logic, boundaries, error paths, contracts with other services.
- Deprioritize: trivial getters, config loading, auto-generated code.
- Never add a test just to hit a coverage number. If you can't name what behavior it protects, delete it.

**Test:** For each test, can I name the bug it's preventing?

---

## 8. Delete Dead Tests

**A test is code. It rots like code.**

- If a test tests a feature you removed, delete it.
- If a test is perpetually skipped, delete it or fix it. `skip` is a lie.
- If a test runs but asserts nothing meaningful, delete it.
- If a test needs to be updated every time anyone breathes on the file, it's testing implementation - rewrite it or delete it.

Dead tests give false confidence and slow the suite. Both are costly.

**Test:** If I removed this test, would anyone notice within a quarter?

---

## These Guidelines Are Working If

- Tests fail for one clear reason.
- Refactors don't break tests that should still pass.
- Flaky tests are rare and get fixed fast, not retried.
- Failure-path bugs get caught in tests, not production.
- Coverage numbers move because meaningful tests got added, not because coverage was the goal.

---

*Part of [Deliberate](https://github.com/angad-kandhari/deliberate). Load alongside [`deliberate`](../deliberate/SKILL.md).*
