---
name: incident
description: "Incident response discipline. Load when production is broken, a paging alert is active, or the user is debugging under time pressure. Covers stabilizing before diagnosing, communicating while working, not losing evidence, one change at a time, hypothesizing explicitly, knowing when to escalate, and writing the postmortem honestly."
---

# Incident

Incident-response skill for LLM coding agents. Load this when production is broken, something is on fire, a paging alert is active, or the user is debugging under time pressure.

Where [`deliberate`](../deliberate/SKILL.md) keeps normal work honest, this skill keeps *crisis* work honest. Counters the two dominant failure modes under pressure: making it worse by acting too fast, and freezing by analyzing too long.

---

## 1. Stabilize First, Diagnose Second

**Stop the bleeding before you look for the wound.**

When production is broken, the first goal is "make it stop being broken for users." Root cause is the *second* goal.

Stabilization moves, in rough order of preference:

1. **Revert.** Roll back the change that started it. If the timing fits, just do it.
2. **Feature flag off.** Disable the feature path without a deploy.
3. **Failover.** Shift traffic to a healthy region, replica, or fallback.
4. **Throttle / shed.** Reduce load to something the system can handle.
5. **Restart.** Kick the process. Crude but fast.
6. **Last resort:** ad-hoc fix. Highest risk of making it worse.

"Let me figure out why" when users are down is the wrong instinct. Stabilize, then figure out.

**Test:** If I could stop user impact right now with one action, what would it be?

---

## 2. Communicate While You Work

**Silence during an incident costs more than incomplete information.**

- Post an early ack in the incident channel: *"I see it, I'm on it, will update in 10 min."*
- Update every 10-15 minutes even if nothing changed. "Still investigating, ruled out X and Y" is useful.
- Name what you know, what you suspect, and what you don't know. Keep them separate.
- When handing off, hand off the *state of the investigation*, not just the symptoms.

Stakeholders fill silence with worst-case assumptions. Don't let them.

**Test:** Does anyone who joins the incident channel right now know what's going on without asking?

---

## 3. Don't Lose Evidence

**The moment you touch production, you may destroy the thing that would have told you the cause.**

Before restarting, reverting, or flushing anything:

- **Grab logs** around the incident window. Export them somewhere durable.
- **Capture metrics screenshots** or time ranges. Dashboards reset.
- **Take a heap dump / thread dump** if the process is stuck.
- **Snapshot state** - DB rows, queue depth, cache contents, if relevant.
- **Note exact timestamps** of every action you take.

Stabilization often destroys evidence. That's an acceptable trade - but *deliberately*, not by accident.

**Test:** When this is over, will we have enough evidence to find root cause without reproducing it?

---

## 4. One Change at a Time

**Pressure begs for shotgun fixes. Resist.**

- Change one thing. Observe. Decide.
- Don't restart the service AND flip the flag AND scale up in the same minute. If it recovers, you won't know which one mattered.
- If multiple people are in the incident, one person has the keyboard. Others advise.

Correlating cause and effect requires changes to be separable. Fast and chaotic is slower than fast and disciplined.

**Test:** If the system recovers in the next minute, will I know which of my actions fixed it?

---

## 5. Hypothesize Explicitly

**State what you think is happening before you act on it.**

- Name the top hypothesis in plain words: *"I think the DB is saturated because of the new query in the checkout path."*
- Name what would confirm or refute it in under a minute: *"If CPU on the primary is above 90%, it's this. If not, it's something else."*
- Check the cheap evidence first. If it doesn't fit, throw the hypothesis out - don't torture it.

Drive-by "let me try X" without a hypothesis is how incidents drag.

**Test:** Can I state my current hypothesis and the test that would kill it, in one sentence each?

---

## 6. Know When to Escalate

**Escalation is a strength, not a failure.**

Escalate when:

- User impact is high and you're not sure you can stop it in the next 15 minutes.
- You don't own the system that's broken.
- You're out of hypotheses.
- The fix requires access, authority, or context you don't have.
- You've been on it long enough that your judgment is degrading.

Call in the owner, the senior oncall, the team lead. Say what you've tried, what you suspect, and what you need. Don't apologize for calling - apologize for calling late.

**Test:** Is the cost of another 15 minutes of solo effort higher than the cost of waking someone up?

---

## 7. Write the Postmortem Honestly

**The incident isn't over when the site is back. It's over when the write-up is done.**

A useful postmortem includes:

- **Timeline** - what happened and when, in UTC, from first signal to all-clear.
- **Impact** - users affected, duration, business consequence.
- **Root cause** - the actual mechanism, not a label ("database issue" is not a root cause).
- **Trigger** - what made it happen now.
- **Contributing factors** - what made it worse or slower to detect.
- **What worked** - the detection, the response steps that helped.
- **What didn't** - honestly.
- **Action items** - with owners and deadlines. Track them.

Blameless means focus on systems, not people. It doesn't mean vague. "Better monitoring" is not an action item. "Add alert on checkout p99 latency > 2s, owner @alice, by Friday" is.

**Test:** Could the next oncall, reading this postmortem, prevent or shorten the next incident?

---

## 8. Don't Let the Fix Become a New Incident

**Post-incident changes under pressure are the source of the next incident.**

- Resist "while we're in here, let's also fix X." Fix only what this incident requires.
- Tag hotfixes so they're reviewed properly once the pressure is off.
- Re-run the stabilization checklist for any post-incident change - small changes in a degraded system have outsized risk.
- Put the follow-up work in a ticket with a date, not a promise.

**Test:** Is every change I'm making in the next hour strictly required to end this incident?

---

## These Guidelines Are Working If

- User impact ends before root cause is known, and that's fine.
- Incident channels have a running narrative anyone can catch up on.
- Postmortems name mechanisms and produce concrete, dated follow-ups.
- Post-incident fixes don't cause the next incident.
- "It just started working" and "I'm not sure what fixed it" disappear from incident notes.

---

*Part of [Deliberate](https://github.com/angad729/deliberate). Load alongside [`deliberate`](../deliberate/SKILL.md) during on-call or crisis work.*
