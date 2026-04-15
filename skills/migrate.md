# Migrate

Migration skill for LLM coding agents. Load this for non-trivial migrations: database schema changes, framework upgrades, API version bumps, rename rollouts, data backfills, or any change that can't land in a single atomic deploy.

Where [`deliberate.md`](../deliberate.md) keeps code honest, this skill keeps *transitions* honest. Counters the big-bang rewrite, the half-finished migration, and the "we'll clean up the old path later" that never happens.

---

## 1. Incremental By Default

**Big-bang migrations fail. Plan for coexistence.**

The question isn't "how do I switch from old to new?" It's "how do I run old and new side by side long enough to verify, then cut over?"

Default migration shape:

1. **Add the new path** alongside the old. Don't remove anything yet.
2. **Dual-write / dual-read** where relevant. Old and new stay in sync.
3. **Migrate callers** one at a time. Verify each.
4. **Backfill** any historical data.
5. **Cut over** reads to the new path.
6. **Remove the old path** only after the new path has been stable in production.

A migration that requires all callers to update in the same PR is not a migration. It's a rewrite, and it will stall.

**Test:** Can I deploy each step independently, and roll any single step back?

---

## 2. Write the Rollback Before You Write the Migration

**If you can't undo it, you can't ship it.**

For every migration step, name the rollback:

- **Schema add:** drop the column. Safe if nothing writes to it yet.
- **Schema drop:** restore from backup. Often not safe - push drops to the end.
- **Data backfill:** idempotent, so reruns don't double-count. Or: clearly one-way, with a rollback plan documented.
- **Code cutover:** feature flag, so reverting is a config change, not a deploy.

If the rollback is "restore the DB," your migration is too big. Break it up.

**Test:** If this breaks in production at 3am, how do I undo it without paging the DBA?

---

## 3. Make Schema Changes Safe, Not Fast

**Every destructive schema change is a minefield.**

Safe by default:

- **Adding** columns (nullable, or with default), tables, indexes (concurrently where supported).
- **Reading** new shapes in code that can also read old shapes.

Dangerous:

- **Dropping** columns or tables with live readers.
- **Renaming** columns or tables - treat as drop + add, never in-place.
- **Changing types** on large tables - copy column, backfill, swap, drop.
- **Adding** a non-null column with no default, on a large table - will block writes.
- **Creating an index** without `CONCURRENTLY` (Postgres) or equivalent - will block writes.

When in doubt, reach for expand-contract:

1. **Expand:** add the new shape.
2. **Migrate:** move writers, then readers.
3. **Contract:** drop the old shape.

**Test:** Will this statement hold a lock on a production table for more than a second?

---

## 4. Feature-Flag the Cutover

**The switch from old to new should be a config change, not a deploy.**

- Gate new-path reads/writes behind a flag.
- Start at 0% / internal users only. Ramp up.
- Keep the old path warm until the new path has proven itself in production for a realistic window.
- If something breaks, flip the flag. Investigate without time pressure.

"We'll just deploy it on Friday and see" is not a migration plan.

**Test:** Can I revert the cutover in under a minute without a code deploy?

---

## 5. Backfill Idempotently

**Assume the backfill will fail halfway and need to resume.**

- Process in batches. Commit per batch. Track progress in a table or checkpoint.
- Make each batch safe to re-run. "I already processed row 42" should be a cheap check, not a duplicate.
- Log every batch boundary. You'll need it when you're debugging a partial run.
- Estimate runtime on real data volumes before running on prod. A backfill that takes 14 days in prod is a different problem than one that takes 14 minutes in staging.

**Test:** If this backfill crashes at 60%, can I resume from 60%, not from 0%?

---

## 6. Verify Before You Cut Over

**Dual-write lets you measure correctness before trusting the new path.**

While both paths run:

- Compare outputs. Log discrepancies, don't just count them.
- Aim for zero divergence on a rolling window before flipping reads.
- If the paths can legitimately disagree (timing, rounding), define the acceptable delta and alert when breached.
- Watch latency and error rate on the new path under real load, not just synthetic.

Migration bugs hide in the 0.01% you don't look at. Look at it.

**Test:** Do I have evidence - not belief - that the new path matches the old?

---

## 7. Remove the Old Path - Actually

**A migration isn't done until the old path is gone.**

Half-finished migrations are the worst artifact in any codebase. They leave:

- Two sources of truth.
- Ambiguous "which one is canonical?" comments.
- Forked code paths that drift as only one gets updated.
- A new engineer asking "why are there two?" every six months.

Schedule the removal as part of the original plan, with a concrete trigger: *"Remove old_users table once new_users has served all reads for 30 days with zero divergence."*

Put it in the backlog before the migration ships. Without that, "later" means "never."

**Test:** Does the plan include a specific trigger and date for removing the old path?

---

## 8. Communicate the Timeline

**A migration that touches shared systems needs shared awareness.**

- Announce the plan before starting: what's changing, what callers need to do, what the window is.
- Publish the cutover date and the rollback criteria.
- Flag deprecations with a hard deadline - "deprecated" without a deadline gets ignored.
- Pair with a named owner per affected team when possible.

The code will work. The social coordination is what migrations actually fail on.

**Test:** Does every team whose code touches this migration know what they need to do, and by when?

---

## These Guidelines Are Working If

- Migrations ship in independently-revertable steps.
- Schema changes don't take prod locks.
- Cutovers are boring - a flag flip, not a deploy and a prayer.
- Old code paths actually get deleted on schedule.
- "Why do we still have both of these?" stops being a thing.

---

*Part of [Deliberate](https://github.com/angad729/deliberate). Load alongside [`deliberate.md`](../deliberate.md) and [`architect.md`](./architect.md).*
