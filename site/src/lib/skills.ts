export type SkillMeta = {
  slug: string;
  command: string;
  title: string;
  tagline: string;
  category: 'foundation' | 'think' | 'build' | 'investigate' | 'respond';
  categoryLabel: string;
  blurb: string;
  counters: string;
  file: string;
};

export const SKILLS: SkillMeta[] = [
  {
    slug: 'deliberate',
    command: '/deliberate',
    title: 'Deliberate',
    tagline: 'Engineering discipline for AI harnesses.',
    category: 'foundation',
    categoryLabel: 'Foundation',
    blurb: 'Nine principles for how an agent should write code: think before coding, push back when warranted, plan inline, simplicity first, surgical changes, goal-driven execution, know when to stop, calibrate confidence, maintain context.',
    counters: 'Silent assumptions, sycophancy, overcomplication, scope creep, orthogonal edits, runaway loops, confidence without calibration.',
    file: 'skills/deliberate/SKILL.md',
  },
  {
    slug: 'spec',
    command: '/spec',
    title: 'Spec',
    tagline: 'Spec-driven feature work.',
    category: 'think',
    categoryLabel: 'Think',
    blurb: 'Find the spec before you plan. Extract problem, personas, success criteria, and non-goals. Reconcile spec with architecture. Persona-check the implementation. Keep the PRD honest.',
    counters: 'Reverse-engineering product intent from code. Silently filling in missing requirements.',
    file: 'skills/spec/SKILL.md',
  },
  {
    slug: 'architect',
    command: '/architect',
    title: 'Architect',
    tagline: 'Boundaries, contracts, structure.',
    category: 'think',
    categoryLabel: 'Think',
    blurb: 'Name the boundary before you cross it. Put code where it belongs by ownership and change cadence. Change contracts carefully. Measure coupling and cohesion. Don\'t abstract until the pattern is real.',
    counters: 'Premature abstraction, boundary blur, contracts changed without migration.',
    file: 'skills/architect/SKILL.md',
  },
  {
    slug: 'test',
    command: '/test',
    title: 'Test',
    tagline: 'Honest tests, not green theater.',
    category: 'build',
    categoryLabel: 'Build',
    blurb: 'Test behavior, not implementation. Pick the right layer. Mock sparingly, mock honestly. One reason to fail. Cover failure paths. Stay deterministic. Don\'t chase coverage.',
    counters: 'Over-mocking, tautological tests, flaky suites, coverage theater.',
    file: 'skills/test/SKILL.md',
  },
  {
    slug: 'migrate',
    command: '/migrate',
    title: 'Migrate',
    tagline: 'Ship migrations in revertable steps.',
    category: 'build',
    categoryLabel: 'Build',
    blurb: 'Incremental by default. Write the rollback before the migration. Make schema changes safe, not fast. Feature-flag the cutover. Backfill idempotently. Actually remove the old path.',
    counters: 'Big-bang rewrites, half-finished migrations, unsafe schema changes, permanent dual-paths.',
    file: 'skills/migrate/SKILL.md',
  },
  {
    slug: 'debug',
    command: '/debug',
    title: 'Debug',
    tagline: 'Named causes, not changed lines.',
    category: 'investigate',
    categoryLabel: 'Investigate',
    blurb: 'Reproduce before you reason. Keep symptom, cause, and fix separate. Bisect, don\'t guess. Don\'t mask - understand. Suspect your assumptions first. Fix the class, not the instance.',
    counters: 'Random fixes until symptoms go away. Masking bugs with try/catch. Unexplained "it works now."',
    file: 'skills/debug/SKILL.md',
  },
  {
    slug: 'review',
    command: '/review',
    title: 'Review',
    tagline: 'Catch what\'s missing, not just what\'s wrong.',
    category: 'investigate',
    categoryLabel: 'Investigate',
    blurb: 'Read intent first, code second. Review in layers, top-down. Label comments by severity. Hunt for what isn\'t there. Review tests like code. Self-review before submit.',
    counters: 'Rubber-stamp LGTMs. Nit-only reviews. Missing tests, edge cases, and rollback plans.',
    file: 'skills/review/SKILL.md',
  },
  {
    slug: 'incident',
    command: '/incident',
    title: 'Incident',
    tagline: 'Stabilize first, diagnose second.',
    category: 'respond',
    categoryLabel: 'Respond',
    blurb: 'Stop the bleeding before finding the wound. Communicate while working. Don\'t lose evidence. One change at a time. Hypothesize explicitly. Know when to escalate. Write the postmortem honestly.',
    counters: 'Shotgun fixes under pressure. Lost evidence. Vague postmortems. Post-incident fixes becoming the next incident.',
    file: 'skills/incident/SKILL.md',
  },
];

export const CATEGORIES = [
  {
    key: 'foundation',
    label: 'Foundation',
    blurb: 'The default load for any project. Nine principles for how an agent should write code.',
  },
  {
    key: 'think',
    label: 'Think',
    blurb: 'Before you touch a keyboard. Understand intent, shape the solution, pick where it lives.',
  },
  {
    key: 'build',
    label: 'Build',
    blurb: 'Turning intent into durable code. Tests that earn their keep. Migrations that revert.',
  },
  {
    key: 'investigate',
    label: 'Investigate',
    blurb: 'Finding what\'s wrong and why. Debugging with named causes, reviews that catch omissions.',
  },
  {
    key: 'respond',
    label: 'Respond',
    blurb: 'When production is on fire. Stabilize, preserve evidence, write the honest postmortem.',
  },
] as const;
