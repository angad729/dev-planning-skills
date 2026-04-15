import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skills = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: '../skills',
  }),
  schema: z.object({}).passthrough().optional(),
});

const foundation = defineCollection({
  loader: glob({
    pattern: 'deliberate.md',
    base: '..',
  }),
  schema: z.object({}).passthrough().optional(),
});

export const collections = { skills, foundation };
