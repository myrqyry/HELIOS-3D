import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema, figuresSchema } from './utils/schemas';

const docs = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/AGENTS.md'],
    base: './src/content/docs',
  }),
  schema: docsSchema,
});

const figures = defineCollection({
  type: 'data',
  schema: figuresSchema,
});

export const collections = { docs, figures };
