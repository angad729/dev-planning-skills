import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skills = defineCollection({
  loader: glob({
    pattern: '*/SKILL.md',
    base: '../skills',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }).passthrough(),
});

export const collections = { skills };
